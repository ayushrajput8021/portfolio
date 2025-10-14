'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Importing devops images
import AwsIcon from '@/app/images/Devops/AWS.svg';
import NginxIcon from '@/app/images/Devops/NGINX.svg';
import VercelIcon from '@/app/images/Devops/Vercel.svg';
import DockerIcon from '@/app/images/Devops/Docker.svg';
import AzureIcon from '@/app/images/Devops/azure.svg';

// Importing frontend images
import ReactIcon from '@/app/images/Frontend/React.svg';
import NextIcon from '@/app/images/Frontend/nextjs.svg';
import TailwindIcon from '@/app/images/Frontend/TailwindCSS.svg';
import ReduxIcon from '@/app/images/Frontend/Redux.svg';
import TypescriptIcon from '@/app/images/Frontend/TypeScript.svg';
import JavascriptIcon from '@/app/images/Frontend/JavaScript.svg';

// Importing backend images
import NodeIcon from '@/app/images/Backend/Node.js.svg';
import ExpressIcon from '@/app/images/Backend/express-js.svg';
import FlaskIcon from '@/app/images/Backend/Flask.svg';
import PythonIcon from '@/app/images/Backend/python.svg';
import FastApiIcon from '@/app/images/Backend/FastAPI.svg';

// Importing database images
import MongodbIcon from '@/app/images/Database/MongoDB.svg';
import PostgresqlIcon from '@/app/images/Database/PostgresSQL.svg';
import MysqlIcon from '@/app/images/Database/MySQL.svg';
import RedisIcon from '@/app/images/Database/Redis.svg';

// Icons that need dark mode treatment (have dark colors)
const darkModeIcons = new Set([NextIcon, ExpressIcon, VercelIcon, FlaskIcon]);

// Helper function to check if icon needs dark mode treatment
const isDarkIcon = (iconSrc: string | null): boolean => {
	if (!iconSrc) return false;
	return darkModeIcons.has(iconSrc);
};

const skillsConfig: Array<{
	title: string;
	items: Array<{
		icon: string | null;
		name: string;
		color: string;
		isText?: boolean;
	}>;
	accentColor: string;
	hoverColor: string;
}> = [
	{
		title: 'Frontend',
		items: [
			{ icon: ReactIcon, name: 'React', color: 'bg-blue-500' },
			{ icon: NextIcon, name: 'Next.js', color: 'bg-gray-800' },
			{ icon: TailwindIcon, name: 'Tailwind CSS', color: 'bg-cyan-500' },
			{ icon: ReduxIcon, name: 'Redux', color: 'bg-purple-600' },
			{ icon: TypescriptIcon, name: 'TypeScript', color: 'bg-blue-600' },
			{ icon: JavascriptIcon, name: 'JavaScript', color: 'bg-yellow-500' },
		],
		accentColor: 'border-blue-300 dark:border-blue-700',
		hoverColor: 'hover:border-blue-400 dark:hover:border-blue-600',
	},
	{
		title: 'Backend',
		items: [
			{ icon: NodeIcon, name: 'Node.js', color: 'bg-green-600' },
			{ icon: ExpressIcon, name: 'Express', color: 'bg-gray-700' },
			{ icon: FlaskIcon, name: 'Flask', color: 'bg-gray-600' },
			{ icon: PythonIcon, name: 'Python', color: 'bg-blue-500' },
			{ icon: FastApiIcon, name: 'FastAPI', color: 'bg-teal-500' },
		],
		accentColor: 'border-green-300 dark:border-green-700',
		hoverColor: 'hover:border-green-400 dark:hover:border-green-600',
	},
	{
		title: 'Database',
		items: [
			{ icon: MongodbIcon, name: 'MongoDB', color: 'bg-green-500' },
			{ icon: PostgresqlIcon, name: 'PostgreSQL', color: 'bg-blue-700' },
			{ icon: MysqlIcon, name: 'MySQL', color: 'bg-orange-600' },
			{ icon: RedisIcon, name: 'Redis', color: 'bg-red-600' },
		],
		accentColor: 'border-purple-300 dark:border-purple-700',
		hoverColor: 'hover:border-purple-400 dark:hover:border-purple-600',
	},
	{
		title: 'Cloud & DevOps',
		items: [
			{ icon: AwsIcon, name: 'AWS', color: 'bg-orange-500' },
			{ icon: AzureIcon, name: 'Azure', color: 'bg-blue-600' },
			{ icon: DockerIcon, name: 'Docker', color: 'bg-blue-500' },
			{ icon: NginxIcon, name: 'NGINX', color: 'bg-green-600' },
			{ icon: VercelIcon, name: 'Vercel', color: 'bg-black' },
		],
		accentColor: 'border-orange-300 dark:border-orange-700',
		hoverColor: 'hover:border-orange-400 dark:hover:border-orange-600',
	},
];

