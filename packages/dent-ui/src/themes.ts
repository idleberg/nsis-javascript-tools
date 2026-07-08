import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';

export const editorTheme = EditorView.theme({
	'&': { height: '100%', fontSize: '13px' },
	'.cm-scroller': {
		overflow: 'auto',
		fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", "JetBrains Mono", ui-monospace, monospace',
	},
	'.cm-content': { padding: '0.75rem 0' },
	'.cm-line': { padding: '0 0.75rem' },
});

const mochaTheme = EditorView.theme(
	{
		'&': { color: '#cdd6f4', backgroundColor: '#1e1e2e' },
		'.cm-content': { caretColor: '#f5e0dc' },
		'.cm-cursor, .cm-dropCursor': { borderLeftColor: '#f5e0dc' },
		'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
			{ backgroundColor: '#585b7044' },
		'.cm-activeLine': { backgroundColor: '#585b7015' },
		'.cm-gutters': {
			backgroundColor: '#1e1e2e',
			color: '#6c7086',
			border: 'none',
		},
		'.cm-activeLineGutter': { backgroundColor: '#585b7015' },
		'.cm-selectionMatch': { backgroundColor: '#a6e3a122' },
		'&.cm-focused .cm-matchingBracket': { backgroundColor: '#585b7044' },
		'.cm-searchMatch': {
			backgroundColor: '#f9e2af33',
			outline: '1px solid #f9e2af66',
		},
		'.cm-searchMatch.cm-searchMatch-selected': { backgroundColor: '#a6e3a133' },
		'.cm-foldPlaceholder': {
			backgroundColor: 'transparent',
			border: 'none',
			color: '#6c7086',
		},
		'.cm-tooltip': { border: 'none', backgroundColor: '#313244' },
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: '#45475a',
				color: '#cdd6f4',
			},
		},
	},
	{ dark: true },
);

const mochaHighlightStyle = HighlightStyle.define([
	{ tag: tags.keyword, color: '#cba6f7' },
	{
		tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
		color: '#89b4fa',
	},
	{ tag: [tags.function(tags.variableName), tags.labelName], color: '#89b4fa' },
	{
		tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
		color: '#fab387',
	},
	{ tag: [tags.definition(tags.name), tags.separator], color: '#cdd6f4' },
	{
		tag: [
			tags.typeName,
			tags.className,
			tags.number,
			tags.changed,
			tags.annotation,
			tags.modifier,
			tags.self,
			tags.namespace,
		],
		color: '#f9e2af',
	},
	{
		tag: [
			tags.operator,
			tags.operatorKeyword,
			tags.url,
			tags.escape,
			tags.regexp,
			tags.link,
			tags.special(tags.string),
		],
		color: '#94e2d5',
	},
	{ tag: [tags.meta, tags.comment], color: '#6c7086' },
	{ tag: tags.strong, fontWeight: 'bold' },
	{ tag: tags.emphasis, fontStyle: 'italic' },
	{ tag: tags.strikethrough, textDecoration: 'line-through' },
	{ tag: tags.link, color: '#94e2d5', textDecoration: 'underline' },
	{ tag: tags.heading, fontWeight: 'bold', color: '#f38ba8' },
	{
		tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
		color: '#fab387',
	},
	{
		tag: [tags.processingInstruction, tags.string, tags.inserted],
		color: '#a6e3a1',
	},
	{ tag: tags.invalid, color: '#f38ba8' },
]);

const latteTheme = EditorView.theme(
	{
		'&': { color: '#4c4f69', backgroundColor: '#eff1f5' },
		'.cm-content': { caretColor: '#dc8a78' },
		'.cm-cursor, .cm-dropCursor': { borderLeftColor: '#dc8a78' },
		'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
			{ backgroundColor: '#acb0be44' },
		'.cm-activeLine': { backgroundColor: '#acb0be15' },
		'.cm-gutters': {
			backgroundColor: '#eff1f5',
			color: '#9ca0b0',
			border: 'none',
		},
		'.cm-activeLineGutter': { backgroundColor: '#acb0be15' },
		'.cm-selectionMatch': { backgroundColor: '#40a02b22' },
		'&.cm-focused .cm-matchingBracket': { backgroundColor: '#acb0be44' },
		'.cm-searchMatch': {
			backgroundColor: '#df8e1d33',
			outline: '1px solid #df8e1d66',
		},
		'.cm-searchMatch.cm-searchMatch-selected': { backgroundColor: '#40a02b33' },
		'.cm-foldPlaceholder': {
			backgroundColor: 'transparent',
			border: 'none',
			color: '#9ca0b0',
		},
		'.cm-tooltip': { border: 'none', backgroundColor: '#e6e9ef' },
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: '#ccd0da',
				color: '#4c4f69',
			},
		},
	},
	{ dark: false },
);

const latteHighlightStyle = HighlightStyle.define([
	{ tag: tags.keyword, color: '#8839ef' },
	{
		tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
		color: '#1e66f5',
	},
	{ tag: [tags.function(tags.variableName), tags.labelName], color: '#1e66f5' },
	{
		tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
		color: '#fe640b',
	},
	{ tag: [tags.definition(tags.name), tags.separator], color: '#4c4f69' },
	{
		tag: [
			tags.typeName,
			tags.className,
			tags.number,
			tags.changed,
			tags.annotation,
			tags.modifier,
			tags.self,
			tags.namespace,
		],
		color: '#df8e1d',
	},
	{
		tag: [
			tags.operator,
			tags.operatorKeyword,
			tags.url,
			tags.escape,
			tags.regexp,
			tags.link,
			tags.special(tags.string),
		],
		color: '#179299',
	},
	{ tag: [tags.meta, tags.comment], color: '#9ca0b0' },
	{ tag: tags.strong, fontWeight: 'bold' },
	{ tag: tags.emphasis, fontStyle: 'italic' },
	{ tag: tags.strikethrough, textDecoration: 'line-through' },
	{ tag: tags.link, color: '#179299', textDecoration: 'underline' },
	{ tag: tags.heading, fontWeight: 'bold', color: '#d20f39' },
	{
		tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
		color: '#fe640b',
	},
	{
		tag: [tags.processingInstruction, tags.string, tags.inserted],
		color: '#40a02b',
	},
	{ tag: tags.invalid, color: '#d20f39' },
]);

export const darkTheme = [mochaTheme, syntaxHighlighting(mochaHighlightStyle)];
export const lightTheme = [latteTheme, syntaxHighlighting(latteHighlightStyle)];
