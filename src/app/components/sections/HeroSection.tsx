import { Button } from '@nextui-org/button';
import Particles from '@/app/components/ui/particles';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { GithubIcon } from '@/app/components/Icons/GithubIcon';
import GradualSpacing from '@/app/components/ui/gradual-spacing';
import { GmailIcon } from '@/app/components/Icons/GmailIcon';
import { GITHUB_URL, GMAIL_URL } from '@/app/utils/constants';

export default function HeroSection() {
	const { theme } = useTheme();
	const [color, setColor] = useState('#ffffff');

	useEffect(() => {
		setColor(theme === 'dark' ? '#ffffff' : '#0a0a0a');
	}, [theme]);

	return (
		<section className='flex items-center justify-center min-h-screen relative'>
			<div className='text-center max-w-5xl mx-auto px-4'>
				<GradualSpacing
					className='text-center text-4xl font-bold -tracking-wider text-black
                              dark:text-white md:text-7xl md:leading-[5rem]'
					text='Ayush Rajput'
				/>
				<p className='text-xl md:text-2xl font-semibold mb-8'>
					<span className='text-gray-600 dark:text-[#C9C9C9]'>Full Stack </span>
					<span
						className='bg-gradient-to-r from-[#9C83FF] to-[#FF9051]
                                   text-transparent bg-clip-text'
					>
						Developer
					</span>
				</p>

				<div className='flex justify-center space-x-4 items-center'>
					<Button
						className='group flex items-center space-x-2 bg-purple-600/10
                                 dark:bg-purple-900/20 border border-purple-500/20
                                 text-purple-600 dark:text-purple-400 font-semibold
                                 tracking-wider transition-all duration-300
                                 hover:bg-purple-600/20 dark:hover:bg-purple-900/30
                                 hover:scale-105 hover:shadow-md'
						variant='ghost'
						endContent={<GithubIcon />}
						onClick={() => {
							window.open(GITHUB_URL);
						}}
					>
						Github
					</Button>
					<a href={`mailto:${GMAIL_URL}`}>
						<Button
							className='group flex items-center space-x-2 bg-red-600/10
                                     dark:bg-red-900/20 border border-red-500/20
                                     text-red-600 dark:text-red-400 font-semibold
                                     tracking-wider transition-all duration-300
                                     hover:bg-red-600/20 dark:hover:bg-red-900/30
                                     hover:scale-105 hover:shadow-md'
							variant='ghost'
							endContent={<GmailIcon />}
						>
							Contact Me
						</Button>
					</a>
				</div>
			</div>

			<div
				className='absolute bottom-[20px] left-2/4 -translate-x-1/2
                          animate-[bounce_2s_infinite]'
			>
				<i className='w-8 h-8'>⬇️</i>
			</div>
			<Particles
				className='absolute inset-0'
				quantity={500}
				ease={80}
				color={color}
				refresh
			/>
		</section>
	);
}
