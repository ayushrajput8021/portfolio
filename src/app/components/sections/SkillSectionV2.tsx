'use client';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';

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
	const sectionRef = useTrackSection({ sectionId: SectionId.SKILLS });

	return (
		<section
			id='skills'
			ref={sectionRef}
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
				width='24'
				height='24'
				viewBox='0 0 25 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				transform='rotate(0 0 0)'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M5.60352 3.25C4.36088 3.25 3.35352 4.25736 3.35352 5.5V8.99998C3.35352 10.2426 4.36087 11.25 5.60352 11.25H9.10352C10.3462 11.25 11.3535 10.2426 11.3535 8.99998V5.5C11.3535 4.25736 10.3462 3.25 9.10352 3.25H5.60352ZM4.85352 5.5C4.85352 5.08579 5.1893 4.75 5.60352 4.75H9.10352C9.51773 4.75 9.85352 5.08579 9.85352 5.5V8.99998C9.85352 9.41419 9.51773 9.74998 9.10352 9.74998H5.60352C5.1893 9.74998 4.85352 9.41419 4.85352 8.99998V5.5Z'
					fill='currentColor'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M5.60352 12.75C4.36088 12.75 3.35352 13.7574 3.35352 15V18.5C3.35352 19.7426 4.36087 20.75 5.60352 20.75H9.10352C10.3462 20.75 11.3535 19.7426 11.3535 18.5V15C11.3535 13.7574 10.3462 12.75 9.10352 12.75H5.60352ZM4.85352 15C4.85352 14.5858 5.1893 14.25 5.60352 14.25H9.10352C9.51773 14.25 9.85352 14.5858 9.85352 15V18.5C9.85352 18.9142 9.51773 19.25 9.10352 19.25H5.60352C5.1893 19.25 4.85352 18.9142 4.85352 18.5V15Z'
					fill='currentColor'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M12.8535 5.5C12.8535 4.25736 13.8609 3.25 15.1035 3.25H18.6035C19.8462 3.25 20.8535 4.25736 20.8535 5.5V8.99998C20.8535 10.2426 19.8462 11.25 18.6035 11.25H15.1035C13.8609 11.25 12.8535 10.2426 12.8535 8.99998V5.5ZM15.1035 4.75C14.6893 4.75 14.3535 5.08579 14.3535 5.5V8.99998C14.3535 9.41419 14.6893 9.74998 15.1035 9.74998H18.6035C19.0177 9.74998 19.3535 9.41419 19.3535 8.99998V5.5C19.3535 5.08579 19.0177 4.75 18.6035 4.75H15.1035Z'
					fill='currentColor'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M15.1035 12.75C13.8609 12.75 12.8535 13.7574 12.8535 15V18.5C12.8535 19.7426 13.8609 20.75 15.1035 20.75H18.6035C19.8462 20.75 20.8535 19.7426 20.8535 18.5V15C20.8535 13.7574 19.8462 12.75 18.6035 12.75H15.1035ZM14.3535 15C14.3535 14.5858 14.6893 14.25 15.1035 14.25H18.6035C19.0177 14.25 19.3535 14.5858 19.3535 15V18.5C19.3535 18.9142 19.0177 19.25 18.6035 19.25H15.1035C14.6893 19.25 14.3535 18.9142 14.3535 18.5V15Z'
					fill='currentColor'
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
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M10.787 15.6126C11.1768 15.7025 11.5829 15.75 12 15.75C14.9685 15.75 17.375 13.3435 17.375 10.375C17.375 7.40647 14.9685 5 12 5C9.03147 5 6.625 7.40647 6.625 10.375C6.625 12.0921 7.43016 13.6211 8.68354 14.6052L7.33598 16.4521C6.83707 17.1359 7.04126 18.1013 7.77431 18.5245C8.50736 18.9477 9.44555 18.6419 9.78827 17.8679L10.787 15.6126ZM12 6.5C9.8599 6.5 8.125 8.2349 8.125 10.375C8.125 11.5943 8.68811 12.682 9.56845 13.3923L11.0434 11.3708C11.2694 11.0611 11.6924 10.9717 12.0243 11.1633C12.3562 11.3549 12.4903 11.766 12.3351 12.1165L11.4101 14.2054C11.6024 14.2348 11.7994 14.25 12 14.25C14.1401 14.25 15.875 12.5151 15.875 10.375C15.875 8.2349 14.1401 6.5 12 6.5Z'
					fill='currentColor'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M18 2C19.2426 2 20.25 3.00736 20.25 4.25V19.75C20.25 20.9926 19.2426 22 18 22H6C4.75736 22 3.75 20.9926 3.75 19.75V4.25C3.75 3.00736 4.75736 2 6 2H18ZM18.75 4.25C18.75 3.83579 18.4142 3.5 18 3.5L6 3.5C5.58579 3.5 5.25 3.83579 5.25 4.25L5.25 19.75C5.25 20.1642 5.58579 20.5 6 20.5H18C18.4142 20.5 18.75 20.1642 18.75 19.75L18.75 4.25Z'
					fill='currentColor'
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
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M5.28636 3.71264C4.853 4.09212 4.5 4.60958 4.5 5.25V18.75C4.5 19.3904 4.853 19.9079 5.28636 20.2874C5.7212 20.6681 6.30718 20.9769 6.96654 21.2211C8.29107 21.7116 10.0708 22 12 22C13.9292 22 15.7089 21.7116 17.0335 21.2211C17.6928 20.9769 18.2788 20.6681 18.7136 20.2874C19.147 19.9079 19.5 19.3904 19.5 18.75V5.25C19.5 4.60958 19.147 4.09212 18.7136 3.71264C18.2788 3.33187 17.6928 3.02313 17.0335 2.77892C15.7089 2.28836 13.9292 2 12 2C10.0708 2 8.29107 2.28836 6.96654 2.77892C6.30718 3.02313 5.7212 3.33187 5.28636 3.71264ZM6.27454 4.84114C6.02476 5.05985 6 5.20007 6 5.25C6 5.29993 6.02476 5.44015 6.27454 5.65886C6.52284 5.87629 6.92537 6.10625 7.48751 6.31446C8.60601 6.72871 10.2013 7 12 7C13.7987 7 15.394 6.72871 16.5125 6.31446C17.0746 6.10625 17.4772 5.87629 17.7255 5.65886C17.9752 5.44015 18 5.29993 18 5.25C18 5.20007 17.9752 5.05985 17.7255 4.84114C17.4772 4.62371 17.0746 4.39375 16.5125 4.18554C15.394 3.77129 13.7987 3.5 12 3.5C10.2013 3.5 8.60601 3.77129 7.48751 4.18554C6.92537 4.39375 6.52284 4.62371 6.27454 4.84114ZM18 9.75V7.28202C17.7055 7.44688 17.3796 7.59287 17.0335 7.72108C15.7089 8.21164 13.9292 8.5 12 8.5C10.0708 8.5 8.29107 8.21164 6.96654 7.72108C6.62039 7.59287 6.29445 7.44688 6 7.28202V9.75C6 9.79993 6.02476 9.94015 6.27454 10.1589C6.52284 10.3763 6.92537 10.6063 7.48751 10.8145C8.60601 11.2287 10.2013 11.5 12 11.5C13.7987 11.5 15.394 11.2287 16.5125 10.8145C17.0746 10.6063 17.4772 10.3763 17.7255 10.1589C17.9752 9.94015 18 9.79993 18 9.75ZM6 11.782C6.29445 11.9469 6.62039 12.0929 6.96654 12.2211C8.29107 12.7116 10.0708 13 12 13C13.9292 13 15.7089 12.7116 17.0335 12.2211C17.3796 12.0929 17.7055 11.9469 18 11.782V14.25C18 14.2999 17.9752 14.4402 17.7255 14.6589C17.4772 14.8763 17.0746 15.1063 16.5125 15.3145C15.394 15.7287 13.7987 16 12 16C10.2013 16 8.60601 15.7287 7.48751 15.3145C6.92537 15.1063 6.52284 14.8763 6.27454 14.6589C6.02476 14.4402 6 14.2999 6 14.25V11.782ZM6 18.75V16.282C6.29445 16.4469 6.62039 16.5929 6.96654 16.7211C8.29107 17.2116 10.0708 17.5 12 17.5C13.9292 17.5 15.7089 17.2116 17.0335 16.7211C17.3796 16.5929 17.7055 16.4469 18 16.282V18.75C18 18.7999 17.9752 18.9401 17.7255 19.1589C17.4772 19.3763 17.0746 19.6063 16.5125 19.8145C15.394 20.2287 13.7987 20.5 12 20.5C10.2013 20.5 8.60601 20.2287 7.48751 19.8145C6.92537 19.6063 6.52284 19.3763 6.27454 19.1589C6.02476 18.9401 6 18.7999 6 18.75Z'
					fill='currentColor'
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
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M6.38688 7.48329C6.45702 4.44302 8.94354 2 12.0007 2C15.0578 2 17.5444 4.44308 17.6144 7.48338C19.1767 7.60666 20.527 8.48325 21.3022 9.74999H19.3543C18.7838 9.26268 18.0434 8.96844 17.2343 8.96844H16.866C16.4518 8.96844 16.116 8.63266 16.116 8.21844V7.6153C16.116 5.34248 14.2735 3.5 12.0007 3.5C9.72784 3.5 7.88536 5.34248 7.88536 7.6153V8.21844C7.88536 8.63266 7.54957 8.96844 7.13536 8.96844H6.76578C4.96214 8.96844 3.5 10.4306 3.5 12.2342C3.5 14.0379 4.96214 15.5 6.76577 15.5H9.75V17H6.76577C4.13371 17 2 14.8663 2 12.2342C2 9.72969 3.93195 7.67638 6.38688 7.48329Z'
					fill='currentColor'
				/>
				<path
					d='M20.6554 12C20.6554 12.4142 20.3196 12.75 19.9054 12.75L13.3445 12.75C12.9303 12.75 12.5945 12.4142 12.5945 12C12.5945 11.5858 12.9303 11.25 13.3445 11.25H19.9054C20.3196 11.25 20.6554 11.5858 20.6554 12Z'
					fill='currentColor'
				/>
				<path
					d='M16.0976 14.4664C16.3904 14.1738 16.865 14.1738 17.1578 14.4665L19.3759 16.6831C19.6688 16.9759 19.669 17.4508 19.3762 17.7438C19.0834 18.0368 18.6085 18.0369 18.3155 17.7441L17.3776 16.8068L17.3776 21.251C17.3776 21.6652 17.0418 22.001 16.6276 22.001C16.2134 22.001 15.8776 21.6652 15.8776 21.251L15.8776 16.8067L14.9396 17.7441C14.6466 18.0369 14.1717 18.0368 13.8789 17.7438C13.5861 17.4508 13.5863 16.9759 13.8793 16.6831L16.0976 14.4664Z'
					fill='currentColor'
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
