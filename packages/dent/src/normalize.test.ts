/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: NSIS definitions */
import { expect, test } from 'vitest';
import {
	joinInstructionArgs,
	joinWithCompactPipes,
	normalizeArg,
	normalizeInstructionArgs,
	normalizeQuotes,
	splitArithmeticTokens,
	splitPipeTokens,
} from './normalize.ts';

// --- normalizeQuotes ---

test('normalizeQuotes: double to double (no-op)', () => {
	expect(normalizeQuotes('"hello"', false)).toBe('"hello"');
});

test('normalizeQuotes: single to double', () => {
	expect(normalizeQuotes("'hello'", false)).toBe('"hello"');
});

test('normalizeQuotes: double to single', () => {
	expect(normalizeQuotes('"hello"', true)).toBe("'hello'");
});

test('normalizeQuotes: backtick to double', () => {
	expect(normalizeQuotes('`hello`', false)).toBe('"hello"');
});

test('normalizeQuotes: prefers target when content is clean', () => {
	expect(normalizeQuotes("'no special'", false)).toBe('"no special"');
});

test('normalizeQuotes: falls back to alt when target char is in content', () => {
	expect(normalizeQuotes('`she said "hi"`', false)).toBe('\'she said "hi"\'');
});

test('normalizeQuotes: falls back to backtick when both quote types present', () => {
	expect(normalizeQuotes(`"it's a "test""`, false)).toBe('`it\'s a "test"`');
});

test('normalizeQuotes: escapes for double when all quote types present', () => {
	const input = '`it\'s "a" `test``';
	const result = normalizeQuotes(input, false);
	expect(result[0]).toBe('"');
	expect(result[result.length - 1]).toBe('"');
});

test('normalizeQuotes: unescapes $\\" before re-quoting', () => {
	expect(normalizeQuotes('"say $\\"hi$\\""', true)).toBe('\'say "hi"\'');
});

test('normalizeQuotes: unescapes "" (doubled double) before re-quoting', () => {
	expect(normalizeQuotes('"say ""hi"""', true)).toBe('\'say "hi"\'');
});

test('normalizeQuotes: returns bare tokens unchanged', () => {
	expect(normalizeQuotes('MB_OK', false)).toBe('MB_OK');
});

// --- normalizeArg ---

test('normalizeArg: $-prefixed args are untouched', () => {
	expect(normalizeArg('$INSTDIR', undefined, false)).toBe('$INSTDIR');
});

test('normalizeArg: quoted args go through normalizeQuotes', () => {
	expect(normalizeArg("'hello'", undefined, false)).toBe('"hello"');
});

test('normalizeArg: global parameter is canonicalised', () => {
	expect(normalizeArg('/silent', undefined, false)).toBe('/SILENT');
});

test('normalizeArg: instruction-specific parameter takes precedence', () => {
	const instrParams = new Map([['true', 'true']]);
	expect(normalizeArg('TRUE', instrParams, false)).toBe('true');
});

test('normalizeArg: parameterised prefix is canonicalised', () => {
	expect(normalizeArg('/lang=1033', undefined, false)).toBe('/LANG=1033');
});

test('normalizeArg: unknown bare token is returned as-is', () => {
	expect(normalizeArg('SomeCustomThing', undefined, false)).toBe('SomeCustomThing');
});

// --- splitPipeTokens ---

test('splitPipeTokens: splits MB_OK|MB_DEFBUTTON1', () => {
	expect(splitPipeTokens(['MB_OK|MB_DEFBUTTON1'])).toEqual(['MB_OK', '|', 'MB_DEFBUTTON1']);
});

test('splitPipeTokens: leading pipe', () => {
	expect(splitPipeTokens(['|MB_DEFBUTTON1'])).toEqual(['|', 'MB_DEFBUTTON1']);
});

test('splitPipeTokens: trailing pipe', () => {
	expect(splitPipeTokens(['MB_OK|'])).toEqual(['MB_OK', '|']);
});

test('splitPipeTokens: standalone pipe passes through', () => {
	expect(splitPipeTokens(['|'])).toEqual(['|']);
});

test('splitPipeTokens: no pipe passes through', () => {
	expect(splitPipeTokens(['MB_OK', '"hello"'])).toEqual(['MB_OK', '"hello"']);
});

test('splitPipeTokens: quoted strings are never split', () => {
	expect(splitPipeTokens(['"a|b"'])).toEqual(['"a|b"']);
});

test('splitPipeTokens: preserves ${...} groups across pipe', () => {
	expect(splitPipeTokens(['${MB_OK}|${MB_DEFBUTTON1}'])).toEqual(['${MB_OK}', '|', '${MB_DEFBUTTON1}']);
});

