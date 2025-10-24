import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextOverflow = <T extends HTMLElement>(): [React.RefObject<T>, boolean] => {
	const ref = useRef<T>(null);
	const [isOverflowed, setIsOverflowed] = useState(false);

	const checkOverflow = useCallback(() => {
		if (ref.current) {
			const { scrollWidth, clientWidth } = ref.current;
			setIsOverflowed(scrollWidth > clientWidth);
		}
	}, []);

	useEffect(() => {
		checkOverflow();

		window.addEventListener('resize', checkOverflow);
		return () => {
			window.removeEventListener('resize', checkOverflow);
		};
	}, [checkOverflow]);

	return [ref, isOverflowed];
};
