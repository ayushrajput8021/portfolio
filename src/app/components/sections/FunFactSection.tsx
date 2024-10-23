export default function FunFactSection() {
	return (
		<section id='about' className='py-5 bg-gray-100 section dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center p-6'>
				<h2 className='mb-10 text-4xl font-bold text-center font-garamond text-gray-800 dark:text-gray-200'>
					Fun Fact
				</h2>
				<p className='text-center max-w-7xl text-xl about-text  md:text-left'>
					All the projects on this website are hosted self-hosted on Virtual
					Machine(EC2) on AWS. The websites is deployed on Vercel. Also database
					is hosted on the same VM using docker containers. Nginx is used as a
					reverse proxy server. The website is secured using SSL certificate
					from CertBot and the domain is registered on dot name. Vercel domains
					is mapped to the domain using CNAME record.
				</p>
			</div>
		</section>
	);
}
