'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';

export default function ExperienceSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.EXPERIENCE });
	const { theme } = useTheme();
	const [expandedItems, setExpandedItems] = useState<number[]>([]);

	const toggleExpanded = (index: number) => {
		setExpandedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	interface IExperience {
		name: string;
		timeline: string;
		type: string;
		location: string;
		description: string;
		subDescriptions: string[];
	}
	const experiences: IExperience[] = [
		{
			name: 'Full Stack Developer - IntelliSQR',
			timeline: 'June 2025 - Ongoing',
			type: 'On-site',
			location: 'New Delhi, India',
			description:
				'Developed and deployed a peer-to-peer EV charging mobile app using React Native, successfully published on both the Google Play Store and Apple App Store, enabling users to share and access charging stations seamlessly',
			subDescriptions: [
				'Designed the database schema and developed the backend system using Node.js and PostgreSQL for an enterprise mobile app, enabling streamlined lead management, sales tracking, and secure access to training materials for ground workforce',
				'Led cloud migration from Azure to AWS, setting up and optimizing services including EC2, Lambda, S3, and CloudFront (CDN) to enhance scalability, reliability, and cost efficiency',
			],
		},
		{
			name: 'Full Stack Developer - Freelance',
			timeline: 'Jan 2025 - Aug 2025',
			type: 'Freelance',
			location: 'Remote',
			description:
				'Enhanced a full-stack application by optimizing database and code performance for scalability while initiating landing page development.',
			subDescriptions: [
				'Database Migration: Migrated PostgreSQL to use the Drizzle ORM, improving database efficiency and maintainability.',
				'Front-End Optimization: Improved React code to efficiently handle large datasets, enhancing performance and user experience.',
				'Back-End Refactoring: Refactored Node.js code to manage increased data volume, ensuring scalability and reliability.',
				"Landing Page Development: Currently designing and building the product's landing page to support marketing and user engagement.",
			],
		},
		{
			name: 'Full Stack Developer - Upwork Freelance',
			timeline: 'Oct 2024 - Jan 2025',
			type: 'Freelance',
			location: 'Remote',
			description:
				'Developed and deployed a full-stack financial dashboard and user management system with comprehensive documentation.',
			subDescriptions: [
				'Front-End Development: Converted Figma designs into functional React code, creating an interactive financial dashboard and user management interface.',
				'Back-End Development: Built a Node.js backend integrated with PostgreSQL to support data management and application functionality.',
				"Deployment: Successfully deployed the entire application on the client's virtual machine, ensuring operational readiness.",
				'Documentation: Created detailed documentation, including configuration, manual, dependencies, and database guides, to support client use and maintenance.',
			],
		},
		{
			name: 'Associate Full Stack Developer - IntelliSQR',
			timeline: 'June 2024 - June 2025',
			type: 'On-site',
			location: 'Delhi, India',
			description:
				'Developed and deployed a full-stack eCommerce platform with integrated payment processing, automated communication systems, and robust cloud infrastructure.',
			subDescriptions: [
				'Deployed applications on Azure VM using Docker, established CI/CD pipelines, and configured Nginx as a reverse proxy for different services, ensuring efficient and reliable deployment.',
				'Integrated WhatsApp API into the application to facilitate automated user responses and enhance communication efficiency.',
				'Implemented Razorpay for seamless monthly subscription management and payment processing, optimizing the user experience.',
				'Developed a robust Node.js backend with PostgreSQL for an eCommerce platform, ensuring high performance and reliable data handling.',
			],
		},
	];

	return (
		<section
			id='experience'
			ref={sectionRef}
			className='py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-300'
		>
			<div className='container px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl'>
				<h2
					className='mb-12 text-3xl md:text-4xl font-bold text-center font-space-mono
                              text-gray-900 dark:text-gray-100
                              hover:text-gray-800 dark:hover:text-gray-50
                              transition-colors duration-300'
				>
					My Experience
				</h2>
				<div className='relative'>
					{/* Vertical Timeline Line */}
					<div
						className='absolute left-6 top-0 w-1 h-full
                                  bg-gray-300 dark:bg-gray-700
                                  transform -translate-x-1/2'
					></div>

					{experiences.map((exp, index) => (
						<div key={index} className='relative mb-4 group'>
							{/* Timeline Dot */}
							<div
								className={`absolute left-6 w-4 h-4 rounded-full
                                          ${
																						theme === 'light'
																							? 'bg-blue-600 group-hover:bg-blue-700'
																							: 'bg-blue-400 group-hover:bg-blue-500'
																					}
                                          transform -translate-x-1/2 translate-y-6
                                          transition-colors duration-300 z-10`}
							></div>

							{/* Experience Card - Long Horizontal Layout */}
							<button
								onClick={() => toggleExpanded(index)}
								className='ml-12 bg-white dark:bg-[#101010] rounded-xl
                                          border border-gray-200/50 dark:border-gray-800/50
                                          shadow-md hover:shadow-xl
                                          transition-all duration-500 w-full p-6 text-left
                                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                          cursor-pointer'
							>
								{/* Header Section with Designation and Duration */}
								<div className='flex justify-between items-start mb-4'>
									{/* Left Side - Designation and Chips */}
									<div className='flex-1'>
										<h3
											className='text-xl font-bold text-gray-900 dark:text-gray-100
                                                      group-hover:text-blue-600 dark:group-hover:text-blue-400
                                                      transition-colors duration-300 mb-3'
										>
											{exp.name}
										</h3>

										{/* Chips Row */}
										<div className='flex flex-wrap gap-2'>
											<span
												className={`px-3 py-1 rounded-full text-xs font-medium
                                                          ${
																														exp.type ===
																														'Freelance'
																															? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300 border dark:border-green-800'
																															: exp.type ===
																																  'Personal Project'
																																? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300 border dark:border-purple-800'
																																: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border dark:border-gray-700'
																													}`}
											>
												{exp.type}
											</span>
											<span
												className='px-3 py-1 bg-blue-100 dark:bg-blue-900/50
                                                          text-blue-600 dark:text-blue-300
                                                          text-xs font-medium rounded-full
                                                          border dark:border-blue-800'
											>
												{exp.location}
											</span>
										</div>
									</div>

									{/* Right Side - Duration and Arrow */}
									<div className='flex flex-col items-end ml-4'>
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium mb-2
                                                      ${
																												theme === 'light'
																													? 'bg-gray-100 text-gray-700'
																													: 'bg-gray-800 text-gray-300 border border-gray-700'
																											}`}
										>
											{exp.timeline}
										</span>

										{/* Collapsible Arrow */}
										<svg
											className={`w-5 h-5 transition-transform duration-300 ${
												expandedItems.includes(index)
													? 'rotate-180'
													: 'rotate-0'
											} ${
												theme === 'light' ? 'text-blue-600' : 'text-blue-400'
											}`}
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</div>
								</div>

								{/* Collapsible Content */}
								<div
									className={`overflow-hidden transition-all duration-500 ease-in-out ${
										expandedItems.includes(index)
											? 'max-h-96 opacity-100'
											: 'max-h-0 opacity-0'
									}`}
								>
									<div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
										{/* Description */}
										<p
											className={`text-gray-600 dark:text-gray-400 text-sm md:text-base
                                                      leading-relaxed mb-4 transform transition-all duration-300
                                                      ${
																												expandedItems.includes(
																													index
																												)
																													? 'translate-y-0 opacity-100'
																													: 'translate-y-2 opacity-0'
																											}`}
										>
											{exp.description}
										</p>

										{/* Sub-Descriptions */}
										<ul
											className='list-disc pl-5 text-gray-600 dark:text-gray-400
                                                      text-sm md:text-base leading-relaxed space-y-2'
										>
											{exp.subDescriptions.map((subDesc, subIndex) => (
												<li
													key={subIndex}
													className={`transform transition-all duration-300 delay-${(subIndex + 1) * 100}
                                                               ${
																																	expandedItems.includes(
																																		index
																																	)
																																		? 'translate-y-0 opacity-100'
																																		: 'translate-y-2 opacity-0'
																																}`}
												>
													<span className='font-medium text-gray-700 dark:text-gray-300'>
														{subDesc.split(':')[0]}:
													</span>
													<span className='ml-1'>
														{subDesc.split(':').slice(1).join(':')}
													</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
