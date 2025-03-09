'use client';
import { useTheme } from 'next-themes';

export default function Footer() {
	const { theme } = useTheme();
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className='bg-gray-200 dark:bg-[#1A1A1A] py-8 text-center
                      border-t border-gray-300/50 dark:border-gray-800/50
                      transition-colors duration-300'
		>
			<div className='max-w-5xl mx-auto px-4'>
				<p
					className='text-gray-600 dark:text-gray-400 text-sm md:text-base
                              hover:text-gray-700 dark:hover:text-gray-300
                              transition-colors duration-300'
				>
					© {currentYear} | Made with
					<span
						className={`mx-1 ${
							theme === 'light'
								? 'text-red-500 hover:text-red-600'
								: 'text-red-400 hover:text-red-300'
						}
                            transition-colors duration-300`}
					>
						❤️
					</span>
					by Ayush Rajput
				</p>
			</div>
		</footer>
	);
}
