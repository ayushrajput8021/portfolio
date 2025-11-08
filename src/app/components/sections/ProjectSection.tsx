'use client';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';
import { analyticsService } from '@/app/services/analytics';
import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

// Project types
export type ProjectType =
	| 'Backend Projects'
	| 'Frontend Projects'
	| 'Full Stack Projects';

export interface Project {
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

// Modal component for image carousel
function ImageModal({
	isOpen,
	onClose,
	project,
}: {
	isOpen: boolean;
	onClose: () => void;
	project: Project | null;
}) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen || !project) return null;

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-2 sm:p-4'
			onClick={onClose}
		>
			<div
				className='relative w-full max-w-7xl max-h-[95vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200'
				>
					<svg
						className='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>

				{/* Project title */}
				<div className='absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded'>
					<h3 className='font-semibold'>{project.title}</h3>
				</div>

				{/* Carousel */}
				<div className='h-full max-h-[95vh]'>
					{project.image.length > 1 ? (
						<Carousel
							showThumbs={false}
							autoPlay={false}
							infiniteLoop
							showArrows={true}
							showStatus={true}
							showIndicators={true}
							className='h-full'
							renderArrowPrev={(onClickHandler, hasPrev) =>
								hasPrev && (
									<button
										type='button'
										onClick={onClickHandler}
										className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200'
									>
										<svg
											className='w-6 h-6'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 19l-7-7 7-7'
											/>
										</svg>
									</button>
								)
							}
							renderArrowNext={(onClickHandler, hasNext) =>
								hasNext && (
									<button
										type='button'
										onClick={onClickHandler}
										className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200'
									>
										<svg
											className='w-6 h-6'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 5l7 7-7 7'
											/>
										</svg>
									</button>
								)
							}
						>
							{project.image.map((img, imgIndex) => (
								<div
									key={imgIndex}
									className='flex items-center justify-center bg-gray-100 dark:bg-gray-800'
									style={{ maxHeight: '95vh' }}
								>
									<Image
										src={img}
										width={1400}
										height={1000}
										quality={100}
										alt={`${project.title} image ${imgIndex + 1}`}
										className={`max-h-[95vh] w-auto ${
											project.isVertical ? 'object-contain' : 'object-contain'
										}`}
									/>
								</div>
							))}
						</Carousel>
					) : (
						<div className='flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800'>
							<Image
								src={project.image[0]}
								width={1400}
								height={1000}
								quality={100}
								alt={project.title}
								className={`max-h-[95vh] w-auto ${
									project.isVertical ? 'object-contain' : 'object-contain'
								}`}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default function ProjectSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.PROJECTS });
	const [selectedType, setSelectedType] = useState<ProjectType | 'All'>('All');
	const [modalProject, setModalProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showAll, setShowAll] = useState(false);
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch projects from API
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch('/api/projects');
				const data = await response.json();
				setProjects(data.projects || []);
			} catch (error) {
				console.error('Error fetching projects:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProjects();
	}, []);

	// Get unique project types that have actual projects
	const projectTypes: ProjectType[] = Array.from(
		new Set(projects.map((project) => project.type))
	);

	// Filter projects based on selected type
	const filteredProjects =
		selectedType === 'All'
			? projects
			: projects.filter((project) => project.type === selectedType);

	// Show only featured projects initially (max 4)
	const featuredProjects = projects.filter((p) => p.isFeatured);
	const displayProjects = showAll
		? filteredProjects
		: featuredProjects.slice(0, 4);

	// Click handler function
	const handleLinkClick = (
		projectId: string,
		linkType: 'visit' | 'github' | 'star' | 'fork'
	) => {
		analyticsService.trackProjectLinkClick(projectId, linkType);
	};

	// Handle image click to open modal
	const handleImageClick = (project: Project) => {
		setModalProject(project);
		setIsModalOpen(true);
	};

	// Handle modal close
	const handleModalClose = () => {
		setIsModalOpen(false);
		setModalProject(null);
	};

	if (isLoading) {
		return (
			<section
				id='projects'
				ref={sectionRef}
				className='py-16'
			>
				<div className='container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl'>
					<div className='flex justify-center items-center h-64'>
						<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100'></div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id='projects'
			ref={sectionRef}
			className='py-16'
		>
			<div className='container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl'>
				<div className='text-center mb-10'>
					<div className='flex items-center justify-center gap-2 mb-3'>
						<h2
							className='text-3xl md:text-4xl font-bold
                              text-gray-900 dark:text-gray-100
                              hover:text-gray-800 dark:hover:text-gray-50
                              transition-colors duration-300'
						>
							{showAll ? 'All Projects' : 'Featured Projects'}
						</h2>
						
						{/* Tech Stack Info Button */}
						<div className='relative group'>
							<button
								className='p-1.5 rounded-full bg-gray-200 dark:bg-gray-800 
								         text-gray-600 dark:text-gray-400
								         hover:bg-gray-900 dark:hover:bg-gray-100
								         hover:text-white dark:hover:text-black
								         transition-all duration-300'
								aria-label='Tech stack information'
							>
								<Info className='w-4 h-4' />
							</button>
							
							{/* Hover Tooltip */}
							<div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 
							              opacity-0 invisible group-hover:opacity-100 group-hover:visible
							              transition-all duration-300 z-50 pointer-events-none'>
								<div className='bg-white dark:bg-gray-900 
								              border border-gray-300 dark:border-gray-700
								              rounded-lg shadow-lg p-3 w-64 text-left'>
									<p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
										Self-hosted on AWS EC2 • Deployed on Vercel • Docker containers • 
										Nginx reverse proxy • SSL via CertBot • .name TLD with CNAME mapping
									</p>
								</div>
							</div>
						</div>
					</div>
					<p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm'>
						{showAll
							? `Showcasing all ${projects.length} projects`
							: `Showcasing ${displayProjects.length} featured projects`}
					</p>
				</div>

				{/* Project Type Filter - Only show when viewing all */}
				{showAll && (
					<div className='mb-8 flex flex-wrap justify-center gap-3'>
					<button
						onClick={() => setSelectedType('All')}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
							selectedType === 'All'
								? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-black shadow-lg'
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
										? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-black shadow-lg'
										: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
								}`}
							>
								{type} ({count})
							</button>
						);
					})}
					</div>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{displayProjects
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
											? 'h-[280px] bg-gray-100 dark:bg-gray-900'
											: 'h-[220px]'
									} mb-4 cursor-pointer`}
									onClick={() => handleImageClick(project)}
								>
									{project.status === 'building' && (
										<div className='absolute inset-0 bg-gray-800/50 dark:bg-gray-900/70 flex items-center justify-center z-10'>
											<div className='text-center'>
												<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
												<p className='text-white font-medium'>Building...</p>
											</div>
										</div>
									)}

									{/* Hover overlay for image click */}
									<div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-5'>
										<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
											<svg
												className='w-12 h-12 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
												/>
											</svg>
										</div>
									</div>

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
															? 'h-[280px] flex items-center justify-center bg-gray-100 dark:bg-gray-900'
															: 'h-[220px]'
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
																: 'object-cover object-center'
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
													: 'object-cover object-center'
											}`}
										/>
									)}

									{project.status === 'live' && (
										<a
											href={project.url}
											target='_blank'
											rel='noopener noreferrer'
											onClick={(e) => {
												e.stopPropagation(); // Prevent modal from opening
												handleLinkClick(project.title, 'visit');
											}}
											className='absolute top-4 right-4 p-2 bg-gray-800/70
														  dark:bg-gray-900/70 rounded-full
														  hover:bg-gray-700 dark:hover:bg-gray-800
														  transition-all duration-300 opacity-0
														  group-hover:opacity-100 z-10'
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
								<div className='p-5'>
									<h3
										className='mb-2 text-lg font-bold text-gray-900 dark:text-gray-100
                                              group-hover:text-gray-700 dark:group-hover:text-gray-300
                                              transition-colors duration-300'
									>
										{project.title}
									</h3>
									<p
										className='mb-3 text-gray-600 dark:text-gray-400 text-sm
                                              leading-relaxed line-clamp-2'
									>
										{project.description}
									</p>
									{/* Tech Badges */}
									<div className='mb-3 flex flex-wrap gap-1.5'>
										{project.tech.map((tech, techIndex) => (
											<span
												key={techIndex}
												className='px-2 py-0.5 bg-gray-200 dark:bg-gray-800
                                                      text-gray-700 dark:text-gray-300
                                                      text-xs font-medium rounded-full
                                                      hover:bg-gray-300 dark:hover:bg-gray-700
                                                      transition-colors duration-300'
											>
												{tech}
											</span>
										))}
									</div>
									<div className='flex flex-wrap gap-3'>
										{project.status === 'live' ? (
											<a
												href={project.url}
												target='_blank'
												rel='noopener noreferrer'
												onClick={() => handleLinkClick(project.title, 'visit')}
												className='inline-flex items-center px-3 py-1.5
														  bg-gray-900 text-white text-xs font-semibold
														  rounded-lg hover:bg-black
														  dark:bg-gray-100 dark:text-black dark:hover:bg-white
														  transition-colors duration-300 cursor-pointer'
											>
												Visit Website
												<svg
													className='w-3.5 h-3.5 ml-1.5'
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
												className='inline-flex items-center px-3 py-1.5
														bg-gray-400 text-white text-xs font-semibold
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
												className='inline-flex items-center px-3 py-1.5
                                                      bg-gray-700 text-white text-xs font-semibold
                                                      rounded-lg hover:bg-gray-800
                                                      dark:bg-gray-800 dark:hover:bg-gray-900
                                                      transition-colors duration-300 cursor-pointer'
											>
												GitHub
												<svg
													role='img'
													viewBox='0 0 24 24'
													xmlns='http://www.w3.org/2000/svg'
													className='w-3.5 h-3.5 ml-1.5 fill-white dark:fill-gray-300'
												>
													<path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
												</svg>
											</a>
										)}
									</div>
								</div>
							</div>
						))}
				</div>

				{/* Show All/Less Button */}
				{!showAll && projects.length > 4 && (
					<div className='text-center mt-10'>
						<button
							onClick={() => setShowAll(true)}
							className='px-8 py-3 bg-gray-900 hover:bg-black
                         dark:bg-gray-100 dark:hover:bg-white
                         text-white dark:text-black font-semibold rounded-lg
                         transition-all duration-300 transform hover:scale-105
                         flex items-center gap-2 mx-auto group'
						>
							<span>View All {projects.length} Projects</span>
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
				)}

				{showAll && (
					<div className='text-center mt-10'>
						<button
							onClick={() => {
								setShowAll(false);
								setSelectedType('All');
							}}
							className='px-8 py-3 bg-white dark:bg-[#101010]
                         border border-gray-200 dark:border-gray-800
                         text-gray-700 dark:text-gray-300
                         font-semibold rounded-lg
                         hover:bg-gray-50 dark:hover:bg-gray-800
                         transition-all duration-300'
						>
							Show Less
						</button>
					</div>
				)}
			</div>

			{/* Image Modal */}
			<ImageModal
				isOpen={isModalOpen}
				onClose={handleModalClose}
				project={modalProject}
			/>
		</section>
	);
}
