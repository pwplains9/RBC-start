const $body = $('body');

function enter(page) {
    return new Promise((resolve) => {
        const $page = $(`.${page}`);

        $body.removeClass('is-hidden');
        $page.removeClass('is-hidden');

        if (page === 'article') {

        } else if (page === 'details') {

        } else if (page === 'test') {

        }

		gsap.from($body, 0.3, {
            onComplete: resolve,
            opacity: 0,
            clearProps: 'all',
        });
    });
}

function leave(page) {
    return new Promise((resolve) => {
        const $page = $(`.${page}`);

        gsap.to($body, 0.3, {
            onComplete() {
                $body.addClass('is-hidden');
                $page.addClass('is-hidden');

                resolve();
            },
            opacity: 0,
            clearProps: 'all',
        });
    });
}

export default {
    enter,
    leave,
};
