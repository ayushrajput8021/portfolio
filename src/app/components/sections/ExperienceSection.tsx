'use client';
import { useTheme } from 'next-themes';

export default function ExperienceSection() {
	const { theme } = useTheme();

	const experiences = [
		{
			name: 'Full Stack Developer - Freelance',
			timeline: 'Jan 2025 - Present',
			type: 'Freelance',
			location: 'Remote',
			description:
				'Developed a backend-focused tour booking platform with a Stripe payment gateway for secure transactions.',
			subDescriptions: [
				'Designed and implemented RESTful APIs using Node.js and Express.',
				'Integrated MongoDB for efficient data storage and retrieval.',
				'Set up self-hosting on AWS EC2 with Docker and Nginx reverse proxy.',
				'Styled frontend with Pug templates and custom CSS.',
			],
		},
		{
			name: 'Full Stack Developer - Upwork Freelance',
			timeline: 'Oct 2024 - Jan 2025',
			type: 'Freelance',
			location: 'Remote',
			description:
				'Created a simple travel list application to track destinations.',
			subDescriptions: [
				'Built the UI with React and styled it using TailwindCSS.',
				'Implemented LocalStorage for persistent data storage.',
				'Deployed on Vercel with custom domain mapping via CNAME.',
			],
		},
		{
			name: 'Associate Full Stack Developer - IntelliSQR',
			timeline: 'June 2024 - Ongoing',
			type: 'On-site',
			location: 'Delhi, India', // Updated to include On-site
			description:
				'Worked on various client projects through Upwork, focusing on full-stack development.',
			subDescriptions: [
				'Developed responsive web applications using React and Node.js.',
				'Collaborated with clients to deliver tailored solutions.',
				'Optimized performance and ensured cross-browser compatibility.',
				'Occasionally worked on-site for specific client requirements.',
			],
		},
	];

	return (
		<section
			id='experience'
			className='py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-300'
		>
			<div className='container px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl'>
				<h2
					className='mb-12 text-3xl md:text-4xl font-bold text-center font-space-mono
                              text-gray-900 dark:text-gray-100
                              hover:text-gray-800 dark:hover:text-gray-50
                              transition-colors duration-300'
				>
					My Experience
				</h2>
				<div className='relative'>
					{/* Vertical Timeline Line */}
					<div
						className='absolute left-6 top-0 w-1 h-full
                                  bg-gray-300 dark:bg-gray-700
                                  transform -translate-x-1/2'
					></div>

					{experiences.map((exp, index) => (
						<div key={index} className='relative flex items-start mb-12 group'>
							{/* Timeline Dot */}
							<div
								className={`absolute left-6 w-4 h-4 rounded-full
                                          ${
																						theme === 'light'
																							? 'bg-blue-600 group-hover:bg-blue-700'
																							: 'bg-blue-400 group-hover:bg-blue-500'
																					}
                                          transform -translate-x-1/2 translate-y-2
                                          transition-colors duration-300 z-10`}
							></div>

							{/* Experience Card */}
							<div
								className='ml-12 bg-white dark:bg-[#101010] rounded-xl
                                          border border-gray-200/50 dark:border-gray-800/50
                                          shadow-md hover:shadow-xl
                                          transition-all duration-500 w-full p-6'
							>
								<h3
									className='text-xl font-bold text-gray-900 dark:text-gray-100
                                              group-hover:text-blue-600 dark:group-hover:text-blue-400
                                              transition-colors duration-300 mb-2'
								>
									{exp.name}
								</h3>
								<div className='flex flex-wrap gap-4 mb-4'>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium
                                                  ${
																										theme === 'light'
																											? 'bg-blue-100 text-blue-600'
																											: 'bg-blue-950/50 text-blue-300 border border-blue-900/50'
																									}`}
									>
										{exp.timeline}
									</span>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium
                                                  ${
																										exp.type === 'Freelance'
																											? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300'
																											: exp.type ===
																											  'Personal Project'
																											? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300'
																											: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
																									}`}
									>
										{exp.type}
									</span>
									<span
										className='px-2 py-1 bg-gray-200 dark:bg-gray-800
                                                  text-gray-700 dark:text-gray-300
                                                  text-xs font-medium rounded-full'
									>
										{exp.location}
									</span>
								</div>
								<p
									className='text-gray-600 dark:text-gray-400 text-sm md:text-base
                                              leading-relaxed mb-3'
								>
									{exp.description}
								</p>
								{/* Sub-Descriptions */}
								<ul
									className='list-disc pl-5 text-gray-600 dark:text-gray-400
                                              text-sm md:text-base leading-relaxed'
								>
									{exp.subDescriptions.map((subDesc, subIndex) => (
										<li key={subIndex} className='mb-1'>
											{subDesc}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