test('splitPipeTokens: $variable|$variable', () => {
	expect(splitPipeTokens(['$1|$2'])).toEqual(['$1', '|', '$2']);
});

// --- splitArithmeticTokens ---

test('splitArithmeticTokens: $1+$2', () => {
	expect(splitArithmeticTokens(['$1+$2'])).toEqual(['$1', '+', '$2']);
});

test('splitArithmeticTokens: $1-$2 (binary minus)', () => {
	expect(splitArithmeticTokens(['$1-$2'])).toEqual(['$1', '-', '$2']);
});

test('splitArithmeticTokens: $1+-$2 (unary minus after operator)', () => {
	expect(splitArithmeticTokens(['$1+-$2'])).toEqual(['$1', '+', '-$2']);
});

test('splitArithmeticTokens: leading unary minus', () => {
	expect(splitArithmeticTokens(['-$1'])).toEqual(['-$1']);
});

test('splitArithmeticTokens: multi-char operator ||', () => {
	expect(splitArithmeticTokens(['$1||$2'])).toEqual(['$1', '||', '$2']);
});

test('splitArithmeticTokens: multi-char operator <<', () => {
	expect(splitArithmeticTokens(['$1<<$2'])).toEqual(['$1', '<<', '$2']);
});

test('splitArithmeticTokens: three-char operator >>>', () => {
	expect(splitArithmeticTokens(['$1>>>$2'])).toEqual(['$1', '>>>', '$2']);
});

test('splitArithmeticTokens: standalone operator passes through', () => {
	expect(splitArithmeticTokens(['+'])).toEqual(['+']);
});

test('splitArithmeticTokens: quoted strings are never split', () => {
	expect(splitArithmeticTokens(['"1+2"'])).toEqual(['"1+2"']);
});

test('splitArithmeticTokens: preserves ${...} groups', () => {
	expect(splitArithmeticTokens(['${a}+${b}'])).toEqual(['${a}', '+', '${b}']);
});

// --- joinWithCompactPipes ---

test('joinWithCompactPipes: basic pipe join', () => {
	expect(joinWithCompactPipes(['MB_OK', '|', 'MB_DEFBUTTON1'])).toBe('MB_OK|MB_DEFBUTTON1');
});

test('joinWithCompactPipes: pipe with trailing arg', () => {
	expect(joinWithCompactPipes(['MB_OK', '|', 'MB_DEFBUTTON1', '"Hello"'])).toBe('MB_OK|MB_DEFBUTTON1 "Hello"');
});

test('joinWithCompactPipes: no pipes', () => {
	expect(joinWithCompactPipes(['"hello"', '$INSTDIR'])).toBe('"hello" $INSTDIR');
});

test('joinWithCompactPipes: leading pipe', () => {
	expect(joinWithCompactPipes(['|', 'MB_OK'])).toBe('|MB_OK');
});

// --- joinInstructionArgs ---

test('joinInstructionArgs: uses compact pipes for regular instructions', () => {
	expect(joinInstructionArgs(['MB_OK', '|', 'MB_DEFBUTTON1'], 'MessageBox')).toBe('MB_OK|MB_DEFBUTTON1');
});

test('joinInstructionArgs: uses spaces for IntOp', () => {
	expect(joinInstructionArgs(['$1', '+', '$2'], 'IntOp')).toBe('$1 + $2');
});

test('joinInstructionArgs: uses spaces for IntPtrOp', () => {
	expect(joinInstructionArgs(['$1', '-', '$2'], 'IntPtrOp')).toBe('$1 - $2');
});

// --- normalizeInstructionArgs (integration) ---

test('normalizeInstructionArgs: splits pipes and normalises args', () => {
	const result = normalizeInstructionArgs(['MB_OK|MB_DEFBUTTON1', '/silent'], 'MessageBox', false);
	expect(result).toEqual(['MB_OK', '|', 'MB_DEFBUTTON1', '/SILENT']);
});

test('normalizeInstructionArgs: splits arithmetic for IntOp', () => {
	const result = normalizeInstructionArgs(['$1+$2'], 'IntOp', false);
	expect(result).toEqual(['$1', '+', '$2']);
});

test('normalizeInstructionArgs: normalises quotes', () => {
	const result = normalizeInstructionArgs(["'hello'"], 'Name', false);
	expect(result).toEqual(['"hello"']);
});

test('normalizeInstructionArgs: preserves $-prefixed args', () => {
	const result = normalizeInstructionArgs(['$INSTDIR'], 'SetOutPath', false);
	expect(result).toEqual(['$INSTDIR']);
});
