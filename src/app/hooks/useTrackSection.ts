import { useEffect, useRef, useCallback } from 'react';
import { analyticsService } from '../services/analytics';
import { throttle } from '../utils/throttle';

interface UseTrackSectionProps {
	sectionId: string;
	threshold?: number;
	minViewTime?: number; // Keep for exit condition threshold
	longViewTime?: number; // New threshold for sending mid-view event
}

export const useTrackSection = ({
	sectionId,
	threshold = 0.5,
	minViewTime = 3000, // 3 seconds minimum for *exit* event if 5s wasn't hit
	longViewTime = 5000, // 5 seconds for long view event
}: UseTrackSectionProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isVisibleRef = useRef<boolean>(false);
	const enterTimeRef = useRef<Date | null>(null);
	const longViewTimerRef = useRef<NodeJS.Timeout | null>(null); // Timer for 5s view
	const sentLongViewEventRef = useRef<boolean>(false); // Flag to track if 5s event sent

	// Use useCallback for sendDurationData as it's now a dependency of useEffect
	const sendDurationData = useCallback(
		(exitTime: Date) => {
			if (!enterTimeRef.current) return;
			const duration = Math.round(
				(exitTime.getTime() - enterTimeRef.current.getTime()) / 1000
			);
			if (duration < 0) return; // Ignore negative durations

			console.log(`[${sectionId}] Sending duration data: ${duration}s`);
			analyticsService.trackSectionViewDuration(
				sectionId,
				enterTimeRef.current,
				duration
			);
		},
		[sectionId]
	); // Dependency on sectionId

	// Define exit logic separately to reuse
	const handleExitLogic = useCallback(() => {
		console.log(`[${sectionId}] Handling exit logic.`);
		isVisibleRef.current = false;

		// Clear the 5-second timer if it's still running
		if (longViewTimerRef.current) {
			clearTimeout(longViewTimerRef.current);
			longViewTimerRef.current = null;
			console.log(`[${sectionId}] Cleared long view timer on exit/hide.`);
		}

		if (enterTimeRef.current) {
			const exitTime = new Date();
			const timeSpent = exitTime.getTime() - enterTimeRef.current.getTime();

			// Send data on exit ONLY IF 5s event wasn't sent AND minViewTime is met
			if (!sentLongViewEventRef.current && timeSpent >= minViewTime) {
				console.log(
					`[${sectionId}] Sending exit/hide data (duration: ${
						timeSpent / 1000
					}s >= ${minViewTime / 1000}s)`
				);
				sendDurationData(exitTime);
			} else if (sentLongViewEventRef.current) {
				console.log(
					`[${sectionId}] Exit/hide data skipped (long view already sent). Total time: ${
						timeSpent / 1000
					}s`
				);
			} else {
				console.log(
					`[${sectionId}] Exit/hide data skipped (duration: ${
						timeSpent / 1000
					}s < ${minViewTime / 1000}s)`
				);
			}

			// Reset enter time for next entry
			enterTimeRef.current = null;
		}
	}, [minViewTime, sendDurationData, sectionId]); // Include dependencies

	useEffect(() => {
		if (!window.IntersectionObserver) {
			console.warn('IntersectionObserver not supported');
			return;
		}

		const handleIntersectCallback = (entries: IntersectionObserverEntry[]) => {
			// Ignore intersection events if the tab is hidden
			if (document.visibilityState === 'hidden') {
				console.log(`[${sectionId}] Intersection ignored (tab hidden)`);
				return;
			}

			const [entry] = entries;

			if (entry.isIntersecting && !isVisibleRef.current) {
				// --- Section Entered Viewport ---
				isVisibleRef.current = true;
				enterTimeRef.current = new Date();
				sentLongViewEventRef.current = false; // Reset flag
				console.log(
					`[${sectionId}] Entered view at ${enterTimeRef.current.toISOString()}`
				);

				if (longViewTimerRef.current) clearTimeout(longViewTimerRef.current);

				// Start 5-second timer
				longViewTimerRef.current = setTimeout(() => {
					console.log(
						`[${sectionId}] Viewed for ${longViewTime / 1000} seconds.`
					);
					sendDurationData(new Date()); // Send data after 5 seconds
					sentLongViewEventRef.current = true; // Mark as sent
					longViewTimerRef.current = null;
				}, longViewTime);
			} else if (!entry.isIntersecting && isVisibleRef.current) {
				// --- Section Exited Viewport ---
				console.log(`[${sectionId}] Exited viewport intersection.`);
				handleExitLogic(); // Use shared exit logic
			}
		};

		const handleVisibilityChange = () => {
			console.log(
				`[${sectionId}] Visibility changed to: ${document.visibilityState}`
			);
			if (document.visibilityState === 'hidden') {
				// If the section was visible when tab hidden, treat as exit
				if (isVisibleRef.current) {
					console.log(
						`[${sectionId}] Tab hidden while section visible. Handling exit.`
					);
					handleExitLogic();
				}
			}
			// No explicit action needed on 'visible' - observer will handle re-entry
		};

		const handleIntersect = throttle(
			handleIntersectCallback as (...args: unknown[]) => unknown,
			200
		);
		const observer = new IntersectionObserver(
			handleIntersect as IntersectionObserverCallback,
			{
				threshold,
				rootMargin: '0px',
			}
		);

		const node = sectionRef.current;
		if (node) {
			observer.observe(node);
		}

		// Add visibility listener
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Cleanup function
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			if (longViewTimerRef.current) {
				clearTimeout(longViewTimerRef.current);
			}
			if (node) {
				observer.unobserve(node);
			}
			// Handle case where component unmounts while section is visible and tab is active
			if (
				isVisibleRef.current &&
				enterTimeRef.current &&
				!sentLongViewEventRef.current
			) {
				const exitTime = new Date();
				const timeSpent = exitTime.getTime() - enterTimeRef.current.getTime();
				if (timeSpent >= minViewTime) {
					console.log(
						`[${sectionId}] Sending exit data on unmount (duration: ${
							timeSpent / 1000
						}s >= ${minViewTime / 1000}s)`
					);
					sendDurationData(exitTime);
				}
			}
		};
		// Add handleExitLogic to dependencies
	}, [
		sectionId,
		threshold,
		minViewTime,
		longViewTime,
		sendDurationData,
		handleExitLogic,
	]);

	return sectionRef;
};
