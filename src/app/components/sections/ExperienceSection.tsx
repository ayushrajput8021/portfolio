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
				'Enhanced a full-stack application by optimizing database and code performance for scalability while initiating landing page development.',
			subDescriptions: [
				'Database Migration: Migrated PostgreSQL to use the Drizzle ORM, improving database efficiency and maintainability.',
				'Front-End Optimization: Improved React code to efficiently handle large datasets, enhancing performance and user experience.',
				'Back-End Refactoring: Refactored Node.js code to manage increased data volume, ensuring scalability and reliability.',
				'Landing Page Development: Currently designing and building the product’s landing page to support marketing and user engagement.',
			],
		},
		{
			name: 'Full Stack Developer - Upwork Freelance',
			timeline: 'Oct 2024 - Jan 2025',
			type: 'Freelance',
			location: 'Remote',
			description:
				'Developed and deployed a full-stack financial dashboard and user management system with comprehensive documentation.',
			subDescriptions: [
				'Front-End Development: Converted Figma designs into functional React code, creating an interactive financial dashboard and user management interface.',
				'Back-End Development: Built a Node.js backend integrated with PostgreSQL to support data management and application functionality.',
				'Deployment: Successfully deployed the entire application on the client’s virtual machine, ensuring operational readiness.',
				'Documentation: Created detailed documentation, including configuration, manual, dependencies, and database guides, to support client use and maintenance.',
			],
		},
		{
			name: 'Associate Full Stack Developer - IntelliSQR',
			timeline: 'June 2024 - Ongoing',
			type: 'On-site',
			location: 'Delhi, India', // Updated to include On-site
			description:
				'Developed and deployed a full-stack eCommerce platform with integrated payment processing, automated communication systems, and robust cloud infrastructure.',
			subDescriptions: [
				'Deployed applications on Azure VM using Docker, established CI/CD pipelines, and configured Nginx as a reverse proxy for different services, ensuring efficient and reliable deployment.',
				'Integrated WhatsApp API into the application to facilitate automated user responses and enhance communication efficiency.',
				'Implemented Razorpay for seamless monthly subscription management and payment processing, optimizing the user experience.',
				'Developed a robust Node.js backend with PostgreSQL for an eCommerce platform, ensuring high performance and reliable data handling.',
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
