'use client';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';
import { analyticsService } from '@/app/services/analytics';
import { useState } from 'react';

// Project types
export type ProjectType = 'Backend Projects' | 'Frontend Projects';

interface Project {
	title: string;
	description: string;
	url: string;
	githubUrl?: string;
	image: string[];
	tech: string[];
	isVertical: boolean;
	priority: number;
	type: ProjectType;
	status?: 'live' | 'building' | 'completed';
	isFeatured: boolean;
	wantToShow: boolean;
}

// Project data with added tech stacks and types
const projects: Project[] = [
	{
		title: 'Travel List',
		description:
			'A simple travel list app to keep track of your travel destinations. Uses local storage to store data.',
		url: 'https://travel.ayushrajput.live/',
		githubUrl: 'https://github.com/ayushrajput8021/travellist',
		image: [
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/1-P7V7TYwX3DR68IrsGa31LAX6EC0lsW.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/2-sA5zgIQRmAnyqn3qNPo3AFmZEKNg3B.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/3-o5tilNXs9iFHc28eUideemw5Koxm54.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/4-sHMvHXNKqApW1Eo5SQHjtNioeVROXL.png',
		],
		tech: ['React', 'JavaScript', 'LocalStorage', 'TailwindCSS'],
		isVertical: false,
		priority: 3,
		type: 'Frontend Projects',
		status: 'live',
		isFeatured: true,
		wantToShow: true,
	},
	{
		title: 'Natours',
		description:
			'A backend-focused project for booking tours, featuring Stripe payment gateway for secure transactions.',
		url: 'https://natours.ayushrajput.live/',
		githubUrl: 'https://github.com/ayushrajput8021/natoursv1',
		image: [
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/1-2TwvpkxqTCjgUhidr41NIwVLVkeQBb.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/2-gZOGfiyo4HPWpXRuCdappl6RpJnx99.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/3-NIzfru3t6NCALpKaBebHOsgLnukenS.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/4-ClBEQ4Hqwgg27dbnLFODmLW4ybMi3m.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/5-MtGt9yNZMDQItrenUO2n2gZKp3CNSa.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/6-sd5jlWQUN138IWoGLA7RWFICdHzrD8.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/7-3My6MSLb1QZtawFSLO0lkU4Qp4YhhQ.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/8-C6b1UIVXNQ2LemUZT99uT1ZRIR9y9E.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/9-ra0lgBEjQXlYuCKcUzSxbiVrjaVEKR.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/10-Cpo0pdk9LcudjfqtjX1bsNd1A1H48W.png',
		],
		tech: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'Pug', 'CSS'],
		isVertical: false,
		priority: 2,
		type: 'Backend Projects',
		status: 'live',
		isFeatured: true,
		wantToShow: true,
	},
	{
		title: 'Educated Joker Bot',
		description:
			'A Telegram bot that delivers jokes and algorithm explanations with AI-powered content generation.',
		url: 'https://t.me/EducatedJokerBot',
		githubUrl: 'https://github.com/ayushrajput8021/EducatedJokerBot',
		image: [
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/telegram-bot/Screenshot%202025-03-11%20at%2011.14.03%E2%80%AFAM-st7dP2MHWisSeGI4Popmde8Ct2aBAj.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/telegram-bot/Screenshot%202025-03-11%20at%2011.14.10%E2%80%AFAM-ZAoO3gygIPCKjyihQS0LZX0WIiaQRY.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/telegram-bot/Screenshot%202025-03-11%20at%2011.14.18%E2%80%AFAM-5ml1bkEnfB8s8mRYL0HpaWQ8JqyQxZ.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/telegram-bot/Screenshot%202025-03-11%20at%2011.14.26%E2%80%AFAM-6F1DHGleuaJU0tomXkmeSDrw3AOy19.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/telegram-bot/Screenshot%202025-03-11%20at%2011.14.45%E2%80%AFAM-kEW0pVxvQCfKA43ULFtduzfdOQ9WwR.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/telegram-bot/Screenshot%202025-03-11%20at%2011.15.00%E2%80%AFAM-J10ZBfIUYWQXXp4It5L5VQKuIR49pU.png',
		],
		tech: [
			'Node.js',
			'Telegram Bot API',
			'Gemini API',
			'JavaScript',
			'PM2',
			'Telegraf.js',
			'Gemini 2.0 Flash Lite',
		],
		isVertical: true,
		priority: 1,
		type: 'Backend Projects',
		status: 'live',
		isFeatured: true,
		wantToShow: true,
	},
];

