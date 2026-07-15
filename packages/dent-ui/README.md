# @nsis/dent-ui

> Web UI for the Dent NSIS code formatter 

![License](https://img.shields.io/npm/l/%40nsis%2Fdent-ui?style=for-the-badge)
[![Version](https://img.shields.io/npm/v/@nsis/dent-ui?style=for-the-badge)](https://www.npmjs.org/package/@nsis/dent-ui)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/nsis-javascript-tools/ci.yml?style=for-the-badge)](https://github.com/idleberg/nsis-javascript-tools/actions)

[Demo Time](https://idleberg.github.io/nsis-javascript-tools/dent/) 🙌

## Usage

```svelte
<script>
  import Editor from '@nsis/dent-ui/Editor.svelte';
</script>

<Editor
  dark={true}
  label="NSIS editor"
  oncreate={(view) => view.focus()}
/>
```

### Props

| Prop         | Type                        | Default | Description                            |
| ------------ | --------------------------- | ------- | -------------------------------------- |
| `dark`       | `boolean`                   | `true`  | Use dark theme                         |
| `extensions` | `Extension[]`               | `[]`    | Additional CodeMirror extensions       |
| `label`      | `string`                    | `''`    | Accessible label for the editor        |
| `strict`     | `boolean`                   | `false` | Case-sensitive NSIS keyword matching   |
| `oncreate`   | `(view: EditorView) => void`| —       | Callback when the editor view is ready |

By default, NSIS keywords are matched case-insensitively (e.g. `messagebox` and `MessageBox` are both highlighted). Set `strict` to `true` to require canonical casing.

## License

This work is licensed under [The MIT License](LICENSE).
