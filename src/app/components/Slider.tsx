import { motion } from 'framer-motion';

type props = {
	children: React.ReactNode;
};

export default function Slide({ children }: props) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				translateX: '-15vw', // Use viewport width units - responsive to screen size
			}}
			whileInView={{
				opacity: 1,
				translateX: 0,
			}}
			transition={{ duration: 0.5 }}
			viewport={{ once: true, amount: 0.25 }}
		>
			{children}
		</motion.div>
	);
}
