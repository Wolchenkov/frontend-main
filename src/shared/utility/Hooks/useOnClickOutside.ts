import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const checkClass = (el: HTMLElement, cl: string): boolean => el.classList?.contains(cl);

const hasIgnoreClass = (e: any, ignoreClass: string): boolean => {
	let el = e.target || e;

	while (el) {
		if (checkClass(el, ignoreClass)) {
			return true;
		}

		el = el.parentElement;
	}

	return false;
};

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: Event) => void,
	ignoreClass?: string
) => {
	useEffect(() => {
		const listener = (event: Event) => {
			const el = ref?.current;
			if (!el || el.contains((event?.target as Node) || null) || (ignoreClass && hasIgnoreClass(event, ignoreClass))) {
				return;
			}

			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler, ignoreClass]);
};
