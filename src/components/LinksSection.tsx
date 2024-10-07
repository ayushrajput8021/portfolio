export default function LinksSection() {
	return (
		<section id='links' className='section py-20'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold mb-12 text-center font-space-mono'>
					Connect with me
				</h2>
				<nav className='nav-container'>
					<a
						href='https://github.com/ayushrajput8021'
						className='nav-link text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold'
					>
						<i data-lucide='instagram' className='w-6 h-6'></i>
						<span className='text-gradient'>Github</span>
					</a>
					<a
						href='https://www.linkedin.com/in/ayush-rajput/'
						className='nav-link text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold'
					>
						<span className='text-gradient'>LinkedIn</span>
					</a>
				</nav>
			</div>
		</section>
	);
}
