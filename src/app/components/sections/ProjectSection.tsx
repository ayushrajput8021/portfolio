import Image from 'next/image';
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
		image: [
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/1-Y8rtYhKlK5Uupc7tZW8klQeonmwQwC.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/2-zVABka7bR9j987PydyVL1GuhG8rFp6.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/3-yTitBPXkzyL57ETf2fFvYU58veKe6X.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/4-j2kFyJEcaMEV6oI0hyciiGutLi91n0.png',
		],
	},
	{
		title: 'Natours',
		description:
			'This is a backend-focused project used to book tours. It includes the following features: Payment Gateway: Utilizes Stripe for secure and efficient payment processing.',
		url: 'https://natours.ayushrajput.live/',
		githubUrl: 'https://github.com/ayushrajput8021/natoursv1',
		image: [
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/1-cDnqvkZ9nrfmDA80rz1NLxsGeTlT7N.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/2-Vx82pNzE5mulBxdzyrijaJ4ouahl4J.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/3-6NG473fRiaWvv4MnYoJB7Ce3uljjtO.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/4-LFNRcZIcR79xBMeYBMUv8ABXaQhH6V.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/5-88kfRDfSgqJGFNAOutkurRge5Q39zo.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/6-snmM2e9a7rAh2DLjW55g3ttwCwGgpm.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/7-UZppEvnQSEXMnjteCBPmhVIc260YIv.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/8-NOfaCeTsXg0yzo4WgxqNbSQ3raplFr.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/9-yKyCLES1t7WC6kiRhZ9eavwNZDH081.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/1-cDnqvkZ9nrfmDA80rz1NLxsGeTlT7N.png',
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
										showArrows={true}
										showStatus={false}
										showIndicators={false}
									>
										{project.image.map((img, imgIndex) => (
											<div key={imgIndex}>
												<Image
													src={img}
													width={800}
													height={900}
													quality={100}
													alt={`${project.title} image ${imgIndex + 1}`}
												/>
											</div>
										))}
									</Carousel>
								) : (
									// Single image
									<Image
										src={project.image[0]}
										alt={project.title}
										fill
										className='object-cover object-top'
										quality={100}
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
