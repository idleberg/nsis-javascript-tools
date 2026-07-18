# @nsis/textmate

> NSIS TextMate grammar for Shiki and other highlighters.

![License](https://img.shields.io/npm/l/@nsis%2Ftextmate?style=for-the-badge)
[![Version](https://img.shields.io/npm/v/@nsis/textmate?style=for-the-badge)](https://www.npmjs.org/package/@nsis/textmate)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/nsis-javascript-tools/ci.yml?style=for-the-badge)](https://github.com/idleberg/nsis-javascript-tools/actions)

[Demo Time](https://idleberg.github.io/nsis-javascript-tools/textmate/) 🙌

## Installation

```bash
# Install
$ npm install @nsis/textmate
```

## Usage

```typescript
import { createHighlighter } from "shiki";
import grammar from "@nsis/textmate";

const highlighter = await createHighlighter({
  themes: ["one-dark-pro"],
  langs: [{ ...grammar, name: "nsis" }],
});

const html = highlighter.codeToHtml('Name "Example"', {
  lang: "nsis",
  theme: "one-dark-pro",
});
```

## License

Released under the [MIT License](LICENSE-MIT) or [Apache License 2.0](LICENSE-APACHE).
