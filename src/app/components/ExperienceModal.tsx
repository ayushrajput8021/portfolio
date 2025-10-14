'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Experience {
	name: string;
	timeline: string;
	type: string;
	location: string;
	description: string;
	subDescriptions: string[];
}

interface ExperienceModalProps {
	isOpen: boolean;
	onClose: () => void;
	experiences: Experience[];
}

export default function ExperienceModal({
	isOpen,
	onClose,
	experiences,
}: ExperienceModalProps) {
	const [expandedItems, setExpandedItems] = useState<number[]>([0]);
	const { theme } = useTheme();

	const toggleExpanded = (index: number) => {
		setExpandedItems((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className='fixed inset-4 md:inset-8 lg:inset-16 z-50 
                       bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl
                       overflow-hidden flex flex-col'
					>
						{/* Header */}
						<div
							className='flex items-center justify-between p-6 border-b 
                            border-gray-200 dark:border-gray-800'
						>
							<h2
								className='text-2xl md:text-3xl font-bold 
                             text-gray-900 dark:text-gray-100'
							>
								My Experience
							</h2>
							<button
								onClick={onClose}
								className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                           transition-colors duration-200'
							>
								<X className='w-6 h-6 text-gray-600 dark:text-gray-400' />
							</button>
						</div>

						{/* Content - Scrollable */}
						<div className='flex-1 overflow-y-auto p-6'>
							<div className='max-w-4xl mx-auto'>
								{/* Timeline */}
								<div className='relative'>
									{/* Vertical Line */}
									<div
										className='absolute left-6 top-0 w-1 h-full 
                                  bg-gray-300 dark:bg-gray-700'
									/>

									{experiences.map((exp, index) => (
										<div key={index} className='relative mb-4 group'>
											{/* Timeline Dot */}
											<div
												className={`absolute left-6 w-4 h-4 rounded-full
                                      ${
																				theme === 'light'
																					? 'bg-blue-600 group-hover:bg-blue-700'
																					: 'bg-blue-400 group-hover:bg-blue-500'
																			}
                                      transform -translate-x-1/2 translate-y-6 z-10
                                      transition-colors duration-300`}
											/>

											{/* Experience Card */}
											<button
												onClick={() => toggleExpanded(index)}
												className='ml-12 bg-gray-50 dark:bg-[#101010] rounded-xl
                                   border border-gray-200 dark:border-gray-800
                                   shadow-sm hover:shadow-md
                                   transition-all duration-300 w-full p-6 text-left
                                   focus:outline-none focus:ring-2 focus:ring-blue-500'
											>
												<div className='flex justify-between items-start mb-4'>
													<div className='flex-1'>
														<h3
															className='text-xl font-bold text-gray-900 
                                           dark:text-gray-100 mb-3'
														>
															{exp.name}
														</h3>
														<div className='flex flex-wrap gap-2'>
															<span
																className={`px-3 py-1 rounded-full text-xs font-medium
                                               ${
																								exp.type === 'Freelance'
																									? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300 border dark:border-green-800'
																									: exp.type === 'Personal Project'
																										? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300 border dark:border-purple-800'
																										: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border dark:border-gray-700'
																							}`}
															>
																{exp.type}
															</span>
															<span
																className='px-3 py-1 rounded-full text-xs font-medium
                                               bg-blue-100 dark:bg-blue-900/50 
                                               text-blue-600 dark:text-blue-300
                                               border dark:border-blue-800'
															>
																{exp.location}
															</span>
														</div>
													</div>
													<div className='flex flex-col items-end ml-4'>
														<span
															className={`px-3 py-1 rounded-full text-sm font-medium mb-2
                                             ${
																							theme === 'light'
																								? 'bg-gray-100 text-gray-700'
																								: 'bg-gray-800 text-gray-300 border border-gray-700'
																						}`}
														>
															{exp.timeline}
														</span>
														<svg
															className={`w-5 h-5 transition-transform duration-300 
                                             ${expandedItems.includes(index) ? 'rotate-180' : ''}
                                             ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}
															fill='none'
															stroke='currentColor'
															viewBox='0 0 24 24'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M19 9l-7 7-7-7'
															/>
														</svg>
													</div>
												</div>

												{/* Collapsible Content */}
												<div
													className={`overflow-hidden transition-all duration-500 ease-in-out ${
														expandedItems.includes(index)
															? 'max-h-96 opacity-100'
															: 'max-h-0 opacity-0'
													}`}
												>
													<div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
														<p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
															{exp.description}
														</p>
														<ul
															className='list-disc pl-5 text-gray-600 dark:text-gray-400 
                                           text-sm space-y-2'
														>
															{exp.subDescriptions.map((subDesc, subIndex) => (
																<li key={subIndex}>
																	<span className='font-medium text-gray-700 dark:text-gray-300'>
																		{subDesc.split(':')[0]}:
																	</span>
																	<span className='ml-1'>
																		{subDesc.split(':').slice(1).join(':')}
																	</span>
																</li>
															))}
														</ul>
													</div>
												</div>
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}