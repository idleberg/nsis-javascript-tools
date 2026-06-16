/*! prism-nsis | MIT License | github.com/idleberg/prismjs-nsis */

Prism.languages.nsis = {
	'comment': {
		pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|[#;].*)/,
		lookbehind: true,
		greedy: true
	},
	'string': {
		pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'keyword': {
		pattern: /(^\s*)%NSIS_KEYWORDS%\b/m,
		lookbehind: true
	},
	'property': /\b%NSIS_PROPERTIES%\b/,
	'constant': /\${[\w.:^-]+}|\$\([\w.:^-]+\)/i,
	'variable': /\$\w+/i,
	'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
	'operator': /--?|\+\+?|<=?|>=?|==?=?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/,
	'important': {
		pattern: /(^\s*)%NSIS_IMPORTANT%\b/mi,
		lookbehind: true
	}
};
