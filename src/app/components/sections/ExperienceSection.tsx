'use client';
import { useState } from 'react';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';
import { motion } from 'framer-motion';
import {
	Briefcase,
	MapPin,
	Calendar,
	ChevronDown,
	Sparkles,
	Code2,
	Rocket,
	Laptop,
	DollarSign,
	ShoppingCart,
} from 'lucide-react';

export default function ExperienceSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.EXPERIENCE });
	const [expandedItems, setExpandedItems] = useState<number[]>([0]);
	const [showAll, setShowAll] = useState(false);

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
		icon: React.ReactNode;
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
			icon: <Rocket className='w-4 h-4 text-white dark:text-black' />,
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
			icon: <Laptop className='w-4 h-4 text-white dark:text-black' />,
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
			icon: <DollarSign className='w-4 h-4 text-white dark:text-black' />,
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
			icon: <ShoppingCart className='w-4 h-4 text-white dark:text-black' />,
		},
	];

	const visibleExperiences = showAll ? experiences : experiences.slice(0, 2);

	return (
		<section id='experience' ref={sectionRef} className='py-20'>
			<div className='container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16'
				>
					<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 mb-6'>
						<Briefcase className='w-4 h-4 text-gray-700 dark:text-gray-300' />
						<span className='text-sm font-medium text-gray-800 dark:text-gray-200'>
							Professional Journey
						</span>
					</div>

					<h2 className='text-4xl md:text-5xl font-bold mb-4'>
						<span className='bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent'>
							Work Experience
						</span>
					</h2>

					<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
						{showAll
							? `My complete professional journey spanning ${experiences.length} impactful roles`
							: `Recent highlights from my career (${visibleExperiences.length} of ${experiences.length})`}
					</p>
				</motion.div>

				{/* Timeline */}
				<div className='relative'>
					{/* Timeline Line */}
					<div className='absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700' />

					{visibleExperiences.map((exp, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className='relative mb-8 group'
						>
							{/* Timeline Icon */}
							<motion.div
								whileHover={{ scale: 1.1 }}
								transition={{ duration: 0.3 }}
								className='absolute left-8 md:left-12 w-8 h-8 -translate-x-1/2 translate-y-8 z-20 rounded-xl bg-gray-900 dark:bg-gray-100 shadow-lg flex items-center justify-center text-xl'
							>
								{exp.icon}
							</motion.div>

							{/* Experience Card */}
							<div className='ml-20 md:ml-28'>
								<motion.div
									whileHover={{ y: -4 }}
									transition={{ duration: 0.2 }}
									className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 overflow-hidden'
								>
									{/* Card Header */}
									<button
										onClick={() => toggleExpanded(index)}
										className='w-full p-6 text-left focus:outline-none'
									>
										<div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
											<div className='flex-1'>
												<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
													{exp.name}
												</h3>

												<div className='flex flex-wrap gap-2 mb-3'>
													<span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-900 dark:bg-gray-100 text-white dark:text-black'>
														<Sparkles className='w-3 h-3' />
														{exp.type}
													</span>

													<span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'>
														<MapPin className='w-3 h-3' />
														{exp.location}
													</span>

													<span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'>
														<Calendar className='w-3 h-3' />
														{exp.timeline}
													</span>
												</div>
											</div>

											<div className='flex-shrink-0'>
												<div className='p-2 rounded-full bg-gray-100 dark:bg-gray-800'>
													<motion.div
														animate={{
															rotate: expandedItems.includes(index) ? 180 : 0,
														}}
														transition={{ duration: 0.3 }}
													>
														<ChevronDown className='w-5 h-5 text-gray-700 dark:text-gray-300' />
													</motion.div>
												</div>
											</div>
										</div>
									</button>

									{/* Expandable Content */}
									<motion.div
										initial={false}
										animate={{
											height: expandedItems.includes(index) ? 'auto' : 0,
											opacity: expandedItems.includes(index) ? 1 : 0,
										}}
										transition={{ duration: 0.3 }}
										className='overflow-hidden'
									>
										<div className='px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700'>
											<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
												{exp.description}
											</p>

											<div className='space-y-3'>
												{exp.subDescriptions.map((subDesc, subIndex) => (
													<motion.div
														key={subIndex}
														initial={{ opacity: 0, x: -20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: subIndex * 0.1 }}
														className='flex gap-3'
													>
														<div className='flex-shrink-0 w-6 h-6 rounded-lg bg-gray-900 dark:bg-gray-100 flex items-center justify-center mt-0.5'>
															<Code2 className='w-3.5 h-3.5 text-white dark:text-black' />
														</div>
														<p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1'>
															<span className='font-semibold text-gray-800 dark:text-gray-200'>
																{subDesc.split(':')[0]}:
															</span>
															<span className='ml-1'>
																{subDesc.split(':').slice(1).join(':')}
															</span>
														</p>
													</motion.div>
												))}
											</div>
										</div>
									</motion.div>
								</motion.div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Show More/Less Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mt-12'
				>
					{!showAll && experiences.length > 2 ? (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowAll(true)}
							className='group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-black font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-black dark:hover:bg-white transition-all duration-300'
						>
							<span>Show All Experience ({experiences.length})</span>
							<Rocket className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
						</motion.button>
					) : showAll ? (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowAll(false)}
							className='inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-full hover:border-gray-900 dark:hover:border-gray-300 transition-all duration-300'
						>
							Show Less
						</motion.button>
					) : null}
				</motion.div>
			</div>
		</section>
	);
}