interface SkillCategoryProps {
	title: string;
	items: {
		icon: string | null;
		name: string;
		color: string;
		isText?: boolean;
	}[];
}

function SkillCategory({ title, items }: SkillCategoryProps) {
	const { theme } = useTheme();

	return (
		<div
			className='group relative p-6 bg-white dark:bg-[#101010] rounded-xl
                      border border-gray-200/50 dark:border-gray-800/50 shadow-md
                      hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700
                      transition-all duration-300'
		>
			{/* Category Header */}
			<div className='flex items-center gap-3 mb-6'>
				{CategoryIcons[title as keyof typeof CategoryIcons]}
				<h3
					className='text-lg font-semibold text-gray-800 dark:text-gray-100
                              group-hover:text-gray-900 dark:group-hover:text-white
                              transition-colors duration-300'
				>
					{title}
				</h3>
			</div>

			{/* Skills Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
				{items.map((item, index) => (
					<div
						key={index}
						className='flex flex-col items-center gap-3 group/skill p-3 rounded-lg
                               hover:bg-gray-50 dark:hover:bg-gray-800/50
                               transition-all duration-300 cursor-pointer
                               hover:transform hover:-translate-y-1'
					>
						<div
							className={`w-12 h-12 rounded-lg flex items-center justify-center
                                      shadow-sm border border-gray-200 dark:border-gray-700
                                      transition-all duration-300
                                      group-hover/skill:scale-110
                                      group-hover/skill:shadow-lg group-hover/skill:shadow-blue-500/25
                                      group-hover/skill:border-blue-300 dark:group-hover/skill:border-blue-500
                                      ${
																				theme === 'dark'
																					? 'bg-gray-800 group-hover/skill:bg-gray-700'
																					: 'bg-white group-hover/skill:bg-gray-50'
																			}`}
						>
							{item.isText ? (
								<span
									className={`text-white text-xs font-bold px-2 py-1 rounded ${item.color}
                                              transition-all duration-300
                                              group-hover/skill:scale-110 group-hover/skill:shadow-md`}
								>
									{item.name.slice(0, 2)}
								</span>
							) : item.icon ? (
								<Image
									src={item.icon}
									alt={item.name}
									width={28}
									height={28}
									className={`w-7 h-7 object-contain
                                              transition-all duration-300
                                              group-hover/skill:scale-110 group-hover/skill:drop-shadow-lg
                                              ${
																								theme === 'dark' &&
																								isDarkIcon(item.icon)
																									? 'filter invert brightness-0 contrast-100'
																									: ''
																							}`}
								/>
							) : (
								<span
									className={`text-white text-xs font-bold px-2 py-1 rounded ${item.color}
                                              transition-all duration-300
                                              group-hover/skill:scale-110 group-hover/skill:shadow-md`}
								>
									{item.name.slice(0, 2)}
								</span>
							)}
						</div>
						<span
							className='text-xs font-medium text-gray-600 dark:text-gray-400
                                      group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400
                                      text-center transition-all duration-300
                                      group-hover/skill:font-semibold group-hover/skill:transform
                                      group-hover/skill:scale-105'
						>
							{item.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default function SkillsSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.SKILLS });
	const { theme } = useTheme();
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % skillsConfig.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + skillsConfig.length) % skillsConfig.length);
	};

	return (
		<section
			id='skills'
			ref={sectionRef}
			className='py-16 bg-gray-50 dark:bg-[#050505] transition-colors duration-300'
		>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'>
				<div className='text-center mb-10'>
					<h2
						className='text-3xl md:text-4xl font-bold mb-3 font-space-mono
                                  text-gray-900 dark:text-gray-100
                                  hover:text-gray-800 dark:hover:text-gray-50
                                  transition-colors duration-300'
					>
						Technical Skills
					</h2>
					<p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm'>
						Technologies and tools I use to build robust, scalable applications
					</p>
				</div>

				{/* Mobile Carousel */}
				<div className='md:hidden relative'>
					<div className='overflow-hidden'>
						<AnimatePresence mode='wait' initial={false}>
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.3 }}
								className='w-full'
							>
								{(() => {
									const category = skillsConfig[currentSlide];
									const categoryHoverColor = 
										category.title === 'Frontend' ? 'group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/50' :
										category.title === 'Backend' ? 'group-hover:border-green-400 dark:group-hover:border-green-500 group-hover:shadow-green-200 dark:group-hover:shadow-green-900/50' :
										category.title === 'Database' ? 'group-hover:border-purple-400 dark:group-hover:border-purple-500 group-hover:shadow-purple-200 dark:group-hover:shadow-purple-900/50' :
										'group-hover:border-orange-400 dark:group-hover:border-orange-500 group-hover:shadow-orange-200 dark:group-hover:shadow-orange-900/50';

									return (
										<div
											className={`bg-white dark:bg-[#101010] rounded-xl p-5
                                   border-2 ${category.accentColor} ${category.hoverColor}
                                   shadow-sm hover:shadow-lg transition-all duration-300`}
										>
											{/* Category Header */}
											<div className='flex items-center gap-3 mb-4'>
												{CategoryIcons[category.title as keyof typeof CategoryIcons]}
												<h3 className='text-base font-semibold text-gray-800 dark:text-gray-100'>
													{category.title}
												</h3>
											</div>

											{/* Skills Grid */}
											<div className='grid grid-cols-3 gap-3'>
												{category.items.map((item, itemIndex) => (
													<div
														key={itemIndex}
														className='flex flex-col items-center gap-2 p-2 rounded-lg
                                         hover:bg-gray-50 dark:hover:bg-gray-800/50
                                         transition-all duration-300 cursor-pointer
                                         group'
													>
														<div
															className={`w-10 h-10 rounded-lg flex items-center justify-center
                                          bg-gray-50 dark:bg-gray-800
                                          border border-gray-200 dark:border-gray-700
                                          ${categoryHoverColor}
                                          group-hover:shadow-md
                                          transition-all duration-300`}
														>
															{item.isText ? (
																<span
																	className={`text-white text-xs font-bold px-1.5 py-0.5 rounded ${item.color}`}
																>
																	{item.name.slice(0, 2)}
																</span>
															) : item.icon ? (
																<Image
																	src={item.icon}
																	alt={item.name}
																	width={24}
																	height={24}
																	className={`w-6 h-6 object-contain
                                               ${
																								theme === 'dark' && isDarkIcon(item.icon)
																									? 'filter invert brightness-0 contrast-100'
																									: ''
																							}`}
																/>
															) : (
																<span
																	className={`text-white text-xs font-bold px-1.5 py-0.5 rounded ${item.color}`}
																>
																	{item.name.slice(0, 2)}
																</span>
															)}
														</div>
														<span
															className='text-xs font-medium text-center
                                         text-gray-600 dark:text-gray-400
                                         group-hover:text-gray-900 dark:group-hover:text-gray-100
                                         transition-colors duration-300 leading-tight'
														>
															{item.name}
														</span>
													</div>
												))}
											</div>
										</div>
									);
								})()}
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Navigation Buttons */}
					<div className='flex items-center justify-center gap-4 mt-6'>
						<button
							onClick={prevSlide}
							className='p-2 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-lg'
							aria-label='Previous slide'
						>
							<ChevronLeft className='w-5 h-5 text-gray-700 dark:text-gray-300' />
						</button>

						{/* Dots Indicator */}
						<div className='flex gap-2'>
							{skillsConfig.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentSlide(index)}
									className={`h-2 rounded-full transition-all duration-300 ${
										index === currentSlide
											? 'w-8 bg-purple-600 dark:bg-purple-500'
											: 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>

						<button
							onClick={nextSlide}
							className='p-2 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-lg'
							aria-label='Next slide'
						>
							<ChevronRight className='w-5 h-5 text-gray-700 dark:text-gray-300' />
						</button>
					</div>
				</div>

				{/* Desktop Grid Layout */}
				<div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-6'>
					{skillsConfig.map((category, index) => {
						const categoryHoverColor = 
							category.title === 'Frontend' ? 'group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/50' :
							category.title === 'Backend' ? 'group-hover:border-green-400 dark:group-hover:border-green-500 group-hover:shadow-green-200 dark:group-hover:shadow-green-900/50' :
							category.title === 'Database' ? 'group-hover:border-purple-400 dark:group-hover:border-purple-500 group-hover:shadow-purple-200 dark:group-hover:shadow-purple-900/50' :
							'group-hover:border-orange-400 dark:group-hover:border-orange-500 group-hover:shadow-orange-200 dark:group-hover:shadow-orange-900/50';

						return (
							<div
								key={index}
								className={`bg-white dark:bg-[#101010] rounded-xl p-5
                               border-2 ${category.accentColor} ${category.hoverColor}
                               shadow-sm hover:shadow-lg transition-all duration-300`}
							>
								{/* Category Header */}
								<div className='flex items-center gap-3 mb-4'>
									{CategoryIcons[category.title as keyof typeof CategoryIcons]}
									<h3 className='text-base font-semibold text-gray-800 dark:text-gray-100'>
										{category.title}
									</h3>
								</div>

								{/* Compact Grid */}
								<div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
									{category.items.map((item, itemIndex) => (
										<div
											key={itemIndex}
											className='flex flex-col items-center gap-2 p-2 rounded-lg
                                     hover:bg-gray-50 dark:hover:bg-gray-800/50
                                     transition-all duration-300 cursor-pointer
                                     group'
										>
											<div
												className={`w-10 h-10 rounded-lg flex items-center justify-center
                                      bg-gray-50 dark:bg-gray-800
                                      border border-gray-200 dark:border-gray-700
                                      ${categoryHoverColor}
                                      group-hover:shadow-md
                                      transition-all duration-300`}
											>
												{item.isText ? (
													<span
														className={`text-white text-xs font-bold px-1.5 py-0.5 rounded ${item.color}`}
													>
														{item.name.slice(0, 2)}
													</span>
												) : item.icon ? (
													<Image
														src={item.icon}
														alt={item.name}
														width={24}
														height={24}
														className={`w-6 h-6 object-contain
                                           ${
																						theme === 'dark' && isDarkIcon(item.icon)
																							? 'filter invert brightness-0 contrast-100'
																							: ''
																					}`}
													/>
												) : (
													<span
														className={`text-white text-xs font-bold px-1.5 py-0.5 rounded ${item.color}`}
													>
														{item.name.slice(0, 2)}
													</span>
												)}
											</div>
											<span
												className='text-xs font-medium text-center
                                     text-gray-600 dark:text-gray-400
                                     group-hover:text-gray-900 dark:group-hover:text-gray-100
                                     transition-colors duration-300 leading-tight'
											>
												{item.name}
											</span>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

// Category Header Icons
const CategoryIcons = {
	Frontend: (
		<div
			className='p-2 bg-blue-100/70 dark:bg-blue-900/30 rounded-lg
                      group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-blue-600 dark:text-blue-400
                          group-hover:text-blue-700 dark:group-hover:text-blue-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
				/>
			</svg>
		</div>
	),
	Backend: (
		<div
			className='p-2 bg-green-100/70 dark:bg-green-900/30 rounded-lg
                      group-hover:bg-green-200 dark:group-hover:bg-green-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-green-600 dark:text-green-400
                          group-hover:text-green-700 dark:group-hover:text-green-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
				/>
			</svg>
		</div>
	),
	Database: (
		<div
			className='p-2 bg-purple-100/70 dark:bg-purple-900/30 rounded-lg
                      group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-purple-600 dark:text-purple-400
                          group-hover:text-purple-700 dark:group-hover:text-purple-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
				/>
			</svg>
		</div>
	),
	'Cloud & DevOps': (
		<div
			className='p-2 bg-orange-100/70 dark:bg-orange-900/30 rounded-lg
                      group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-orange-600 dark:text-orange-400
                          group-hover:text-orange-700 dark:group-hover:text-orange-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
				/>
			</svg>
		</div>
	),
};