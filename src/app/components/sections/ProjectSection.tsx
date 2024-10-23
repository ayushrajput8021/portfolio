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
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/1-P7V7TYwX3DR68IrsGa31LAX6EC0lsW.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/2-sA5zgIQRmAnyqn3qNPo3AFmZEKNg3B.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/3-o5tilNXs9iFHc28eUideemw5Koxm54.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/travel/4-sHMvHXNKqApW1Eo5SQHjtNioeVROXL.png',
		],
	},
	{
		title: 'Natours',
		description:
			'This is a backend-focused project used to book tours. It includes the following features: Payment Gateway: Utilizes Stripe for secure and efficient payment processing.',
		url: 'https://natours.ayushrajput.live/',
		githubUrl: 'https://github.com/ayushrajput8021/natoursv1',
		image: [
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/1-2TwvpkxqTCjgUhidr41NIwVLVkeQBb.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/2-gZOGfiyo4HPWpXRuCdappl6RpJnx99.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/3-NIzfru3t6NCALpKaBebHOsgLnukenS.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/4-ClBEQ4Hqwgg27dbnLFODmLW4ybMi3m.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/5-MtGt9yNZMDQItrenUO2n2gZKp3CNSa.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/6-sd5jlWQUN138IWoGLA7RWFICdHzrD8.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/7-3My6MSLb1QZtawFSLO0lkU4Qp4YhhQ.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/8-C6b1UIVXNQ2LemUZT99uT1ZRIR9y9E.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/9-ra0lgBEjQXlYuCKcUzSxbiVrjaVEKR.png',
			'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/natours/10-Cpo0pdk9LcudjfqtjX1bsNd1A1H48W.png',
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
