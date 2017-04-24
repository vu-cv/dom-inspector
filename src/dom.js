import { mixin } from './utils.js';

export function $(slector) {
	return document.documentElement.querySelector(slector);
}

function findPos(ele) {
	let computedStyle = getComputedStyle(ele);
	let _x = ele.getBoundingClientRect().left - parseFloat(computedStyle['margin-left']);
	let _y = ele.getBoundingClientRect().top - parseFloat(computedStyle['margin-top']);
	let el = ele.parent;
	while (el) {
		computedStyle = getComputedStyle(el);
		_x += el.frameElement.getBoundingClientRect().left - parseFloat(computedStyle['margin-left']);
		_y += el.frameElement.getBoundingClientRect().top - parseFloat(computedStyle['margin-top']);
		el = el.parent;
	}
	return {
		top: _y,
		left: _x
	};
}

/**
 * @param  { Dom Element }
 * @return { Object }
 */
export function getElementInfo(ele) {
	const result = {};
	const requiredValue = [
		'border-top-width',
		'border-right-width',
		'border-bottom-width',
		'border-left-width',
		'margin-top',
		'margin-right',
		'margin-bottom',
		'margin-left',
		'padding-top',
		'padding-right',
		'padding-bottom',
		'padding-left'
	];

	const computedStyle = getComputedStyle(ele);
	requiredValue.forEach(item => {
		result[item] = parseFloat(computedStyle[item]);
	});

	mixin(result, {
		width: ele.offsetWidth - result['border-left-width'] - result['border-right-width'] - result['padding-left'] - result['padding-right'],
		height: ele.offsetHeight - result['border-top-width'] - result['border-bottom-width'] - result['padding-top'] - result['padding-bottom']
	});
	mixin(result, findPos(ele));
	return result;
}


export default $;
