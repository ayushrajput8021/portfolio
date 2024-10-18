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
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/typescript.svg',
							alt: 'TypeScript',
							title: 'TypeScript',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/react.svg',
							alt: 'React',
							title: 'React',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nodedotjs.svg',
							alt: 'Node.js',
							title: 'Node.js',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/express.svg',
							alt: 'Express',
							title: 'Express.js',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg',
							alt: 'MongoDB',
							title: 'MongoDB',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/prisma.svg',
							alt: 'Prisma',
							title: 'Prisma',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/postgresql.svg',
							alt: 'PostgreSQL',
							title: 'PostgreSQL',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vercel.svg',
							alt: 'Vercel',
							title: 'Vercel',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nextdotjs.svg',
							alt: 'Next.js',
							title: 'Next.js',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/redux.svg',
							alt: 'Redux',
							title: 'Redux',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nginx.svg',
							alt: 'Nginx',
							title: 'Nginx',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/supabase.svg',
							alt: 'Supabase',
							title: 'Supabase',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg',
							alt: 'GitHub',
							title: 'GitHub',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tailwindcss.svg',
							alt: 'Tailwind CSS',
							title: 'Tailwind CSS',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/docker.svg',
							alt: 'Docker',
							title: 'Docker',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/postman.svg',
							alt: 'Postman',
							title: 'Postman',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/amazonwebservices.svg',
							alt: 'AWS',
							title: 'Amazon Web Services',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/redis.svg',
							alt: 'Redis',
							title: 'Redis',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/zod.svg',
							alt: 'Zod',
							title: 'Zod',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/flask.svg',
							alt: 'Flask',
							title: 'Flask',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/cplusplus.svg',
							alt: 'C++',
							title: 'C++ Programming Language',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linux.svg',
							alt: 'Linux',
							title: 'Linux',
						},
						{
							src: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/python.svg',
							alt: 'Python',
							title: 'Python',
						},
					].map((icon, index) => (
						<>
							<img
								data-tooltip-id='my-tooltip'
								data-tooltip-content={icon.alt}
								data-tooltip-place='top'
								key={index}
								src={icon.src}
								alt={icon.alt}
								className='tech-icon'
							/>
							<Tooltip id='my-tooltip' />
						</>
					))}
				</div>
			</div>
		</section>
	);
}
