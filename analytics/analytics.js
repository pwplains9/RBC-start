/* global трекер yaCounter с файла по установке аналитики yaCounter#######*/

import scrollDepth from 'scroll-depth';
import router from './router';

const $window = $(window);
const $document = $(document);

function spentOnPage15sec() {
	clearTimeout($window.data('timeout15Sec'));

	$window.data('timeout15Sec', setTimeout(() => {
		ga('rbcspec.send', 'event', 'page', 'spent_on_page_15_sec');
		ga('send', 'event', 'page', 'spent_on_page_15_sec');
	}, 15000));
}

function virtualHit(path) {
	if (window.ga) {
		ga('set', 'page', path);
		ga('send', 'pageview', path);
		ga('rbcspec.set', 'page', path);
		ga('rbcspec.send', 'pageview', path);
	}

	if (window.yaCounter#######) {
		yaCounter#######.hit(path);
	}
}

function clearText(text) {
	return text.toString().trim().replace(/\s+/, ' ');
}

jQuery.scrollDepth({
	userTiming: false,
	pixelDepth: false,
	gtmOverride: true,
	eventHandler(data) {
		ga('send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
		ga('rbcspec.send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
	},
});

router.on('enter', (prevState, currentState) => {
	return new Promise((resolve) => {
		spentOnPage15sec();

		if (prevState.route && currentState.route) {
			virtualHit(currentState.route.generatePath({params: currentState.params}) + location.search);

			scrollDepth.reset();
		}

		resolve();
	});
});

// common

$('.header__partner').on('click', () => {
	ga('send', 'event', 'client link', 'logo header');
	ga('rbcspec.send', 'event', 'client link', 'click');
});

$('.header__rbc').on('click', () => {
	ga('send', 'event', 'nav', 'rbc logo');
});

$document.on('slider-change', () => {
	ga('send', 'event', 'article', 'slider change');
});

// test

$document
	.on('test-start', () => {
		ga('send', 'event', 'test', 'start');
		ga('rbcspec.send', 'event', 'test', 'start');
	})
	.on('test-question-show', (e, num, name) => {
		name = clearText(name).substr(0, 100);

		ga('send', 'event', 'test', `question show ${clearText(num)}`, name);
	})
	.on('test-answer', (e, num, name) => {
		name = clearText(name).substr(0, 100);

		ga('send', 'event', 'test', `question answer ${clearText(num)}`, name);
	})
	.on('test-result', (e, result, count) => {
		ga('send', 'event', 'test', 'finish', clearText(result), count);
		ga('rbcspec.send', 'event', 'test', 'finish', result);
	})
	.on('test-reload', () => {
		ga('send', 'event', 'test', 'resume');
	});
