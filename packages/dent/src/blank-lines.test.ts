import type { CSTNode } from '@nsis/parser';
import { expect, test } from 'vitest';
import { ensureBlankAroundBlocks, trimAndCollapseBlanks } from './blank-lines.ts';

const blank: CSTNode = { type: 'blank' };
const instr = (keyword: string): CSTNode => ({ type: 'instruction', keyword, args: [] });
const comment: CSTNode = { type: 'comment', style: 'semicolon', value: 'note' };

// --- ensureBlankAroundBlocks ---

test('ensureBlankAroundBlocks: inserts blank before block opener after instruction', () => {
	const nodes: CSTNode[] = [instr('Name'), instr('Section')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(3);
	expect(result[1].type).toBe('blank');
});

test('ensureBlankAroundBlocks: no blank between consecutive openers', () => {
	const nodes: CSTNode[] = [instr('Section'), instr('Function')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(2);
});

test('ensureBlankAroundBlocks: inserts blank after block closer before instruction', () => {
	const nodes: CSTNode[] = [instr('SectionEnd'), instr('Name')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(3);
	expect(result[1].type).toBe('blank');
});

test('ensureBlankAroundBlocks: inserts blank between closer and next opener', () => {
	const nodes: CSTNode[] = [instr('SectionEnd'), instr('Section')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(3);
	expect(result[1].type).toBe('blank');
});

test('ensureBlankAroundBlocks: no blank between closer and next closer', () => {
	const nodes: CSTNode[] = [instr('SectionEnd'), instr('FunctionEnd')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(2);
});

test('ensureBlankAroundBlocks: does not duplicate existing blank', () => {
	const nodes: CSTNode[] = [instr('Name'), blank, instr('Section')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(3);
});

test('ensureBlankAroundBlocks: comment before opener does not get blank between them', () => {
	const nodes: CSTNode[] = [comment, instr('Section')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(2);
});

test('ensureBlankAroundBlocks: inserts blank before comment leading into opener', () => {
	const nodes: CSTNode[] = [instr('Name'), comment, instr('Section')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(4);
	expect(result[1].type).toBe('blank');
});

test('ensureBlankAroundBlocks: case keyword treated as opener', () => {
	// biome-ignore lint/suspicious/noTemplateCurlyInString: NSIS definition
	const nodes: CSTNode[] = [instr('Name'), instr('${Case}')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(3);
	expect(result[1].type).toBe('blank');
});

test('ensureBlankAroundBlocks: empty input returns empty', () => {
	expect(ensureBlankAroundBlocks([])).toEqual([]);
});

test('ensureBlankAroundBlocks: single node returns unchanged', () => {
	const nodes: CSTNode[] = [instr('Name')];
	const result = ensureBlankAroundBlocks(nodes);
	expect(result.length).toBe(1);
});

// --- trimAndCollapseBlanks ---

test('trimAndCollapseBlanks: strips leading blanks', () => {
	const nodes: CSTNode[] = [blank, blank, instr('Name')];
	const result = trimAndCollapseBlanks(nodes);
	expect(result.length).toBe(1);
	expect(result[0].type).toBe('instruction');
});

test('trimAndCollapseBlanks: strips trailing blanks', () => {
	const nodes: CSTNode[] = [instr('Name'), blank, blank];
	const result = trimAndCollapseBlanks(nodes);
	expect(result.length).toBe(1);
});

test('trimAndCollapseBlanks: collapses consecutive blanks to one', () => {
	const nodes: CSTNode[] = [instr('Name'), blank, blank, blank, instr('Section')];
	const result = trimAndCollapseBlanks(nodes);
	expect(result.length).toBe(3);
	expect(result[1].type).toBe('blank');
});

test('trimAndCollapseBlanks: single blank between nodes is preserved', () => {
	const nodes: CSTNode[] = [instr('Name'), blank, instr('Section')];
	const result = trimAndCollapseBlanks(nodes);
	expect(result.length).toBe(3);
});

test('trimAndCollapseBlanks: empty input returns empty', () => {
	expect(trimAndCollapseBlanks([])).toEqual([]);
});

test('trimAndCollapseBlanks: all blanks returns empty', () => {
	expect(trimAndCollapseBlanks([blank, blank, blank])).toEqual([]);
});

test('trimAndCollapseBlanks: no blanks returns unchanged', () => {
	const nodes: CSTNode[] = [instr('Name'), instr('Section')];
	const result = trimAndCollapseBlanks(nodes);
	expect(result.length).toBe(2);
});
