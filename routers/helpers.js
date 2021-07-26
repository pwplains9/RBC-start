const $html = $('html');

export default {

	isMobile() {
		return innerWidth <= 1024;
	},

	isIEorEdge() {
		return $html.hasClass('is-browser-ie') || $html.hasClass('is-browser-edge');
	},

	setPage(name) {
		if (!name) {
			return;
		}

		$html.attr('data-page', name);
	},

};
