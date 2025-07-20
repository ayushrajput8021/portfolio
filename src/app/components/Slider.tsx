import { motion } from 'framer-motion';

type props = {
	children: React.ReactNode;
};

export default function Slide({ children }: props) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				translateX: '-2rem', // Changed from -15vw to -2rem for better mobile support
			}}
			whileInView={{
				opacity: 1,
				translateX: 0,
			}}
			transition={{ duration: 0.6, ease: 'easeOut' }} // Slightly longer duration with easeOut
			viewport={{ once: true, amount: 0.15 }} // Reduced amount threshold for better mobile triggering
		>
			{children}
		</motion.div>
	);
}
