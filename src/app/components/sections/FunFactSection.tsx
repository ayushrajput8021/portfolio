'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';

export default function FunFactSection() {
	const { theme } = useTheme();
	const sectionRef = useTrackSection({ sectionId: SectionId.FUN_FACTS });

	return (
		<section
			ref={sectionRef}
			id='funfact'
			className='py-16'
		>
			<div className='flex flex-col items-center justify-center p-6 max-w-5xl mx-auto'>
				<h2
					className='mb-10 text-3xl md:text-4xl font-bold text-center font-garamond
                              text-gray-900 dark:text-gray-100
                              hover:text-gray-800 dark:hover:text-gray-50
                              transition-colors duration-300'
				>
					Fun Fact
				</h2>
				<div
					className='group relative bg-white dark:bg-[#101010] rounded-xl p-8
                              border border-gray-200/50 dark:border-gray-800/50 shadow-md
                              hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700
                              transition-all duration-500'
				>
					<p
						className='text-lg md:text-xl text-gray-700 dark:text-gray-300
                                  leading-relaxed text-center
                                  group-hover:text-gray-800 dark:group-hover:text-gray-200
                                  transition-colors duration-300'
					>
						All projects on this website are self-hosted on an AWS EC2 Virtual
						Machine. The website itself is deployed on Vercel, while the
						database runs on the same VM using Docker containers. Nginx serves
						as a reverse proxy server, and security is ensured with an SSL
						certificate from CertBot. The domain is registered with a .name TLD,
						and Vercel domains are mapped using a CNAME record.
					</p>
					{/* Decorative Element */}
					<span
						className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1
                rounded-full text-sm font-medium
                ${
									theme === 'light'
										? 'bg-blue-100 text-blue-600'
										: 'bg-blue-950/50 text-blue-300 border border-blue-900/50'
								}
                group-hover:scale-105 transition-all duration-300`}
					>
						Tech Insight
					</span>
				</div>
			</div>
		</section>
	);
}
