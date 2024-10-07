export default function SkillsSection() {
	return (
		<section id='skills' className='section py-20'>
			<div className='container mx-auto px-8 sm:px-16'>
				<h2 className='text-3xl font-bold mb-12 text-center font-space-mono'>
					What I fiddle with....
				</h2>
				<div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-8 justify-items-center'>
					<img
						src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/c.svg'
						alt='C'
						className='tech-icon'
					/>
					<img
						src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/cplusplus.svg'
						alt='C++'
						className='tech-icon'
					/>
					<img
						src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/gnubash.svg'
						alt='GNU Bash'
						className='tech-icon'
					/>
					<img
						src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linux.svg'
						alt='Linux'
						className='tech-icon'
					/>
					<img
						src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/cmake.svg'
						alt='CMake'
						className='tech-icon'
					/>
					<img
						src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/python.svg'
						alt='Python'
						className='tech-icon'
					/>
					<img
						src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/langchain.svg'
						alt='langchain'
						className='tech-icon'
					/>
				</div>
			</div>
		</section>
	);
}
