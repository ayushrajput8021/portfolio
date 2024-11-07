'use client';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { motion, useScroll } from 'framer-motion';

import Slide from './components/Slider';
import HeroSection from './components/sections/HeroSection';

const AboutSection = dynamic(
	() => import('./components/sections/AboutSection')
);
const SkillsSection = dynamic(
	() => import('./components/sections/SkillSection')
);
const LinksSection = dynamic(
	() => import('./components/sections/LinksSection')
);
const ProjectsSection = dynamic(
	() => import('./components/sections/ProjectSection')
);
const FunFactSection = dynamic(
	() => import('./components/sections/FunFactSection')
);
const Footer = dynamic(() => import('./components/sections/Footer'));

export default function Home() {
	const { scrollYProgress } = useScroll();

	return (
		<ThemeProvider attribute='class' defaultTheme='dark'>
			<div className={`bg-background`}>
				<motion.div
					className='fixed top-0 left-0 right-0 h-[1.4px] bg-[#f0f0f0] origin-[0%]'
					style={{ scaleX: scrollYProgress }}
				/>
				<main className='flex flex-col flex-grow'>
					<HeroSection />
					<Slide>
						<AboutSection />
					</Slide>
					<Slide>
						<SkillsSection />
					</Slide>
					<Slide>
						<LinksSection />
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
			</div>
		</ThemeProvider>
	);
}
