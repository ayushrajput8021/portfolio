export default function AboutSection() {
	return (
		<section id='about' className='section py-20 bg-gray-100 dark:bg-gray-900'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold mb-8 text-center font-garamond'>
					About Me
				</h2>
				<div className='flex flex-col md:flex-row items-center md:items-start justify-center space-y-8 md:space-y-0 md:space-x-12'>
					<div className='squircle bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
						<img
							src='/avatar.jpeg'
							alt='avatar'
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='max-w-2xl text-center md:text-left'>
						<p className='about-text font-space-mono'>
							Hi there! 👋 I'm a C Developer from India with 2+ years of
							experience in feature development and system enhancement for{' '}
							<span className='rdk-hover font-bold'>RDK-B</span> platforms.
						</p>
						<br />
						<p className='about-text font-space-mono'>
							I'm also passionate about photography, graphic design and modern
							arts. When I'm not coding, you'll find me tinkering with one of
							them.
						</p>
						<br />
						<p className='about-text interests-container'>
							<span>
								<span className='font-bold'>Interests: </span> Photography,
								Movies, Music & Science Fiction
							</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
