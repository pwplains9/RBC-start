/* global barba, barbaRouter, videojs */
/* globals scrollDepth */
import vars from './helpers';
import analytics from './analytics';
import lazyLoading from "./components/lazyLoading";
import share from "./components/share";
import menu from "./components/header";

const routes = [ // здесь добавляем роуты страниц
    {
        path: '/',
        name: 'index',
    },
    {
        path: '/article/:id',
        name: 'article',
    }
];

barba.use(barbaRouter, {
    routes,
});

barba.hooks.enter((data) => {
    vars.$document.trigger(
        'page-enter',
        [data.current.namespace, data.next.namespace], // обработчик для аналитики
    );
});

barba.hooks.beforeEnter(({next}) => {
    lazyLoading.init();
    vars.scrollTo(vars.$html, 0);
    vars.$html.removeClass('no-scroll');
});

barba.hooks.afterEnter((data) => {
    scrollDepth.reset(); 
    analytics.spentOnPage15sec();
    analytics.init(); // для глобальных фукций инициализируем здесь (Это шеринги, аналитика, меню и т.д)

    console.log(data.next.namespace);

    if (data.next.namespace === 'название страницы') { // для инициализации скриптов для нужной страницы ипользуем такую конструкцию
	
    }
});

barba.hooks.afterLeave((data) => {
    console.log(data.next.namespace);

    // здесь убираем события 
    if (data.next.namespace === 'название страницы') { // для инициализации скриптов для нужной страницы ипользуем такую конструкцию
	
    }
});
// init Barba
barba.init({
    sync: true,
    timeout: 2000,
    transitions: [
        {
            name: 'none',
            leave(data) {
                let done = this.async();

                gsap.to(data.current.container, {
                    duration: 0.4,
                    autoAlpha: 0,
                    onComplete: () => {
                        done();
                    },
                });
            },
            enter(data) {
                let done = this.async();
                gsap.from(data.next.container, {
                    duration: 0.4,
                    autoAlpha: 0,
                    onComplete: done,
                });
            },
            appear() {
            },
        },
        {
            name: 'slide-enter[-index]',
            appear() {
            },
        },
    ],

    views: [
        {
            namespace: 'index',
        },
    ],
});
