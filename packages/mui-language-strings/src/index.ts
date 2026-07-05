import type { MUILanguageFile, ParserOptions } from './types.ts';

function parse(input: string, options: ParserOptions & { stringify: true }): string;
function parse(input: string, options?: ParserOptions): MUILanguageFile;
function parse(input: string, options: ParserOptions = {}): MUILanguageFile | string {
  const output: MUILanguageFile = {
    file: null,
    english: null,
    native: null,
    nativeASCII: null,
    strings: {}
  };

  const lines = input.split('\n');

  for (const line of lines) {
    const stripped = line.replace(/(#.*)$/mg, '').trim();

    if (stripped.startsWith('!insertmacro LANGFILE')) {
      const matches = stripped.match(/"[^"]*"|=/g);
      if (!matches) continue;

      const values: string[] = [];
      for (const [i, m] of matches.entries()) {
        const unquoted = m.replace(/^"/, '').replace(/"$/, '');
        values.push(m === '=' ? (values[i - 1] ?? '') : unquoted);
      }

      output.file = values[0] ?? null;
      output.english = values[1] ?? null;
      output.native = values[2] ?? null;
      output.nativeASCII = values[3] ?? null;
    }

    // biome-ignore lint/suspicious/noTemplateCurlyInString: Valid NSIS template string, not a template literal
    if (stripped.startsWith('${LangFileString}')) {
      const re = options.looseQuotes
        ? /^\${LangFileString}\s*(?<key>\w+)\s*"?(?<value>.*)"?$/
        : /^\${LangFileString}\s*(?<key>\w+)\s*"(?<value>.*)"$/;
      const result = re.exec(stripped);
      if (!result?.groups) continue;

      const { key, value } = result.groups;
      if (key && value !== undefined) {
        output.strings[key] = value;
      }
    }
  }

  if (options.stringify === true) {
    const indentation: number = options.minify === true ? 0 : 2;
    return JSON.stringify(output, null, indentation);
  }

  return output;
}

export type { MUILanguageFile, ParserOptions } from './types.ts';
export { parse };
