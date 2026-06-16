define(function (require, exports) {
	'use strict';

	const oop = require('../lib/oop');
	const TextMode = require('./text').Mode;
	const NSISHighlightRules = require('./nsis_highlight_rules').NSISHighlightRules;

	// TODO: pick appropriate fold mode
	const FoldMode = require('./folding/cstyle').FoldMode;

	const Mode = function () {
		this.HighlightRules = NSISHighlightRules;
		this.foldingRules = new FoldMode();
	};

	oop.inherits(Mode, TextMode);

	(function () {
		this.lineCommentStart = [';', '#'];
		this.blockComment = { start: '/*', end: '*/' };
		this.$id = 'ace/mode/nsis';
	}.call(Mode.prototype));

	exports.Mode = Mode;
});
