import Image from 'next/image';
import React from 'react';
import { Tooltip } from 'react-tooltip';

export default function SkillsSection() {
	return (
		<section id='skills' className='py-20 section'>
			<div className='container px-8 mx-auto sm:px-16'>
				<h2 className='mb-12 text-3xl font-bold text-center font-space-mono'>
					What I fiddle with....
				</h2>
				<div className='grid grid-cols-3 gap-10 sm:grid-cols-4 lg:grid-cols-8 justify-items-center'>
					{[
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/javascript.svg',
							alt: 'JavaScript',
							title: 'JavaScript',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/typescript.svg',
							alt: 'TypeScript',
							title: 'TypeScript',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/react.svg',
							alt: 'React',
							title: 'React',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nodedotjs.svg',
							alt: 'Node.js',
							title: 'Node.js',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/express.svg',
							alt: 'Express',
							title: 'Express.js',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg',
							alt: 'MongoDB',
							title: 'MongoDB',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/prisma.svg',
							alt: 'Prisma',
							title: 'Prisma',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/postgresql.svg',
							alt: 'PostgreSQL',
							title: 'PostgreSQL',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vercel.svg',
							alt: 'Vercel',
							title: 'Vercel',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nextdotjs.svg',
							alt: 'Next.js',
							title: 'Next.js',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/redux.svg',
							alt: 'Redux',
							title: 'Redux',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nginx.svg',
							alt: 'Nginx',
							title: 'Nginx',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/supabase.svg',
							alt: 'Supabase',
							title: 'Supabase',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg',
							alt: 'GitHub',
							title: 'GitHub',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tailwindcss.svg',
							alt: 'Tailwind CSS',
							title: 'Tailwind CSS',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/docker.svg',
							alt: 'Docker',
							title: 'Docker',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/postman.svg',
							alt: 'Postman',
							title: 'Postman',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/amazonwebservices.svg',
							alt: 'AWS',
							title: 'Amazon Web Services',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/redis.svg',
							alt: 'Redis',
							title: 'Redis',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/zod.svg',
							alt: 'Zod',
							title: 'Zod',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/flask.svg',
							alt: 'Flask',
							title: 'Flask',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/cplusplus.svg',
							alt: 'C++',
							title: 'C++ Programming Language',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linux.svg',
							alt: 'Linux',
							title: 'Linux',
							id: crypto.randomUUID(),
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/python.svg',
							alt: 'Python',
							title: 'Python',
							id: crypto.randomUUID(),
						},
					].map((icon) => (
						<React.Fragment key={icon.id}>
							<Image
								data-tooltip-id='my-tooltip'
								data-tooltip-content={icon.alt}
								data-tooltip-place='top'
								width={50}
								height={50}
								src={icon.src}
								alt={icon.alt}
								className='w-[64px] h-[64px] [transition:filter_0.1s_ease,_transform_0.2s_ease] filter invert-[0.4] hover:filter hover:invert hover:scale-150 '
							/>
							<Tooltip id='my-tooltip' />
						</React.Fragment>
					))}
				</div>
			</div>
		</section>
	);
}
