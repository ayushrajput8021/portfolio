'use client';

import AboutSection from './components/sections/AboutSection';
import HeroSection from './components/sections/HeroSection';
import { motion, useScroll } from 'framer-motion';
import Slide from './components/Slider';
import SkillsSection from './components/sections/SkillSection';
import LinksSection from './components/sections/LinksSection';
import ProjectsSection from './components/sections/ProjectSection';
import FunFactSection from './components/sections/FunFactSection';
import Footer from './components/sections/Footer';


export default function Home() {
	const { scrollYProgress } = useScroll();

	return (
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
	);
}
