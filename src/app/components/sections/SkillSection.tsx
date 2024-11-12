'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';

// Importing components
import OrbitingCircles from '@/components/ui/orbiting-circles';

// Importing images

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

export default function SkillsSection() {
  const [frontendRadius, setFrontendRadius] = React.useState(300);
  const [backendRadius, setBackendRadius] = React.useState(120);
  const [databaseRadius, setDatabaseRadius] = React.useState(180);
  const [devopsRadius, setDevopsRadius] = React.useState(240);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setFrontendRadius(150);
        setBackendRadius(60);
        setDatabaseRadius(90);
        setDevopsRadius(120);
      } else if (window.innerWidth < 1024) {
        setFrontendRadius(225);
        setBackendRadius(90);
        setDatabaseRadius(135);
        setDevopsRadius(180);
      } else {
        setFrontendRadius(300);
        setBackendRadius(120);
        setDatabaseRadius(180);
        setDevopsRadius(240);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
	return (
		<section id='skills' className='py-20 section'>
			<div className='container px-8 mx-auto sm:px-16'>
				<h2 className='mb-12 text-3xl font-bold text-center font-space-mono'>
					What I fiddle with....
				</h2>
				<div className='relative flex h-[500px] sm:h-[600px] lg:h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl'>
					<span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-black'>
						Technologies
					</span>

					{/* Orbiting circles with responsive sizes */}
					{/* Backend icons */}
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={0}
						radius={backendRadius}
					>
						<Image src={NodeIcon} alt='Node.js' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={6.66}
						radius={backendRadius}
					>
						<Image src={ExpressIcon} alt='Express' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={13.12}
						radius={backendRadius}
					>
						<Image src={FlaskIcon} alt='Flask' width={50} height={50} />
					</OrbitingCircles>

					{/* Database icons */}
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={5}
						radius={databaseRadius}
						reverse
					>
						<Image src={MongodbIcon} alt='MongoDB' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={10}
						radius={databaseRadius}
						reverse
					>
						<Image
							src={PostgresqlIcon}
							alt='PostgresSQL'
							width={50}
							height={50}
						/>
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={15}
						radius={databaseRadius}
						reverse
					>
						<Image src={MysqlIcon} alt='Mysql' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={20}
						radius={databaseRadius}
						reverse
					>
						<Image src={RedisIcon} alt='Redis' width={50} height={50} />
					</OrbitingCircles>

					{/* DevOps icons */}
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={5}
						radius={devopsRadius}
					>
						<Image src={AwsIcon} alt='AWS' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={10}
						radius={devopsRadius}
					>
						<Image src={NginxIcon} alt='Nginx' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={15}
						radius={devopsRadius}
					>
						<Image src={VercelIcon} alt='Vercel' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={20}
						radius={devopsRadius}
					>
						<Image src={DockerIcon} alt='Docker' width={50} height={50} />
					</OrbitingCircles>

					{/* Frontend icons */}
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={0}
						radius={frontendRadius}
						reverse
					>
						<Image src={ReactIcon} alt='React' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={3.33}
						radius={frontendRadius}
						reverse
					>
						<Image src={NextIcon} alt='Next.js' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={6.66}
						radius={frontendRadius}
						reverse
					>
						<Image
							src={TailwindIcon}
							alt='TailwindCSS'
							width={50}
							height={50}
						/>
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={10}
						radius={frontendRadius}
						reverse
					>
						<Image src={ReduxIcon} alt='Redux' width={50} height={50} />
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={13.33}
						radius={frontendRadius}
						reverse
					>
						<Image
							src={TypescriptIcon}
							alt='Typescript'
							width={50}
							height={50}
						/>
					</OrbitingCircles>
					<OrbitingCircles
						className='size-[30px] sm:size-[40px] lg:size-[50px] border-none bg-transparent'
						duration={20}
						delay={16.66}
						radius={frontendRadius}
						reverse
					>
						<Image
							src={JavascriptIcon}
							alt='Javascript'
							width={50}
							height={50}
						/>
					</OrbitingCircles>
				</div>
			</div>
		</section>
	);
}
