import Image from 'next/image';
import Avatar from '@/app/images/avatar.jpeg';

export default function AboutSection() {
	return (
		<section id='about' className='py-16 bg-gray-100 dark:bg-gray-900'>
			<div className='container mx-auto px-6 md:px-12'>
				<h2 className='mb-10 text-4xl font-bold text-center font-garamond text-gray-800 dark:text-gray-200'>
					About Me
				</h2>
				<div className='flex flex-col items-center justify-center md:flex-row md:items-start space-y-10 md:space-y-0 md:space-x-12'>
					<div className='w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden shadow-lg'>
						<Image
							src={Avatar}
							alt='avatar'
							className='object-cover w-full h-full'
							width={240}
							height={240}
						/>
					</div>
					<div className='max-w-4xl space-y-6 text-center md:text-left'>
						<p className='text-xl leading-relaxed font-semibold text-gray-700 dark:text-gray-300 '>
							Hi there! 👋 I&apos;m a Full Stack Developer from India with over
							1 year of experience in web development. I have a passion for
							solving complex problems and building innovative web applications.
							<br />
							<br />
							My tech stack includes JavaScript, TypeScript, React, Node.js,
							Express.js, MongoDB, Prisma, PostgreSQL, Vercel, Next.js, and
							more.
							<br />
							<br />
							<strong>Interests:</strong> Gaming 🎮, Music 🎧, and Coding 💻.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
