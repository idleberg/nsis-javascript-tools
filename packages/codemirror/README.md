# @nsis/codemirror

> Syntax definition for the NSIS language.

![License](https://img.shields.io/npm/l/%40nsis%2Fdent?style=for-the-badge)
[![Version: npm](https://img.shields.io/npm/v/@nsis/codemirror?style=for-the-badge)](https://www.npmjs.org/package/@nsis/codemirror)
[![CI](https://img.shields.io/github/actions/workflow/status/NSIS-Dev/codemirror/ci.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/NSIS-Dev/codemirror/actions/workflows/ci.yml)

**Latest version supported: NSIS v3.12**

[Demo Time](https://idleberg.github.io/nsis-javascript-tools/codemirror/) 🙌

## Installation

```bash
# Install
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

## License

Released under the [BSD License](LICENSE).
