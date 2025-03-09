import Image from 'next/image';
import Github from '@/app/images/github-white.svg';
import Mail from '@/app/images/mail-white.svg';
import { Button } from '@nextui-org/button';
import Particles from '@/app/components/ui/particles';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import GradualSpacing from '@/app/components/ui/gradual-spacing';

export default function HeroSection() {
	const { theme } = useTheme();
	const [color, setColor] = useState('#ffffff');

	useEffect(() => {
		setColor(theme === 'dark' ? '#ffffff' : '#0a0a0a');
	}, [theme]);

	return (
		<section className='flex items-center justify-center min-h-screen relative'>
			{/* <button
				onClick={() => {
					setTheme(theme === 'dark' ? 'light' : 'dark');
				}}
			>
				click
			</button> */}
			<div className='text-center max-w-5xl mx-auto px-4'>
				<GradualSpacing
					className=' text-center text-4xl font-bold -tracking-wider  text-black dark:text-white md:text-7xl md:leading-[5rem]'
					text='Ayush Rajput'
				/>
				<p className='text-xl md:text-2xl font-semibold mb-8'>
					<span className='text-gray-600 dark:text-[#C9C9C9]'>Full Stack </span>
					<span className='bg-gradient-to-r from-[#9C83FF] to-[#FF9051] text-transparent bg-clip-text'>
						Developer
					</span>
				</p>

				<div className='flex justify-center space-x-4 items-center'>
					<Button
						className='flex items-center space-x-2 text-white hover:text-white font-semibold tracking-wider'
						variant='ghost'
						color='secondary'
						endContent={
							<Image src={Github} alt='github-white' width={24} height={24} />
						}
						onClick={() => {
							window.open('https://github.com/ayushrajput8021');
						}}
					>
						Github
					</Button>
					<a href='mailto:ayushrajput8021@gmail.com'>
						<Button
							className='flex items-center space-x-2 text-white hover:text-white font-semibold tracking-wider'
							variant='ghost'
							color='danger'
							endContent={
								<Image src={Mail} alt='mail' width={24} height={24} />
							}
						>
							Contact Me
						</Button>
					</a>
				</div>
			</div>

			<div className='absolute bottom-[20px] left-2/4 -translate-x-1/2 animate-[bounce_2s_infinite]'>
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
