/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds
 *
 * @param func The function to throttle
 * @param wait The number of milliseconds to throttle invocations to
 * @returns The new throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let previous = 0;

	return function (this: unknown, ...args: Parameters<T>): void {
		const now = Date.now();
		const remaining = wait - (now - previous);

		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(this, args);
		} else if (!timeout) {
			timeout = setTimeout(() => {
				previous = Date.now();
				timeout = null;
				func.apply(this, args);
			}, remaining);
		}
	};
}
