'use client';
import { Button } from '@nextui-org/button';
import { Particles } from '@/app/components/ui/particles';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { GithubIcon } from '@/app/components/Icons/GithubIcon';
import { GITHUB_URL } from '@/app/utils/constants';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';

export default function HeroSection() {
	const { theme } = useTheme();
	const [color, setColor] = useState('#ffffff');
	const sectionRef = useTrackSection({ sectionId: SectionId.HERO });

	useEffect(() => {
		setColor(theme === 'dark' ? '#ffffff' : '#0a0a0a');
	}, [theme]);

	return (
		<section
			ref={sectionRef}
			className='relative min-h-screen flex items-center justify-center'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='space-y-8'
					>
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700'
						>
							<Sparkles className='w-4 h-4 text-gray-700 dark:text-gray-300' />
							<span className='text-sm font-medium text-gray-800 dark:text-gray-200'>
								Available for opportunities
							</span>
						</motion.div>

						{/* Main Heading */}
						<div className='space-y-4'>
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight'
							>
								<span className='bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent'>
									Hi, I&apos;m Ayush
								</span>
							</motion.h1>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className='flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-semibold'
							>
								<Code2 className='w-8 h-8 text-gray-700 dark:text-gray-300' />
								<span className='text-gray-700 dark:text-gray-300'>
									Full Stack
								</span>
								<span className='bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent'>
									Developer
								</span>
							</motion.div>
						</div>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className='text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl'
						>
							Crafting exceptional digital experiences with modern web
							technologies. Specialized in building scalable applications that
							combine technical excellence with user-centered design.
						</motion.p>

						{/* Stats */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className='flex flex-wrap gap-8'
						>
							<div className='space-y-1'>
								<div className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent'>
									1.5+
								</div>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									Years Experience
								</div>
							</div>
							<div className='space-y-1'>
								<div className='text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 bg-clip-text text-transparent'>
									8+
								</div>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									Projects Completed
								</div>
							</div>
							<div className='space-y-1'>
								<div className='text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent'>
									∞
								</div>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									Lines of Code
								</div>
							</div>
						</motion.div>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7 }}
							className='flex flex-wrap gap-4'
						>
							<Button
								className='group relative overflow-hidden bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white text-white dark:text-black font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
								endContent={
									<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
								}
								onClick={() => {
									const contactSection = document.getElementById('contact');
									contactSection?.scrollIntoView({ behavior: 'smooth' });
								}}
							>
								Get in Touch
							</Button>

							<Button
								className='group bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold px-8 py-6 rounded-full hover:border-gray-900 dark:hover:border-gray-300 transition-all duration-300 hover:scale-105'
								variant='ghost'
								endContent={<GithubIcon />}
								onClick={() => {
									window.open(GITHUB_URL);
								}}
							>
								View GitHub
							</Button>
						</motion.div>
					</motion.div>

					{/* Right Column - Quote & Tech Stack */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='relative flex items-center justify-center'
					>
						{/* Decorative Elements - Monochrome */}
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='w-80 h-80 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-full blur-3xl opacity-20 animate-pulse' />
						</div>

						<div className='relative z-10 space-y-6 w-full max-w-md'>
							{/* Inspirational Quote Card */}
							<motion.div
								animate={{
									y: [0, -10, 0],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
								className='relative p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-300 dark:border-gray-700 shadow-2xl'
							>
								{/* Quote Icon */}
								<div className='absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-2xl flex items-center justify-center shadow-lg'>
									<svg
										className='w-6 h-6 text-white dark:text-black'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
									</svg>
								</div>

								{/* Quote Text */}
								<blockquote className='space-y-4'>
									<p className='text-xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed'>
										Code is like humor. When you have to explain it, it&apos;s
										bad.
									</p>
									<footer className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
										— Cory House
									</footer>
								</blockquote>

								{/* Decorative gradient line - Monochrome */}
								<div className='mt-6 h-1 w-20 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full' />
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
				className='absolute bottom-8 left-1/2 -translate-x-1/2'
			>
				<motion.div
					animate={{
						y: [0, 10, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					className='flex flex-col items-center gap-2'
				>
					<span className='text-sm text-gray-500 dark:text-gray-400'>
						Scroll to explore
					</span>
					<div className='w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-start justify-center p-2'>
						<motion.div
							animate={{
								y: [0, 12, 0],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
							className='w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full'
						/>
					</div>
				</motion.div>
			</motion.div>

			<Particles
				className='absolute inset-0'
				quantity={100}
				ease={80}
				color={color}
				refresh
			/>
		</section>
	);
}
