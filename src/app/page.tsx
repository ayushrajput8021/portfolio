'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpIcon } from 'lucide-react';

import Slide from './components/Slider';
import HeroSection from './components/sections/HeroSection';
import ExperienceSection from './components/sections/ExperienceSection';
const AboutSection = dynamic(
	() => import('./components/sections/AboutSection')
);
const SkillsSection = dynamic(
	() => import('./components/sections/SkillSectionV2')
);
const ContactSection = dynamic(
	() => import('./components/sections/LinksSection')
);
const ProjectsSection = dynamic(
	() => import('./components/sections/ProjectSection')
);
const FunFactSection = dynamic(
	() => import('./components/sections/FunFactSection')
);
const Footer = dynamic(() => import('./components/sections/Footer'));
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
		<div className='bg-background'>
			<motion.div
				className='fixed top-0 left-0 right-0 h-[1.4px] bg-[#f0f0f0] origin-[0%]'
				style={{ scaleX: scrollYProgress }}
			/>
			<main className='flex flex-col flex-grow relative'>
				<button
					onClick={handleThemeToggle}
					className={`${buttonStyles} top-4 right-4`}
					aria-label='Toggle theme'
				>
					{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
				</button>
				<HeroSection />
				<Slide>
					<AboutSection />
				</Slide>
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
				<Slide>
					<FunFactSection />
				</Slide>
			</main>
			<Slide>
				<Footer />
			</Slide>
			{isScrollButtonVisible && (
				<button
					onClick={handleScrollToTop}
					className={`${buttonStyles} bottom-4 right-4`}
					aria-label='Scroll to top'
				>
					<ArrowUpIcon />
				</button>
			)}
		</div>
	);
}
