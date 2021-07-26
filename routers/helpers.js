const $html = $('html');

export default {
	setPage(name) {
		if (!name) {
			return;
		}

		$html.attr('data-page', name);
	},

};
