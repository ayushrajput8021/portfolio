'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';
import ExperienceModal from '../ExperienceModal';

export default function AboutSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.ABOUT });
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Current role (latest experience)
	const currentRole = {
		title: 'Full Stack Developer',
		company: 'IntelliSQR',
		timeline: 'June 2024 - Present',
		location: 'New Delhi, India',
		type: 'On-site',
	};

	// All experiences for modal
	const experiences = [
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
		<>
		<section
			id='about'
			ref={sectionRef}
			className='py-16 bg-white dark:bg-[#080808] transition-colors duration-300'
		>
			<div className='container mx-auto px-4 md:px-8 max-w-6xl'>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100'>
					About Me
				</h2>
				<div className='flex flex-col md:flex-row gap-8 md:gap-16 items-start'>
					{/* Left: Image */}
					<div className='relative group w-full md:w-2/5 max-w-[300px] mx-auto md:mx-0'>
						<div
							className='absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent
                                     dark:from-blue-900/20 dark:to-transparent rounded-2xl
                                     -rotate-2 scale-95 group-hover:rotate-0 group-hover:scale-100
                                     transition-all duration-500 ease-out'
						/>
						<Image
							src={
								'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/Mine-ghibili.png'
							}
							alt='Profile picture'
							className='relative rounded-2xl object-cover w-full h-auto shadow-xl
                                     grayscale hover:grayscale-0 transition-all duration-500
                                     group-hover:shadow-2xl group-hover:scale-[1.02]'
							width={450}
							height={400}
							priority
						/>
					</div>

					{/* Right: Content */}
					<div className='flex-1 space-y-6'>
						{/* Bio */}
						<div>
							<h3
								className='text-2xl md:text-3xl font-bold mb-3
                               text-gray-900 dark:text-gray-100'
							>
								Building Digital Experiences,
								<br />
								<span className='text-blue-600 dark:text-blue-400'>
									Not Just Code
								</span>
							</h3>
							<p
								className='text-base md:text-lg text-gray-600 dark:text-gray-400 
                              leading-relaxed'
							>
								As a Full Stack Developer based in India, I specialize in
								creating holistic web solutions that combine technical excellence
								with user-centered design. With over a year of professional
								experience, I approach each project as a unique puzzle to solve.
							</p>
						</div>

						{/* Stats */}
						<div className='flex flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
							<div className='flex items-center gap-3 group/stat'>
								<div
									className='p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg
                                  group-hover/stat:bg-blue-200 dark:group-hover/stat:bg-blue-800
                                  transition-all duration-300'
								>
									<svg
										className='w-6 h-6 text-blue-600 dark:text-blue-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</div>
								<div>
									<p className='text-sm font-semibold text-gray-900 dark:text-gray-200'>
										1.5+ Years
									</p>
									<p className='text-sm text-gray-500 dark:text-gray-400'>
										Experience
									</p>
								</div>
							</div>

							<div className='flex items-center gap-3 group/stat'>
								<div
									className='p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg
                                  group-hover/stat:bg-purple-200 
                                  dark:group-hover/stat:bg-purple-800
                                  transition-all duration-300'
								>
									<svg
										className='w-6 h-6 text-purple-600 dark:text-purple-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
										/>
									</svg>
								</div>
								<div>
									<p className='text-sm font-semibold text-gray-900 dark:text-gray-200'>
										8+ Projects
									</p>
									<p className='text-sm text-gray-500 dark:text-gray-400'>
										Completed
									</p>
								</div>
							</div>
						</div>

						{/* Current Role Card */}
						<div
							className='bg-gradient-to-br from-blue-50 to-purple-50 
                              dark:from-blue-950/30 dark:to-purple-950/30
                              rounded-xl p-5 border border-blue-200/50 
                              dark:border-blue-800/50'
						>
							<div className='flex items-start gap-3 mb-3'>
								<div className='p-2 bg-blue-600 dark:bg-blue-500 rounded-lg'>
									<Briefcase className='w-5 h-5 text-white' />
								</div>
								<div className='flex-1'>
									<h4 className='text-lg font-bold text-gray-900 dark:text-gray-100'>
										{currentRole.title}
									</h4>
									<p className='text-blue-600 dark:text-blue-400 font-medium'>
										{currentRole.company}
									</p>
								</div>
								<span
									className='px-3 py-1 bg-green-100 dark:bg-green-900/50 
                                   text-green-600 dark:text-green-300 
                                   text-xs font-medium rounded-full'
								>
									Current
								</span>
							</div>
							<div className='flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400'>
								<div className='flex items-center gap-1'>
									<Calendar className='w-4 h-4' />
									<span>{currentRole.timeline}</span>
								</div>
								<div className='flex items-center gap-1'>
									<MapPin className='w-4 h-4' />
									<span>{currentRole.location}</span>
								</div>
							</div>
						</div>

						{/* View Full Experience Button */}
						<button
							onClick={() => setIsModalOpen(true)}
							className='w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700
                           dark:bg-blue-500 dark:hover:bg-blue-600
                           text-white font-semibold rounded-lg
                           transition-all duration-300 transform hover:scale-105
                           flex items-center justify-center gap-2 group'
						>
							<span>View Full Experience</span>
							<svg
								className='w-5 h-5 transform group-hover:translate-x-1 
                               transition-transform duration-300'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M13 7l5 5m0 0l-5 5m5-5H6'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>

		{/* Experience Modal */}
		<ExperienceModal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			experiences={experiences}
		/>
	</>
	);
}
