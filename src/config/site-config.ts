import { Metadata } from 'next';

const TITLE =
	'Ayush Rajput - Full Stack Developer | React, Node.js, TypeScript, Next.js';
const DESCRIPTION =
	'Full Stack Developer specializing in React, Node.js, TypeScript & Next.js. Building scalable web applications with modern JavaScript frameworks and databases.';

const PREVIEW_IMAGE_URL =
	'https://res.cloudinary.com/db9eklbab/image/upload/v1762706447/Mine-ghibili_agnsvw.png';
const ALT_TITLE =
	'Ayush Rajput - Full Stack Developer | React, Node.js, TypeScript, Next.js';
const BASE_URL = 'https://ayushrajput.in';

export const siteConfig: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	icons: {
		icon: '/favicon.ico',
	},
	applicationName: 'Ayush Rajput - Portfolio',
	creator: 'Ayush Rajput',
	authors: [{ name: 'Ayush Rajput', url: BASE_URL }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-verification-code', // Add your Google Search Console verification code
	},

	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		siteName: 'Ayush Rajput - Portfolio',
		url: BASE_URL,
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: PREVIEW_IMAGE_URL,
				width: 1200,
				height: 630,
				alt: ALT_TITLE,
			},
		],
	},
	category: 'Web Development Portfolio',
	alternates: {
		canonical: BASE_URL,
	},
	keywords: [
		'Full Stack Developer',
		'Web Developer',
		'JavaScript',
		'TypeScript',
		'React',
		'Node.js',
		'Express.js',
		'MongoDB',
		'Prisma',
		'PostgreSQL',
		'Vercel',
		'Next.js',
		'Frontend Developer',
		'Backend Developer',
		'Software Engineer',
		'Web Applications',
		'REST APIs',
		'GraphQL',
		'HTML',
		'CSS',
		'SASS',
		'Styled Components',
		'Tailwind CSS',
		'Git',
		'GitHub',
		'CI/CD',
		'Docker',
		'Kubernetes',
		'AWS',
		'Azure',
		'Jest',
		'Webpack',
		'Babel',
		'ESLint',
		'Prettier',
		'VSCode',
	],
	metadataBase: new URL(BASE_URL),
};
