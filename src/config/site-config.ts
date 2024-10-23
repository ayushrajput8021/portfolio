import { Metadata } from 'next';

const TITLE =
	'Ayush Rajpt - Full Stack Developer | React, Node.js, TypeScript, Next.js';
const DESCRIPTION =
	'Hi there! 👋 I m a Full Stack Developer from India with over 1 year of experience in web development. I have a passion for solving complex problems and building innovative web applications. My tech stack includes JavaScript, TypeScript, React, Node.js, Express.js, MongoDB, Prisma, PostgreSQL, Vercel, Next.js, and more.';

const PREVIEW_IMAGE_URL =
	'https://a1tvj0wtyb3ubfje.public.blob.vercel-storage.com/preview-img';
const ALT_TITLE =
	'Ayush Rajpt - Full Stack Developer | React, Node.js, TypeScript, Next.js';
const BASE_URL = 'https://ayushrajput.live';

export const siteConfig: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	icons: {
		icon: '/favicon.ico',
	},
	applicationName: 'Ayush Rajput - Portfolio',
	creator: 'Ayush Rajput',

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
