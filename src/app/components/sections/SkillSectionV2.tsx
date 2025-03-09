'use client';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';

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
		items: [],
	},
];

interface SkillCategoryProps {
	title: string;
	items: { icon: string; name: string }[];
}

function SkillCategory({ title, items }: SkillCategoryProps) {
	const { theme } = useTheme();

	return (
		<div
			className='group relative p-6 bg-white dark:bg-[#101010] rounded-xl
                      border border-gray-200/50 dark:border-gray-800/50 shadow-sm
                      hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700
                      transition-all duration-300'
		>
			{/* Category Header */}
			<div className='flex items-center gap-4 mb-6'>
				{CategoryIcons[title as keyof typeof CategoryIcons]}
				<h3
					className='text-lg font-semibold text-gray-800 dark:text-gray-100
                              group-hover:text-gray-900 dark:group-hover:text-white
                              transition-colors duration-300'
				>
					{title}
				</h3>
			</div>

			{/* Skills Grid */}
			<div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-3'>
				{items.map((item, index) => (
					<div
						key={index}
						className='flex flex-col items-center gap-2 group/skill'
					>
						<div
							className={`p-3 rounded-lg flex items-center justify-center
                                      transition-all duration-300 group-hover/skill:scale-110
                                      ${
																				theme === 'light'
																					? 'bg-gray-800 group-hover/skill:bg-gray-700'
																					: 'bg-gray-900/50 group-hover/skill:bg-gray-800/70'
																			}`}
						>
							<Image
								src={item.icon}
								alt={item.name}
								width={32}
								height={32}
								className='w-7 h-7 object-contain group-hover/skill:scale-105
                                          transition-transform duration-300'
							/>
						</div>
						<span
							className='text-xs font-medium text-gray-600 dark:text-gray-400
                                      group-hover/skill:text-gray-700 dark:group-hover/skill:text-gray-300
                                      text-center transition-colors duration-300'
						>
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
		<section
			id='skills'
			className='py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-300'
		>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl'>
				<h2
					className='text-3xl md:text-4xl font-bold text-center mb-12
                              text-gray-900 dark:text-gray-100
                              hover:text-gray-800 dark:hover:text-gray-50
                              transition-colors duration-300'
				>
					Technical Expertise
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{skillsConfig.map(
						(category, index) =>
							category.items.length > 0 && (
								<SkillCategory
									key={index}
									title={category.title}
									items={category.items}
								/>
							)
					)}
				</div>
			</div>
		</section>
	);
}

// Category Header Icons (unchanged)
const CategoryIcons = {
	Frontend: (
		<div
			className='p-2 bg-blue-100/70 dark:bg-blue-900/30 rounded-lg
                      group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-blue-600 dark:text-blue-400
                          group-hover:text-blue-700 dark:group-hover:text-blue-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h14a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0h10a4 4 0 004-4V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a4 4 0 004 4z'
				/>
			</svg>
		</div>
	),
	Backend: (
		<div
			className='p-2 bg-green-100/70 dark:bg-green-900/30 rounded-lg
                      group-hover:bg-green-200 dark:group-hover:bg-green-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-green-600 dark:text-green-400
                          group-hover:text-green-700 dark:group-hover:text-green-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5 12h14M5 12l4-4m-4 4l4 4'
				/>
			</svg>
		</div>
	),
	Database: (
		<div
			className='p-2 bg-purple-100/70 dark:bg-purple-900/30 rounded-lg
                      group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-purple-600 dark:text-purple-400
                          group-hover:text-purple-700 dark:group-hover:text-purple-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
				/>
			</svg>
		</div>
	),
	'Cloud/DevOps': (
		<div
			className='p-2 bg-orange-100/70 dark:bg-orange-900/30 rounded-lg
                      group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-orange-600 dark:text-orange-400
                          group-hover:text-orange-700 dark:group-hover:text-orange-300
                          transition-colors duration-300'
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
		<div
			className='p-2 bg-red-100/70 dark:bg-red-900/30 rounded-lg
                      group-hover:bg-red-200 dark:group-hover:bg-red-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-red-600 dark:text-red-400
                          group-hover:text-red-700 dark:group-hover:text-red-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
				/>
			</svg>
		</div>
	),
	Others: (
		<div
			className='p-2 bg-pink-100/70 dark:bg-pink-900/30 rounded-lg
                      group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50
                      transition-all duration-300'
		>
			<svg
				className='w-6 h-6 text-pink-600 dark:text-pink-400
                          group-hover:text-pink-700 dark:group-hover:text-pink-300
                          transition-colors duration-300'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
				/>
			</svg>
		</div>
	),
};
