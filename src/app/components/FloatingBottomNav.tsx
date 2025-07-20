'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Home,
	User,
	Briefcase,
	Code,
	FolderOpen,
	Mail,
	Star,
} from 'lucide-react';
import { SectionId } from '@/app/services/appwrite';

interface NavItem {
	id: SectionId;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: React.ComponentType<any>;
	label: string;
	sectionSelector: string;
}

const navItems: NavItem[] = [
	{
		id: SectionId.HERO,
		icon: Home,
		label: 'Home',
		sectionSelector: 'section:first-child', // HeroSection is the first section
	},
	{
		id: SectionId.ABOUT,
		icon: User,
		label: 'About',
		sectionSelector: '#about',
	},
	{
		id: SectionId.EXPERIENCE,
		icon: Briefcase,
		label: 'Experience',
		sectionSelector: 'section:has(h2:contains("Experience"))', // Fallback to text content
	},
	{
		id: SectionId.SKILLS,
		icon: Code,
		label: 'Skills',
		sectionSelector: '#skills',
	},
	{
		id: SectionId.CONTACT,
		icon: Mail,
		label: 'Contact',
		sectionSelector: 'section:has(h2:contains("Get in Touch"))', // LinksSection
	},
	{
		id: SectionId.PROJECTS,
		icon: FolderOpen,
		label: 'Projects',
		sectionSelector: '#projects',
	},
	{
		id: SectionId.FUN_FACTS,
		icon: Star,
		label: 'Fun Facts',
		sectionSelector: '#funfact',
	},
];

export default function FloatingBottomNav() {
	const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
	const [hoveredItem, setHoveredItem] = useState<SectionId | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		// Create intersection observer to track visible sections
		const observerOptions = {
			root: null,
			rootMargin: '-20% 0px -20% 0px', // Trigger when section is more visible
			threshold: 0.1,
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			// Find the most visible section
			let mostVisibleSection: SectionId | null = null;
			let maxIntersectionRatio = 0;

			entries.forEach((entry) => {
				if (
					entry.isIntersecting &&
					entry.intersectionRatio > maxIntersectionRatio
				) {
					const element = entry.target as HTMLElement;
					let sectionId: SectionId | null = null;

					// Try to match by ID first
					if (element.id === 'about') {
						sectionId = SectionId.ABOUT;
					} else if (element.id === 'experience') {
						sectionId = SectionId.EXPERIENCE;
					} else if (element.id === 'skills') {
						sectionId = SectionId.SKILLS;
					} else if (element.id === 'contact') {
						sectionId = SectionId.CONTACT;
					} else if (element.id === 'projects') {
						sectionId = SectionId.PROJECTS;
					} else if (element.id === 'funfact') {
						sectionId = SectionId.FUN_FACTS;
					} else {
						// Check by content for sections without IDs (like Hero)
						const sectionText = element.textContent?.toLowerCase() || '';

						if (
							sectionText.includes('full stack developer') &&
							sectionText.includes('ayush rajput')
						) {
							sectionId = SectionId.HERO;
						}
					}

					if (sectionId) {
						mostVisibleSection = sectionId;
						maxIntersectionRatio = entry.intersectionRatio;
					}
				}
			});

			// Update active section only if we found a visible section
			if (mostVisibleSection) {
				setActiveSection(mostVisibleSection);
			}
		};

		observerRef.current = new IntersectionObserver(
			observerCallback,
			observerOptions
		);

		// Observe all sections
		const sections = document.querySelectorAll('section');
		sections.forEach((section) => {
			if (observerRef.current) {
				observerRef.current.observe(section);
			}
		});

		// Add scroll listener as backup for hero section detection
		const handleScroll = () => {
			if (window.scrollY < 100) {
				setActiveSection(SectionId.HERO);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToSection = (sectionId: SectionId) => {
		let targetElement: Element | null = null;

		switch (sectionId) {
			case SectionId.HERO:
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			case SectionId.ABOUT:
				targetElement = document.querySelector('#about');
				break;
			case SectionId.EXPERIENCE:
				targetElement = document.querySelector('#experience');
				break;
			case SectionId.SKILLS:
				targetElement = document.querySelector('#skills');
				break;
			case SectionId.CONTACT:
				targetElement = document.querySelector('#contact');
				break;
			case SectionId.PROJECTS:
				targetElement = document.querySelector('#projects');
				break;
			case SectionId.FUN_FACTS:
				targetElement = document.querySelector('#funfact');
				break;
		}

		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	return (
		<AnimatePresence>
			{activeSection !== SectionId.HERO && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className='fixed bottom-4 sm:bottom-8 left-1/2 z-50'
					style={{ x: '-50%' }}
				>
					<div className='flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-full border border-gray-200/30 dark:border-gray-700/30 shadow-lg'>
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = activeSection === item.id;
							const isHovered = hoveredItem === item.id;

							return (
								<div key={item.id} className='relative'>
									<motion.button
										onClick={() => scrollToSection(item.id)}
										onMouseEnter={() => setHoveredItem(item.id)}
										onMouseLeave={() => setHoveredItem(null)}
										className={`relative p-2 sm:p-3 rounded-full transition-all duration-300 ${
											isActive
												? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md'
												: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
										}`}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Icon
											size={16}
											className='w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300'
										/>
									</motion.button>

									{/* Section name tooltip */}
									<AnimatePresence>
										{isHovered && (
											<motion.div
												initial={{ opacity: 0, y: 5, scale: 0.9 }}
												animate={{ opacity: 1, y: 0, scale: 1 }}
												exit={{ opacity: 0, y: 5, scale: 0.9 }}
												transition={{ duration: 0.15 }}
												className='absolute bottom-full  mb-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap'
											>
												{item.label}
												{/* Tooltip arrow */}
												<div className='absolute top-full  w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900 dark:border-t-gray-100' />
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							);
						})}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
