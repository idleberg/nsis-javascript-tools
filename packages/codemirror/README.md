# @nsis/codemirror

> Language mode for CodeMirror 6.

![License](https://img.shields.io/npm/l/@nsis%2Fcodemirror?style=for-the-badge)
[![Version](https://img.shields.io/npm/v/@nsis/codemirror?style=for-the-badge)](https://www.npmjs.org/package/@nsis/codemirror)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/nsis-javascript-tools/ci.yml?style=for-the-badge)](https://github.com/idleberg/nsis-javascript-tools/actions)

**Latest version supported: NSIS v3.12**

[Demo Time](https://idleberg.github.io/nsis-javascript-tools/codemirror/) 🙌

## Installation

```bash
$ npm install @nsis/codemirror
```

## Usage

```typescript
import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { nsis } from "@nsis/codemirror";

new EditorView({
  doc: 'Name "Example"\nOutFile "example.exe"',
  extensions: [basicSetup, nsis()],
  parent: document.getElementById("editor")!,
});
```

### Case Sensitivity

NSIS is a case-insensitive language. By default, the language mode matches keywords case-insensitively, so `MessageBox`, `messagebox`, and `MESSAGEBOX` are all recognized as commands.

If you prefer strict, case-sensitive matching (only canonical casing is recognized), pass `{ strict: true }`:

```typescript
nsis({ strict: true })
```

## License

Released under [The MIT
License](LICENSE).
