'use client';

import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';
import { useState } from 'react';

// Platform-specific button styling function
export const getLinkButtonStyles = (platform: string) => {
	const styles = {
		container: '',
		icon: '',
		text: '',
	};

	switch (platform) {
		case 'GitHub':
			styles.container =
				'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-800 dark:hover:border-gray-300';
			styles.icon =
				'text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white';
			styles.text =
				'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white';
			break;
		case 'LinkedIn':
		case 'Gmail':
		case 'Twitter':
		case 'Upwork':
		case 'Resume':
			styles.container =
				'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600';
			styles.icon =
				'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100';
			styles.text =
				'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white';
			break;
		default:
			styles.container =
				'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800';
			styles.icon =
				'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200';
			styles.text =
				'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white';
	}

	return styles;
};

export default function ContactSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.CONTACT });
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string;
	}>({ type: null, message: '' });

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: '' });

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				setSubmitStatus({
					type: 'success',
					message: "Message sent successfully! I'll get back to you soon.",
				});
				// Reset form
				setFormData({ name: '', email: '', message: '' });
			} else {
				setSubmitStatus({
					type: 'error',
					message: result.error || 'Failed to send message. Please try again.',
				});
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitStatus({
				type: 'error',
				message: 'Network error. Please try again later.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section
			id='contact'
			ref={sectionRef}
			className='py-12'
		>
			<div className='container mx-auto px-4 md:px-8 max-w-2xl'>
				<div className='text-center mb-8'>
					<h2
						className='text-2xl md:text-3xl font-bold mb-2
                     text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-50
                     transition-colors duration-300'
					>
						Get In Touch
					</h2>
					<p className='text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto'>
						Have a project in mind or want to collaborate? Drop me a message and
						I&apos;ll get back to you soon!
					</p>
				</div>

				<div className='max-w-xl mx-auto'>
					{/* Centered Contact Form */}
					<div className='bg-white dark:bg-[#101010] rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-md hover:shadow-lg transition-all duration-300 p-6'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-gray-100 mb-4'>
							Send me a message
						</h3>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label
									htmlFor='name'
									className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5'
								>
									Name
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									required
									className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg
									         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
									         focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-transparent
									         transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600'
									placeholder='Your Name'
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5'
								>
									Email
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									required
									className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg
									         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
									         focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-transparent
									         transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600'
									placeholder='your.email@example.com'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5'
								>
									Message
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={4}
									className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg
									         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
									         focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-transparent
									         transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600
									         resize-vertical'
									placeholder='Your message...'
								/>
							</div>

							{submitStatus.type && (
								<div
									className={`p-3 rounded-lg text-xs font-medium ${
										submitStatus.type === 'success'
											? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700'
											: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700'
									}`}
								>
									{submitStatus.message}
								</div>
							)}

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white
								         text-white dark:text-black font-semibold py-2.5 px-6 rounded-lg text-sm
								         transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
								         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
							>
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</button>
						</form>

						{/* Social Links Note */}
						<p className='text-center mt-4 text-xs text-gray-500 dark:text-gray-400'>
							Or connect with me on social media{' '}
							<span className='font-medium'>(links in footer below)</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
