import Image from 'next/image';

export default function LinksSection() {
	return (
		<section id='links' className='items-center justify-center gap-8 py-20 '>
			<div className='flex flex-col items-center justify-center gap-12 px-4'>
				<h2 className='text-4xl font-semibold text-center font-space-mono'>
					Connect with me
				</h2>
				<nav className='flex gap-6 items-center'>
					<a
						href='https://github.com/ayushrajput8021'
						className='flex items-center gap-3 text-xl font-bold text-gray-600 nav-link md:text-2xl dark:text-gray-400 hover:text-white'
						target='_blank'
					>
						<Image
							src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg'
							alt='GitHub'
							title='GitHub'
							className='invert size-6'
							width={24}
							height={24}
						/>
						<span className='text-gradient'>Github</span>
					</a>
					<a
						href='https://www.linkedin.com/in/ayush-rajput/'
						className='flex items-center gap-3 text-xl font-bold text-gray-600 nav-link md:text-2xl dark:text-gray-400 hover:text-white'
						target='_blank'
					>
						<Image
							src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg'
							alt='LinkedIn'
							title='LinkedIn'
							className='invert size-6'
							width={24}
							height={24}
						/>
						<span className='text-gradient'>LinkedIn</span>
					</a>
				</nav>
			</div>
		</section>
	);
}
