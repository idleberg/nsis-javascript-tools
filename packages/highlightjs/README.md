# @nsis/highlightjs

> Syntax definition for the NSIS language.

![License](https://img.shields.io/npm/l/%40nsis%2Fdent?style=for-the-badge)
[![Version: npm](https://img.shields.io/npm/v/@nsis/highlightjs?style=for-the-badge)](https://www.npmjs.org/package/@nsis/highlightjs)
[![CI](https://img.shields.io/github/actions/workflow/status/NSIS-Dev/highlightjs/ci.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/NSIS-Dev/highlightjs/actions/workflows/ci.yml)

**Latest version supported: NSIS v3.12**

[Demo Time](https://idleberg.github.io/nsis-org/highlightjs/) 🙌

## Installation

```bash
$ npm install @nsis/highlightjs
```

## Usage

```typescript
import hljs from "highlight.js/lib/core";
import nsis from "@nsis/highlightjs";

hljs.registerLanguage("nsis", nsis);
hljs.highlightAll();
```

## License

Released under the [BSD License](LICENSE).