export default function ProjectSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.PROJECTS });
	const [selectedType, setSelectedType] = useState<ProjectType | 'All'>('All');

	// Get unique project types that have actual projects
	const projectTypes: ProjectType[] = Array.from(
		new Set(projects.map((project) => project.type))
	);

	// Filter projects based on selected type
	const filteredProjects =
		selectedType === 'All'
			? projects
			: projects.filter((project) => project.type === selectedType);

	// Click handler function
	const handleLinkClick = (
		projectId: string,
		linkType: 'visit' | 'github' | 'star' | 'fork'
	) => {
		analyticsService.trackProjectLinkClick(projectId, linkType);
	};

	return (
		<section
			id='projects'
			ref={sectionRef}
			className='py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-300'
		>
			<div className='container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl'>
				<h2
					className='mb-12 text-3xl md:text-4xl font-bold text-center font-space-mono
                              text-gray-900 dark:text-gray-100
                              hover:text-gray-800 dark:hover:text-gray-50
                              transition-colors duration-300'
				>
					My Projects
				</h2>

				{/* Project Type Filter */}
				<div className='mb-8 flex flex-wrap justify-center gap-3'>
					<button
						onClick={() => setSelectedType('All')}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
							selectedType === 'All'
								? 'bg-blue-600 text-white shadow-lg'
								: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
						}`}
					>
						All Projects ({projects.length})
					</button>
					{projectTypes.map((type) => {
						const count = projects.filter(
							(project) => project.type === type
						).length;
						return (
							<button
								key={type}
								onClick={() => setSelectedType(type)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									selectedType === type
										? 'bg-blue-600 text-white shadow-lg'
										: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
								}`}
							>
								{type} ({count})
							</button>
						);
					})}
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{filteredProjects
						.sort((a, b) => a.priority - b.priority)
						.map((project, index) => (
							<div
								key={index}
								className='group bg-white dark:bg-[#101010] rounded-xl
                                      border border-gray-200/50 dark:border-gray-800/50
                                      shadow-md hover:shadow-xl
                                      transition-all duration-500 overflow-hidden'
							>
								<div
									className={`relative ${
										project.isVertical
											? 'h-[400px] bg-gray-100 dark:bg-gray-900'
											: 'h-[300px]'
									} mb-6`}
								>
									{project.status === 'building' && (
										<div className='absolute inset-0 bg-gray-800/50 dark:bg-gray-900/70 flex items-center justify-center z-10'>
											<div className='text-center'>
												<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
												<p className='text-white font-medium'>Building...</p>
											</div>
										</div>
									)}

									{project.image.length > 1 && project.status !== 'building' ? (
										<Carousel
											showThumbs={false}
											autoPlay
											infiniteLoop
											showArrows={true}
											showStatus={false}
											showIndicators={true}
											className='h-full'
										>
											{project.image.map((img, imgIndex) => (
												<div
													key={imgIndex}
													className={`${
														project.isVertical
															? 'h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-900'
															: 'h-[300px]'
													}`}
												>
													<Image
														src={img}
														width={800}
														height={900}
														quality={100}
														alt={`${project.title} image ${imgIndex + 1}`}
														className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
															project.isVertical
																? 'object-contain border border-gray-200 dark:border-gray-700 rounded-md'
																: 'object-cover'
														}`}
													/>
												</div>
											))}
										</Carousel>
									) : (
										<Image
											src={project.image[0]}
											alt={project.title}
											fill
											quality={100}
											className={`transition-transform duration-500 group-hover:scale-105 ${
												project.isVertical
													? 'object-contain border border-gray-200 dark:border-gray-700 rounded-md'
													: 'object-cover object-top'
											}`}
										/>
									)}

									{project.status === 'live' && (
										<a
											href={project.url}
											target='_blank'
											rel='noopener noreferrer'
											className='absolute top-4 right-4 p-2 bg-gray-800/70
														  dark:bg-gray-900/70 rounded-full
														  hover:bg-gray-700 dark:hover:bg-gray-800
														  transition-all duration-300 opacity-0
														  group-hover:opacity-100'
										>
											<svg
												className='w-5 h-5 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
												/>
											</svg>
										</a>
									)}
								</div>
								<div className='p-6'>
									<h3
										className='mb-3 text-xl font-bold text-gray-900 dark:text-gray-100
                                              group-hover:text-blue-600 dark:group-hover:text-blue-400
                                              transition-colors duration-300'
									>
										{project.title}
									</h3>
									<p
										className='mb-4 text-gray-600 dark:text-gray-400 text-sm
                                              leading-relaxed'
									>
										{project.description}
									</p>
									{/* Tech Badges */}
									<div className='mb-4 flex flex-wrap gap-2'>
										{project.tech.map((tech, techIndex) => (
											<span
												key={techIndex}
												className='px-2 py-1 bg-gray-200 dark:bg-gray-800
                                                      text-gray-700 dark:text-gray-300
                                                      text-xs font-medium rounded-full
                                                      hover:bg-gray-300 dark:hover:bg-gray-700
                                                      transition-colors duration-300'
											>
												{tech}
											</span>
										))}
									</div>
									<div className='flex flex-wrap gap-4'>
										{project.status === 'live' ? (
											<a
												href={project.url}
												target='_blank'
												rel='noopener noreferrer'
												onClick={() => handleLinkClick(project.title, 'visit')}
												className='inline-flex items-center px-4 py-2
														  bg-blue-600 text-white text-sm font-semibold
														  rounded-lg hover:bg-blue-700
														  dark:bg-blue-500 dark:hover:bg-blue-600
														  transition-colors duration-300'
											>
												Visit Website
												<svg
													className='w-4 h-4 ml-2'
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
											</a>
										) : (
											<span
												className='inline-flex items-center px-4 py-2
														bg-gray-400 text-white text-sm font-semibold
														rounded-lg cursor-not-allowed opacity-60'
											>
												{project.status === 'building'
													? 'In Development'
													: 'Coming Soon'}
											</span>
										)}
										{project.githubUrl && project.githubUrl !== '#' && (
											<a
												href={project.githubUrl}
												target='_blank'
												rel='noopener noreferrer'
												onClick={() => handleLinkClick(project.title, 'github')}
												className='inline-flex items-center px-4 py-2
                                                      bg-gray-700 text-white text-sm font-semibold
                                                      rounded-lg hover:bg-gray-800
                                                      dark:bg-gray-800 dark:hover:bg-gray-900
                                                      transition-colors duration-300'
											>
												GitHub
												<svg
													role='img'
													viewBox='0 0 24 24'
													xmlns='http://www.w3.org/2000/svg'
													className='w-4 h-4 ml-2 fill-white dark:fill-gray-300'
												>
													<path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
												</svg>
											</a>
										)}
									</div>
									{project.githubUrl &&
										project.githubUrl !== '#' &&
										project.status === 'live' && (
											<div className='mt-4 flex gap-4'>
												<a
													href={`${project.githubUrl}/stargazers`}
													target='_blank'
													rel='noopener noreferrer'
													onClick={() => handleLinkClick(project.title, 'star')}
													className='flex items-center text-sm text-gray-600 dark:text-gray-400
                                                      hover:text-blue-600 dark:hover:text-blue-400
                                                      transition-colors duration-300'
												>
													<svg
														className='w-4 h-4 mr-1'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
														/>
													</svg>
													Star
												</a>
												<a
													href={`${project.githubUrl}/fork`}
													target='_blank'
													rel='noopener noreferrer'
													onClick={() => handleLinkClick(project.title, 'fork')}
													className='flex items-center text-sm text-gray-600 dark:text-gray-400
                                                      hover:text-blue-600 dark:hover:text-blue-400
                                                      transition-colors duration-300'
												>
													<svg
														className='w-4 h-4 mr-1'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7h18M6 10h12v4H6v-4z'
														/>
													</svg>
													Fork
												</a>
											</div>
										)}
								</div>
							</div>
						))}
				</div>
			</div>
		</section>
	);
}
