import { useEffect, useRef } from 'react';
import { analyticsService } from '../services/analytics';
import { throttle } from '../utils/throttle';

export const useScrollTracker = (updateInterval = 2000) => {
	const maxScrollDepthRef = useRef<number>(0);

	useEffect(() => {
		// Calculate scroll depth as a percentage
		const calculateScrollDepth = (): number => {
			const scrollTop =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop ||
				0;
			const documentHeight = Math.max(
				document.body.scrollHeight,
				document.documentElement.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.offsetHeight,
				document.body.clientHeight,
				document.documentElement.clientHeight
			);
			const windowHeight = window.innerHeight;

			// Calculate how far the user has scrolled as a percentage
			const scrollPercentage = Math.min(
				100,
				Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
			);

			return isNaN(scrollPercentage) ? 0 : scrollPercentage;
		};

		// Only update if the new depth is greater than the previous max
		const updateScrollDepth = throttle(() => {
			const currentDepth = calculateScrollDepth();

			if (currentDepth > maxScrollDepthRef.current) {
				maxScrollDepthRef.current = currentDepth;
				analyticsService.updateScrollDepth(currentDepth);
			}
		}, updateInterval);

		// Initial calculation
		updateScrollDepth();

		// Add scroll event listener
		window.addEventListener('scroll', updateScrollDepth, { passive: true });

		return () => {
			window.removeEventListener('scroll', updateScrollDepth);

			// Final update on unmount
			const finalDepth = calculateScrollDepth();
			if (finalDepth > maxScrollDepthRef.current) {
				analyticsService.updateScrollDepth(finalDepth);
			}
		};
	}, [updateInterval]);
};
