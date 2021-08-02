import Share from 'ninelines-sharing';

$('[data-social]').on('click', (e) => {
	let social = $(e.currentTarget).data('social');
	let url = location.origin + location.pathname + location.search;

	Share[social](url);
});
