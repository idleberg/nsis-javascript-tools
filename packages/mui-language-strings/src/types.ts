export interface MUILanguageFile {
  file: string | null;
  english: string | null;
  native: string | null;
  nativeASCII: string | null;
  strings: Record<string, string>;
}

export interface ParserOptions {
  looseQuotes?: boolean;
  minify?: boolean;
  stringify?: boolean;
}
