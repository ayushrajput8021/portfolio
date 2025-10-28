'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Code, FolderOpen, Mail, Star } from 'lucide-react';
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
	const [isFooterVisible, setIsFooterVisible] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		// Observer for footer visibility
		const footerObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setIsFooterVisible(entry.isIntersecting);
				});
			},
			{
				root: null,
				threshold: 0.1,
			}
		);

		// Observe footer
		const footer = document.querySelector('footer');
		if (footer) {
			footerObserver.observe(footer);
		}

		// Cleanup footer observer
		const cleanupFooterObserver = () => {
			if (footer) {
				footerObserver.unobserve(footer);
			}
		};

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
					if (element.id === 'experience') {
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
			cleanupFooterObserver();
		};
	}, []);

	const scrollToSection = (sectionId: SectionId) => {
		let targetElement: Element | null = null;

		switch (sectionId) {
			case SectionId.HERO:
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
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
			{activeSection !== SectionId.HERO && !isFooterVisible && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className='fixed bottom-6 left-1/2 z-40'
					style={{ x: '-50%' }}
				>
					<div className='flex items-center gap-1 px-2 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-full border border-gray-300 dark:border-gray-700 shadow-lg'>
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = activeSection === item.id;
							const isHovered = hoveredItem === item.id;

							return (
								<motion.div
									key={item.id}
									className='relative flex items-center justify-center'
									onMouseEnter={() => setHoveredItem(item.id)}
									onMouseLeave={() => setHoveredItem(null)}
								>
									<motion.button
										onClick={() => scrollToSection(item.id)}
										className={`relative p-2 rounded-full transition-all duration-300 ${
											isActive
												? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-black shadow-md'
												: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
										}`}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<Icon
											size={16}
											className='w-4 h-4 transition-transform duration-300'
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
												className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none'
											>
												{item.label}
												{/* Tooltip arrow */}
												<div className='absolute top-full left-1/2 -translate-x-1/2 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-900 dark:border-t-gray-100' />
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
