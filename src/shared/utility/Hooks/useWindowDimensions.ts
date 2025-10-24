import { useState, useEffect } from 'react';

export function useWindowDimensions() {
	const [windowSize, setWindowSize] = useState<Record<string, undefined | number>>({
		width: undefined,
		height: undefined,
	});

	function handleResize() {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useEffect(() => {
		// only execute all the code below in client side
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
			handleResize();
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);
	return windowSize;
}
