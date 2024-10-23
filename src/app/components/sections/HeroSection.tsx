import Image from 'next/image';
import Github from '@/app/images/github-white.svg';
import Mail from '@/app/images/mail-white.svg';
import { Button } from '@nextui-org/button';

export default function HeroSection() {
	return (
		<section className='flex items-center justify-center min-h-screen'>
			<div className='text-center max-w-5xl mx-auto px-4'>
				<h1 className='text-4xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tighter leading-none text-shadow-glow-subtle'>
					Ayush Rajput
				</h1>
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
		</section>
	);
}
