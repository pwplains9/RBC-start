import AOS from 'aos';
import vars from '../helpers';

export function refresh() {
	$('.aos-animate').removeClass('aos-animate');
}

export function aosInit() {
	AOS.init({
		once: true,
		disable: vars.isMobile(),
	});
}
