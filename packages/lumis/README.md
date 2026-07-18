# @nsis/lumis

> NSIS language support for the Lumis syntax highlighter.

![License](https://img.shields.io/npm/l/@nsis%2Flumis?style=for-the-badge)
[![Version](https://img.shields.io/npm/v/@nsis/lumis?style=for-the-badge)](https://www.npmjs.org/package/@nsis/lumis)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/nsis-javascript-tools/ci.yml?style=for-the-badge)](https://github.com/idleberg/nsis-javascript-tools/actions)

**Latest version supported: NSIS v3.12**

[Demo Time](https://idleberg.github.io/nsis-javascript-tools/lumis/) 🙌

## Installation

```bash
# Install
$ npm install @nsis/lumis
```

## Usage

```typescript
import { highlight } from "@lumis-sh/lumis";
import { htmlInline } from "@lumis-sh/lumis/formatters";
import { nsis } from "@nsis/lumis";

const html = await highlight(
  'Name "Example"\nOutFile "example.exe"',
  htmlInline({ language: nsis, theme: yourTheme }),
);
```

## License

Released under [The MIT License](LICENSE).
