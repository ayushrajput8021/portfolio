import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import LinksSection from './components/LinksSection';
import Footer from './components/Footer';
import ProjectsSection from './components/ProjectsSection';
import FunFactSection from './components/FunFactSection';

// Main App Component
const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	// Scroll reveal effect
	useEffect(() => {
		const revealSections = () => {
			const sections = document.querySelectorAll('.section');
			sections.forEach((section) => {
				const sectionTop = section.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;
				if (sectionTop < windowHeight * 0.75) {
					section.classList.add('visible');
				}
			});
		};

		window.addEventListener('scroll', revealSections);
		window.addEventListener('load', revealSections);

		return () => {
			window.removeEventListener('scroll', revealSections);
			window.removeEventListener('load', revealSections);
		};
	}, []);

	// Handle theme change
	useEffect(() => {
		setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		}
	}, []);

	const toggleTheme = () => {
		if (darkMode) {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
		setDarkMode((prevMode) => {
			const newMode = !prevMode;
			localStorage.setItem('darkMode', JSON.stringify(newMode));
			return newMode;
		});
	};

	return (
		<div
			className={`bg-light dark:bg-dark text-dark dark:text-white min-h-screen flex flex-col font-['Inter'] transition-colors duration-300`}
		>
			<div className='absolute z-10 top-8 right-8'>
				<button
					onClick={toggleTheme}
					className='flex items-center justify-center w-10 h-10 p-2 rounded-lg bg-dark dark:bg-light text-light dark:text-dark'
				>
					{darkMode ? (
						<img src='/sun.svg' alt='sun' className='w-5 h-5' />
					) : (
						<img src='/moon.svg' alt='moon' className='w-5 h-5' />
					)}
				</button>
			</div>

			<main className='flex flex-col flex-grow'>
				<Analytics />
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<LinksSection />
				<ProjectsSection />
				<FunFactSection />
			</main>

			<Footer />
		</div>
	);
};

export default App;
