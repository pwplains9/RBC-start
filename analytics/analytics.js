/* global yaCounter##### */ // установка трекера с файла аналитики

import globals from './globals';
import vars from "./helpers";

const clienLinks = [''];

function clearText(text) {
    return text.toString().trim().replace(/\s+/g, ' ');
}

function isClientLink(href) {
    let value = false;

    clienLinks.forEach((link) => {
        if (href.indexOf(link) >= 0) {
            value = true;
        }
    });

    return value;
}

function spentOnPage15sec() {
    clearTimeout(globals.$window.data('timeout15Sec'));

    globals.$window.data('timeout15Sec', setTimeout(() => {
        ga('rbcspec.send', 'event', 'page', 'spent_on_page_15_sec');
        ga('send', 'event', 'page', 'spent_on_page_15_sec');
    }, 10000));
}

function virtualHit(path) {
    if (window.ga) {
        ga('set', 'page', path);
        ga('send', 'pageview', path);
        ga('rbcspec.set', 'page', path);
        ga('rbcspec.send', 'pageview', path);
    }

    if (window.yaCounter######) {
        yaCounter#######.hit(path);// установка трекера с файла аналитики
    }
}

vars.$document.on('page-enter', (e, namespace) => {
    if (namespace) {
        virtualHit(window.location.pathname + window.location.hash + location.search);
    }
});

jQuery.scrollDepth({
    userTiming: false,
    pixelDepth: false,
    gtmOverride: true,
    eventHandler(data) {
        ga('send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
        ga('rbcspec.send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
    },
});

function init() {
    const $showOnScrollElements = $('.cards__item, .cards__banner, .js-banner'); 

    const showElementsOnScroll = () => { // функция для обработки события элементров при попадении в viewport пользователя.
        const scrollTop = vars.$window.scrollTop();
        const scrollBottom = scrollTop + innerHeight;

        $showOnScrollElements
            .filter(':visible')
            .each((index, element) => {
                const $element = $(element);

                const elementOffsetTop = $element.offset().top;
                const elementOffsetBottom = elementOffsetTop + $element.outerHeight();

                if (scrollBottom >= elementOffsetTop && scrollTop <= elementOffsetBottom && !$element.data('showed')) {
                    $element.data('showed', true);


                    console.log($element)

                    if ($element.hasClass('cards__item')) {
                        const num = clearText($element.find('.cards__number').text());

                        ga('send', 'event', 'cards', 'show', num, {nonInteraction: true});
                    } else if ($element.hasClass('cards__banner')) {
                        ga('send', 'event', 'banner', 'show', 'bottom banner', {nonInteraction: true});
                    } else if ($element.hasClass('js-banner')) {
                        const type = clearText($element.data('type'));

                        ga('send', 'event', 'banner', 'show', `${type} banner`, {nonInteraction: true});
                    }
                }
            });
    };
	
    $showOnScrollElements.data('showed', false);

    vars.$window.on('scroll', showElementsOnScroll);

    $('.header__partner').on('click', () => {
        ga('send', 'event', 'client link', 'logo header');
        ga('rbcspec.send', 'event', 'client link', 'click');
    });

    $('.header__logo').on('click', () => {
        ga('send', 'event', 'nav', 'rbc logo');
    });

    $('.header__container a:not(.header__partner):not(.header__logo)').on('click', () => {
        ga('send', 'event', 'nav', 'rbc topline link');
    })

    $('.article__text a, .article__subtitle a, .article__special a, .article__insert a, .article__people a').on('click', (e) => { // пример функции для обработки кликов по ссылкам (на клиента и на посторонние)
        const name = clearText(e.currentTarget.textContent);

        if (isClientLink(e.currentTarget.getAttribute('href'))) {
            ga('send', 'event', 'client link', 'article text link', name);
            ga('rbcspec.send', 'event', 'client link', 'click');
        } else {
            ga('send', 'event', 'article', 'text link', name);
        }
    });

    $('.article__read-also .read-also__item').on('click', (e) => {
        const name = clearText($(e.currentTarget).find('.read-also__subtitle').text());
        const type = $(e.currentTarget).closest('.article__read-also').hasClass('article__read-also--vertical') ? 'right' : 'bottom';

        ga('send', 'event', 'article', `see also ${type}`, name);
    });

    $('.article__social .social__item').on('click', (e) => {
        const name = clearText(e.currentTarget.dataset.social);

        ga('send', 'event', 'share', 'article share', name);
    });

    $('.cards__banner, .js-banner').on('click', (e) => {
        const type = clearText($(e.currentTarget).hasClass('cards__banner') ? 'bottom' : $(e.currentTarget).data('type'));

        ga('send', 'event', 'client link', 'banner click', `${type} banner`);
        ga('rbcspec.send', 'event', 'client link', 'click');
    });

    $('.footer .social__item, .test__share .social__item').on('click', (e) => {
        const name = clearText(e.currentTarget.dataset.social);

        ga('send', 'event', 'share', 'project share', name);
    });


    $('.test__controls .social__item').on('click', (e) => {
        let name = $(e.currentTarget).data('social');

        ga("send", "event", "share", "test final share", name);
    });

    $('.test__caption a').on('click', (e) => {
        let name = $(e.currentTarget).text();

        let stepQuestion = $(e.currentTarget).closest('.test__step').find('.test__question').text();

        ga("send", "event", "client link", "test answer text link", `${stepQuestion} - ${name}`);

        ga("rbcspec.send", "event", "client link", "click");
    });

    $('.test__radio').on('click', (e) => {
        let name = $(e.currentTarget).text();
        let stepIndex = $(e.currentTarget).closest('.test__step').find('.test__current').text();
        ga("send", "event", "test", `question answer ${clearText(stepIndex)}`, clearText(name));
    });

    vars.$document.on('test-start', () => { // события теста
        ga("send", "event", "test", "start");
        ga("rbcspec.send", "event", "test", "start");
    }).on('test-question-show', (e, stepIndex, question) => {
        ga("send", "event", "test", `question show ${stepIndex}`, clearText(question), {nonInteraction: true});
    }).on('test-result', (e, result, count) => {
        ga("send", "event", "test", "finish", result, count);
        ga("rbcspec.send", "event", "test", "finish", "result");
    })
        .on('test-reload', () => {
            ga("send", "event", "test", "resume");
        })
        .on('slider-change', () => {
            ga("send", "event", "article", "slider change");
        });
}

export default {
    spentOnPage15sec,
    init,
};
