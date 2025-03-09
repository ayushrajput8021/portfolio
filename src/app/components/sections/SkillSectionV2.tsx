'use client';
import Image from 'next/image';
import React from 'react';

// Importing devops images
import AwsIcon from '@/app/images/Devops/AWS.svg';
import NginxIcon from '@/app/images/Devops/NGINX.svg';
import VercelIcon from '@/app/images/Devops/Vercel.svg';
import DockerIcon from '@/app/images/Devops/Docker.svg';

// Importing frontend images
import ReactIcon from '@/app/images/Frontend/React.svg';
import NextIcon from '@/app/images/Frontend/Next.js.svg';
import TailwindIcon from '@/app/images/Frontend/TailwindCSS.svg';
import ReduxIcon from '@/app/images/Frontend/Redux.svg';
import TypescriptIcon from '@/app/images/Frontend/TypeScript.svg';
import JavascriptIcon from '@/app/images/Frontend/JavaScript.svg';

// Importing backend images
import NodeIcon from '@/app/images/Backend/Node.js.svg';
import ExpressIcon from '@/app/images/Backend/Express.svg';
import FlaskIcon from '@/app/images/Backend/Flask.svg';

// Importing database images
import MongodbIcon from '@/app/images/Database/MongoDB.svg';
import PostgresqlIcon from '@/app/images/Database/PostgresSQL.svg';
import MysqlIcon from '@/app/images/Database/MySQL.svg';
import RedisIcon from '@/app/images/Database/Redis.svg';

const skillsConfig = [
	{
		title: 'Frontend',
		items: [
			{ icon: ReactIcon, name: 'React' },
			{ icon: NextIcon, name: 'Next.js' },
			{ icon: TailwindIcon, name: 'Tailwind CSS' },
			{ icon: ReduxIcon, name: 'Redux' },
			{ icon: TypescriptIcon, name: 'TypeScript' },
			{ icon: JavascriptIcon, name: 'JavaScript' },
		],
	},
	{
		title: 'Backend',
		items: [
			{ icon: NodeIcon, name: 'Node.js' },
			{ icon: ExpressIcon, name: 'Express' },
			{ icon: FlaskIcon, name: 'Flask' },
		],
	},
	{
		title: 'Database',
		items: [
			{ icon: MongodbIcon, name: 'MongoDB' },
			{ icon: PostgresqlIcon, name: 'PostgreSQL' },
			{ icon: MysqlIcon, name: 'MySQL' },
			{ icon: RedisIcon, name: 'Redis' },
		],
	},
	{
		title: 'Cloud/DevOps',
		items: [
			{ icon: AwsIcon, name: 'AWS' },
			{ icon: DockerIcon, name: 'Docker' },
			{ icon: NginxIcon, name: 'NGINX' },
		],
	},
	{
		title: 'Deployment',
		items: [{ icon: VercelIcon, name: 'Vercel' }],
	},
	{
		title: 'Others',
		items: [
			// Add any additional tools here
		],
	},
];

interface SkillCategoryProps {
	title: string;
	items: { icon: string; name: string }[];
}

function SkillCategory({ title, items }: SkillCategoryProps) {
	return (
		<div className='relative p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all'>
			{/* Category Header */}
			<div className='flex items-center gap-4 mb-6'>
				{CategoryIcons[title as keyof typeof CategoryIcons]}
				<h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
					{title}
				</h3>
			</div>

			{/* Skills Grid */}
			<div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-3'>
				{items.map((item, index) => (
					<div key={index} className='flex flex-col items-center gap-1.5 group'>
						<div className='p-2 bg-gray-50 dark:bg-gray-800 rounded-lg  flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
							<Image
								src={item.icon}
								alt={item.name}
								width={32}
								height={32}
								className='w-6 h-6 object-contain'
							/>
						</div>
						<span className='text-xs font-medium text-gray-600 dark:text-gray-400 text-center opacity-90 transition-all'>
							{item.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default function SkillsSection() {
	return (
		<section id='skills' className='py-20 bg-gray-50 dark:bg-gray-950'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl'>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100'>
					Technical Expertise
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{skillsConfig.map((category, index) => (
						<SkillCategory
							key={index}
							title={category.title}
							items={category.items}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

// Category Header Icons (replace previous ones)
const CategoryIcons = {
	Frontend: (
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
					d='M13 10V3L4 14h7v7l9-11h-7z'
				/>
			</svg>
		</div>
	),
	Backend: (
		<div className='p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors'>
			<svg
				className='w-6 h-6 text-green-600 dark:text-green-400'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M13 10V3L4 14h7v7l9-11h-7z'
				/>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M20 14l-4 4-4-4'
				/>
			</svg>
		</div>
	),
	Database: (
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
					d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
				/>
			</svg>
		</div>
	),
	'Cloud/DevOps': (
		<div className='p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors'>
			<svg
				className='w-6 h-6 text-orange-600 dark:text-orange-400'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
				/>
			</svg>
		</div>
	),
	Deployment: (
		<div className='p-2 bg-red-100 dark:bg-red-900/50 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors'>
			<svg
				className='w-6 h-6 text-red-600 dark:text-red-400'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5 12h14M12 5l7 7-7 7'
				/>
			</svg>
		</div>
	),
	Others: (
		<div className='p-2 bg-pink-100 dark:bg-pink-900/50 rounded-lg group-hover:bg-pink-200 dark:group-hover:bg-pink-800 transition-colors'>
			<svg
				className='w-6 h-6 text-pink-600 dark:text-pink-400'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M13 10V3L4 14h7v7l9-11h-7z'
				/>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M17 14l4-4m0 0l-4-4m4 4H3'
				/>
			</svg>
		</div>
	),
};
