import Image from 'next/image';
import Avatar from '@/app/images/avatar.jpeg';

export default function AboutSection() {
	return (
		<section id='about' className='py-24 bg-white dark:bg-[#080808]'>
			<div className='container mx-auto px-4 md:px-8 max-w-6xl'>
				<div className='flex flex-col md:flex-row gap-12 md:gap-24 items-center'>
					{/* Avatar Image with Subtle Background */}
					<div className='relative group w-full max-w-[300px]'>
						<div className='absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent dark:from-[#1a1a1a] rounded-2xl -rotate-2 scale-95 group-hover:rotate-0 transition-transform duration-300' />
						<Image
							src={Avatar}
							alt='Profile picture'
							className='relative rounded-2xl object-cover w-full h-auto shadow-xl grayscale hover:grayscale-0 transition-all duration-500'
							width={400}
							height={500}
							priority
						/>
					</div>

					{/* Content */}
					<div className='flex-1 space-y-8'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight'>
							Building Digital Experiences,
							<br />
							<span className='text-blue-600 dark:text-blue-400'>
								Not Just Code
							</span>
						</h2>

						<div className='space-y-6'>
							<p className='text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium'>
								As a Full Stack Developer based in India, I specialize in
								creating holistic web solutions that combine technical
								excellence with user-centered design. With over a year of
								professional experience, I approach each project as a unique
								puzzle to solve.
							</p>

							<div className='flex flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
								<div className='flex items-center gap-3 group'>
									<div className='p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors'>
										<svg
											className='w-6 h-6 text-blue-600 dark:text-blue-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</div>
									<div>
										<p className='text-sm font-semibold text-gray-900 dark:text-gray-200'>
											1+ Years
										</p>
										<p className='text-sm text-gray-500 dark:text-gray-400'>
											Experience
										</p>
									</div>
								</div>

								<div className='flex items-center gap-3 group'>
									<div className='p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors'>
										<svg
											className='w-6 h-6 text-purple-600 dark:text-purple-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
											/>
										</svg>
									</div>
									<div>
										<p className='text-sm font-semibold text-gray-900 dark:text-gray-200'>
											5+ Projects
										</p>
										<p className='text-sm text-gray-500 dark:text-gray-400'>
											Completed
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
