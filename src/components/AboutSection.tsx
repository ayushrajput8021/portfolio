export default function AboutSection() {
	return (
		<section id='about' className='py-20 bg-gray-100 section dark:bg-gray-900'>
			<div className='container px-4 mx-auto'>
				<h2 className='mb-8 text-3xl font-bold text-center font-garamond'>
					About Me
				</h2>
				<div className='flex flex-col items-center justify-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-12'>
					<div className='flex-shrink-0 bg-gray-300 squircle dark:bg-gray-700'>
						<img
							src='/avatar.jpeg'
							alt='avatar'
							className='object-cover w-full h-full'
						/>
					</div>
					<div className='max-w-2xl text-center md:text-left'>
						<p className='about-text font-space-mono'>
							Hi there! 👋 I'm a Full stack Developer from India with 1+ years
							of experience in website or web app development. I have a strong
							passion for developing innovative solutions for challenging
							problems.
						</p>
						<br />
						<p className='about-text font-space-mono'>
							I have experience working with JavaScript, TypeScript, React,
							Node.js, Express.js, MongoDB, Prisma, PostgreSQL, Vercel, Next.js,
							and other modern web technologies.
						</p>
						<br />
						<p className='about-text interests-container'>
							<span>
								<span className='font-bold'>Interests: </span> Gaming 🎮, Music
								🎧, and Coding 💻.
							</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
