import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Project data
const projects = [
	{
		title: 'Travel List',
		description:
			'A simple travel list app to keep track of your travel destinations. Uses local storage to store data.',
		url: 'https://travel.ayushrajput.live/',
		githubUrl: 'https://github.com/ayushrajput8021/travellist',
		image: ['/travel/1.png', '/travel/2.png', '/travel/3.png', '/travel/4.png'],
	},
	{
		title: 'Natours',
		description:
			'This is a backend-focused project used to book tours. It includes the following features: Payment Gateway: Utilizes Stripe for secure and efficient payment processing.',
		url: 'https://natours.ayushrajput.live/',
		githubUrl: 'https://github.com/ayushrajput8021/natoursv1',
		image: [
			'/natours/1.png',
			'/natours/2.png',
			'/natours/3.png',
			'/natours/4.png',
			'/natours/5.png',
			'/natours/6.png',
			'/natours/7.png',
			'/natours/8.png',
			'/natours/9.png',
			'/natours/10.png',
		],
	},
];

export default function ProjectsSection() {
	return (
		<section
			id='projects'
			className='py-20 bg-gray-100 section dark:bg-gray-900'
		>
			<div className='container px-8 mx-auto'>
				<h2 className='mb-12 text-3xl font-bold text-center font-space-mono'>
					Some of my Projects
				</h2>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
					{projects.map((project, index) => (
						<div key={index} className=''>
							<div className='mb-4 project-thumbnail'>
								{/* Carousel for multiple images */}
								{project.image.length > 1 ? (
									<Carousel
										showThumbs={false}
										autoPlay
										infiniteLoop
										showStatus={false}
										showIndicators={false}
									>
										{project.image.map((img, imgIndex) => (
											<div key={imgIndex}>
												<img
													src={img}
													alt={`${project.title} image ${imgIndex + 1}`}
													className='object-cover w-full h-full'
												/>
											</div>
										))}
									</Carousel>
								) : (
									// Single image
									<img
										src={project.image[0]}
										alt={project.title}
										className='object-cover w-full h-full'
									/>
								)}
								<div className='redirect-icon'>
									<i data-lucide='external-link'></i>
								</div>
							</div>
							<h3 className='mb-2 text-xl font-bold'>{project.title}</h3>
							<p className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
								{project.description}
							</p>
							<div className='flex gap-4'>
								<a
									href={project.url}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600'
								>
									Visit Website
								</a>
								{project.githubUrl ? (
									<a
										href={project.githubUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-block px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-gray-900'
									>
										GitHub Repo
										<i data-lucide='github' className='ml-2'></i>
									</a>
								) : null}
							</div>
							{project.githubUrl ? (
								<div className='mt-4 repo-actions'>
									<a
										href={`${project.githubUrl}/stargazers`}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-block mr-4 repo-action'
									>
										<i data-lucide='star'></i>
										Star
									</a>
									<a
										href={`${project.githubUrl}/fork`}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-block repo-action'
									>
										<i data-lucide='git-fork'></i>
										Fork
									</a>
								</div>
							) : null}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
