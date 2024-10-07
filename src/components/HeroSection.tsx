export default function HeroSection() {
	return (
		<section className='flex items-center justify-center min-h-screen'>
			<div className='text-center max-w-4xl mx-auto px-4'>
				<h1 className='text-4xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tighter leading-none text-shadow-glow-subtle'>
					Ayush Rajput
				</h1>
				<p className='text-xl md:text-2xl font-semibold mb-8'>
					<span className='text-gray-600 dark:text-[#C9C9C9]'>Full Stack </span>
					<span className='bg-gradient-to-r from-[#9C83FF] to-[#FF9051] text-transparent bg-clip-text'>
						Developer
					</span>
				</p>

				<div className='flex justify-center space-x-4 mb-12 items-center'>
					<a
						href='https://github.com/ayushrajput8021'
						className='button button-filled flex items-center space-x-2'
						target='_blank'
					>
						<span className='text-white'>Github</span>
						<img
							src='/github-white.svg'
							alt='github-white'
							className='size-5'
						/>
					</a>
					<a
						href='mailto:ayushrajput8021@gmail.com'
						className='button button-outlined flex items-center space-x-2'
						target='_blank'
					>
						<span>Contact Me</span>
						<img src='/mail-white.svg' alt='mail' className='size-5' />
					</a>
				</div>
			</div>

			<div className='chevron-down'>
				<i className='w-8 h-8'>⬇️</i>
			</div>
		</section>
	);
}
