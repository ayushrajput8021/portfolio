'use client';
import {
	GITHUB_URL,
	LINKEDIN_URL,
	GMAIL_URL,
	RESUME_URL,
	TWITTER_URL,
	UPWORK_URL,
} from '@/app/utils/constants';
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';

export default function LinksSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.LINKS });
	const links = [
		{
			href: GITHUB_URL,
			icon: ItemIcons.github,
			title: 'GitHub',
			label: 'GitHub',
		},
		{
			href: LINKEDIN_URL,
			icon: ItemIcons.linkedin,
			title: 'LinkedIn',
			label: 'LinkedIn',
		},
		{
			href: GMAIL_URL,
			icon: ItemIcons.gmail,
			title: 'Gmail',
			label: 'Gmail',
		},
		{
			href: TWITTER_URL,
			icon: ItemIcons.twitter,
			title: 'Twitter',
			label: 'Twitter',
		},
		{
			href: UPWORK_URL,
			icon: ItemIcons.upwork,
			title: 'Upwork',
			label: 'Upwork',
		},
		{
			href: RESUME_URL,
			icon: ItemIcons.file,
			title: 'Resume',
			label: 'Resume',
		},
	];

	return (
		<section
			id='links'
			ref={sectionRef}
			className='py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-300'
		>
			<div className='flex flex-col items-center justify-center gap-12 px-4 max-w-4xl mx-auto'>
				<h2
					className='text-3xl md:text-4xl font-semibold text-center font-space-mono
                     text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-50
                     transition-colors duration-300'
				>
					Connect With Me
				</h2>
				<nav className='grid sm:grid-cols-2 grid-cols-2 md:grid-cols-3 gap-4 w-10%'>
					{links.map((link, index) => (
						<a
							key={index}
							href={link.title === 'Gmail' ? `mailto:${link.href}` : link.href}
							className='group flex items-center gap-3 p-4 rounded-xl
                   bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                       shadow-sm hover:shadow-lg hover:-translate-y-1
                       transition-all duration-300 transform'
							target='_blank'
							rel='noopener noreferrer'
						>
							<span className='flex-shrink-0'>{link.icon}</span>
							<span
								className='text-lg font-medium text-gray-700 dark:text-gray-300
                          group-hover:text-transparent bg-clip-text bg-gradient-to-r
                          from-blue-600 to-purple-600 transition-all duration-300'
							>
								{link.label}
							</span>
						</a>
					))}
				</nav>
			</div>
		</section>
	);
}

const ItemIcons = {
	twitter: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 128 128'
			className='w-6 h-6'
			fill='currentColor'
		>
			<path d='M114.896 37.888c.078 1.129.078 2.257.078 3.396 0 34.7-26.417 74.72-74.72 74.72v-.02A74.343 74.343 0 0 1 0 104.21c2.075.25 4.16.375 6.25.38a52.732 52.732 0 0 0 32.615-11.263A26.294 26.294 0 0 1 14.331 75.09c3.937.76 7.993.603 11.857-.453-12.252-2.475-21.066-13.239-21.066-25.74v-.333a26.094 26.094 0 0 0 11.919 3.287C5.5 44.139 1.945 28.788 8.913 16.787a74.535 74.535 0 0 0 54.122 27.435 26.277 26.277 0 0 1 7.598-25.09c10.577-9.943 27.212-9.433 37.154 1.139a52.696 52.696 0 0 0 16.677-6.376A26.359 26.359 0 0 1 112.92 28.42 52.227 52.227 0 0 0 128 24.285a53.35 53.35 0 0 1-13.104 13.603z' />
		</svg>
	),
	github: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 128 128'
			className='w-6 h-6'
			fill='currentColor'
		>
			<g fillRule='evenodd' clipRule='evenodd'>
				<path d='M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z' />
				<path d='M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0' />
			</g>
		</svg>
	),
	upwork: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 641 512'
			className='w-6 h-6'
			fill='currentColor'
		>
			<path d='M494.7 295.6c-50.3 0-83.5-38.9-92.8-53.9c11.9-95.3 46.8-125.4 92.8-125.4c45.5 0 80.9 36.4 80.9 89.7s-35.4 89.7-80.9 89.7zm0-237.8c-81.9 0-127.8 53.4-141 108.4c-14.9-28-25.9-65.5-34.5-100.3H206v141c0 51.1-23.3 89-68.8 89s-71.6-37.8-71.6-89l.5-141H.8v141c0 41.1 13.3 78.4 37.6 105.1c25 27.5 59.2 41.8 98.8 41.8c78.8 0 133.8-60.4 133.8-146.9V112.1c8.2 31.2 27.8 91.1 65.3 143.6l-35 199.4h66.4l23.1-141.3c7.6 6.3 15.7 12 24.2 17c22.2 14 47.7 21.9 73.9 22.8c0 0 4 .2 6.1 .2c81.2 0 145.9-62.9 145.9-147.8s-64.8-148.1-146-148.1z' />
		</svg>
	),
	linkedin: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			className='w-6 h-6'
			fill='currentColor'
		>
			<path d='M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z' />
		</svg>
	),
	gmail: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
			className='w-6 h-6'
			fill='currentColor'
		>
			<path d='M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z' />
		</svg>
	),
	file: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
			className='w-6 h-6'
			fill='currentColor'
		>
			<path d='M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16' />
		</svg>
	),
};
