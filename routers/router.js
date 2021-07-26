import {Router} from 'ninelines-router';

import helpers from './helpers';
import animation from './animation';

history.scrollRestoration = 'manual';

const router = new Router({

	onEnter(prevState, curState) {
		window.scrollTo(0, 0);

		helpers.setPage(curState.route.name);

		return animation.enter(curState.route.name);
	},

	onLeave(curState) {
		if (curState.route) {
			return animation.leave(curState.route.name);
		}

		return Promise.resolve();
	},

	onNotFound() {
		router.navigate('/');

		return Promise.resolve();
	},

});

router.addRoute({
	path: '/',
	name: 'home',
});

router.addRoute({
	path: '/article',
	name: 'article',
});

router.addRoute({
	path: '/details',
	name: 'details',
});

router.addRoute({
	path: '/test',
	name: 'test',
});

router.start();

export default router;
