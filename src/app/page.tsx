'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpIcon } from 'lucide-react';

import Slide from './components/Slider';
import HeroSection from './components/sections/HeroSection';
import ExperienceSection from './components/sections/ExperienceSection';
const SkillsSection = dynamic(
	() => import('./components/sections/SkillSectionV2')
);
const ContactSection = dynamic(
	() => import('./components/sections/LinksSection')
);
const ProjectsSection = dynamic(
	() => import('./components/sections/ProjectSection')
);
const Footer = dynamic(() => import('./components/sections/Footer'));
const FloatingBottomNav = dynamic(
	() => import('./components/FloatingBottomNav')
);
import SunIcon from '@/app/components/Icons/SunIcon';
import MoonIcon from '@/app/components/Icons/MoonIcon';

// Reusable button class string
const buttonStyles =
	'group fixed p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 text-gray-800 dark:text-white shadow-md hover:shadow-lg z-50';

export default function Home() {
	const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
	const { theme, setTheme } = useTheme();
	const { scrollYProgress } = useScroll();
	const [mounted, setMounted] = useState(false);

	// Theme initialization
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem('theme') || 'light';
		setTheme(savedTheme);
	}, [setTheme]);

	// Scroll event handler with throttle (optional optimization)
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		const handleScroll = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setIsScrollButtonVisible(window.scrollY > 100);
			}, 100); // Throttle to 100ms
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(timeoutId);
		};
	}, []);

	const handleThemeToggle = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (!mounted) {
		return null; // Or a loading spinner/placeholder
	}

	return (
		<div className='w-full'>
			<motion.div
				className='fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 origin-[0%] z-50'
				style={{ scaleX: scrollYProgress }}
			/>
			{/* Unified gradient background container */}
			<div className='relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-950 dark:to-gray-900'>
				{/* Animated Background Elements - Monochrome */}
				<div className='fixed top-20 left-10 w-96 h-96 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob' />
				<div className='fixed top-40 right-10 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000' />
				<div className='fixed bottom-20 left-1/3 w-96 h-96 bg-gray-400 dark:bg-gray-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000' />
				
				<main className='relative z-10 flex flex-col flex-grow'>
					<button
						onClick={handleThemeToggle}
						className={`${buttonStyles} top-4 right-4`}
						aria-label='Toggle theme'
					>
						{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
					</button>
					<HeroSection />
					<Slide>
						<ExperienceSection />
					</Slide>
					<Slide>
						<SkillsSection />
					</Slide>
					<Slide>
						<ContactSection />
					</Slide>
					<Slide>
						<ProjectsSection />
					</Slide>
				</main>
				<Slide>
					<Footer />
				</Slide>
			</div>
			{isScrollButtonVisible && (
				<button
					onClick={handleScrollToTop}
					className={`${buttonStyles} bottom-4 right-4`}
					aria-label='Scroll to top'
				>
					<ArrowUpIcon />
				</button>
			)}
			<FloatingBottomNav />
		</div>
	);
}
