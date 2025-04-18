import { useEffect, useRef } from 'react';
import { analyticsService } from '../services/analytics';
import { throttle } from '../utils/throttle';

interface UseTrackSectionProps {
	sectionId: string;
	threshold?: number;
	minViewTime?: number;
}

export const useTrackSection = ({
	sectionId,
	threshold = 0.5, // 50% of the section needs to be visible
	minViewTime = 3000, // 3 seconds minimum
}: UseTrackSectionProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isVisibleRef = useRef<boolean>(false);
	const enterTimeRef = useRef<Date | null>(null);

	useEffect(() => {
		if (!window.IntersectionObserver) {
			console.warn('IntersectionObserver not supported in this browser');
			return;
		}

		// Create observer with throttled callback
		const handleIntersect = throttle((entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;

			if (entry.isIntersecting && !isVisibleRef.current) {
				// Section entered viewport
				isVisibleRef.current = true;
				enterTimeRef.current = new Date();

				// Track the section view
				analyticsService.trackSectionView(sectionId, enterTimeRef.current);
			} else if (!entry.isIntersecting && isVisibleRef.current) {
				// Section exited viewport
				isVisibleRef.current = false;

				if (enterTimeRef.current) {
					const exitTime = new Date();
					const timeSpent = exitTime.getTime() - enterTimeRef.current.getTime();

					// Only record if user spent minimum time looking at the section
					if (timeSpent >= minViewTime) {
						analyticsService.endSectionView(sectionId, exitTime);
					}

					enterTimeRef.current = null;
				}
			}
		}, 200); // Throttle to avoid too many callbacks

		const observer = new IntersectionObserver(handleIntersect, {
			threshold,
			rootMargin: '0px',
		});

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}

			// If component unmounts while section is visible, end the section view
			if (isVisibleRef.current && enterTimeRef.current) {
				const exitTime = new Date();
				analyticsService.endSectionView(sectionId, exitTime);
			}
		};
	}, [sectionId, threshold, minViewTime]);

	return sectionRef;
};
