'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/app/components/sections/ProjectSection';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select';
import { X, Upload, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface ProjectFormProps {
	project: Project | null;
	onClose: () => void;
	onSuccess: () => void;
	sessionToken: string;
}

export default function ProjectForm({
	project,
	onClose,
	onSuccess,
	sessionToken,
}: ProjectFormProps) {
	const [formData, setFormData] = useState<Project>({
		title: '',
		description: '',
		url: '',
		githubUrl: '',
		image: [],
		tech: [],
		isVertical: false,
		priority: 1,
		type: 'Full Stack Projects',
		status: 'live',
		isFeatured: false,
		wantToShow: true,
	});
	const [techInput, setTechInput] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadingImages, setUploadingImages] = useState(false);

	useEffect(() => {
		if (project) {
			setFormData(project);
		}
	}, [project]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSwitchChange = (name: string, checked: boolean) => {
		setFormData((prev) => ({ ...prev, [name]: checked }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddTech = () => {
		if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
			setFormData((prev) => ({
				...prev,
				tech: [...prev.tech, techInput.trim()],
			}));
			setTechInput('');
		}
	};

	const handleRemoveTech = (tech: string) => {
		setFormData((prev) => ({
			...prev,
			tech: prev.tech.filter((t) => t !== tech),
		}));
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		setUploadingImages(true);
		try {
			const formData = new FormData();
			Array.from(files).forEach((file) => {
				formData.append('files', file);
			});
			formData.append('folder', 'projects');

			const response = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				setFormData((prev) => ({
					...prev,
					image: [...prev.image, ...data.urls],
				}));
			} else {
				alert('Failed to upload images');
			}
		} catch (error) {
			console.error('Error uploading images:', error);
			alert('Failed to upload images');
		} finally {
			setUploadingImages(false);
		}
	};

	const handleRemoveImage = (url: string) => {
		setFormData((prev) => ({
			...prev,
			image: prev.image.filter((img) => img !== url),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const url = project
				? `/api/projects/${encodeURIComponent(project.title)}`
				: '/api/projects';
			const method = project ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionToken}`,
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				onSuccess();
			} else {
				const data = await response.json();
				alert(`Error: ${data.error}`);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('Failed to save project');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
					{project ? 'Edit Project' : 'Add New Project'}
				</h2>
				<button
					onClick={onClose}
					className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
				>
					<X className='w-6 h-6' />
				</button>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* Title */}
				<div>
					<Label htmlFor='title'>Title *</Label>
					<Input
						id='title'
						name='title'
						value={formData.title}
						onChange={handleInputChange}
						required
						disabled={!!project}
						className='mt-1'
					/>
					{project && (
						<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
							Title cannot be changed after creation
						</p>
					)}
				</div>

				{/* Description */}
				<div>
					<Label htmlFor='description'>Description *</Label>
					<Textarea
						id='description'
						name='description'
						value={formData.description}
						onChange={handleInputChange}
						required
						rows={3}
						className='mt-1'
					/>
				</div>

				{/* URLs */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<Label htmlFor='url'>Project URL *</Label>
						<Input
							id='url'
							name='url'
							type='url'
							value={formData.url}
							onChange={handleInputChange}
							required
							className='mt-1'
						/>
					</div>
					<div>
						<Label htmlFor='githubUrl'>GitHub URL</Label>
						<Input
							id='githubUrl'
							name='githubUrl'
							type='url'
							value={formData.githubUrl}
							onChange={handleInputChange}
							className='mt-1'
						/>
					</div>
				</div>

				{/* Images */}
				<div>
					<Label>Images *</Label>
					<div className='mt-2 space-y-4'>
						<div className='flex items-center gap-4'>
							<label className='cursor-pointer'>
								<div className='flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
									<Upload className='w-4 h-4' />
									<span className='text-sm'>
										{uploadingImages ? 'Uploading...' : 'Upload Images'}
									</span>
								</div>
								<input
									type='file'
									multiple
									accept='image/*'
									onChange={handleImageUpload}
									disabled={uploadingImages}
									className='hidden'
								/>
							</label>
							<span className='text-sm text-gray-500 dark:text-gray-400'>
								{formData.image.length} image(s) uploaded
							</span>
						</div>

						{formData.image.length > 0 && (
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
								{formData.image.map((url, index) => (
									<div
										key={index}
										className='relative group aspect-video rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900'
									>
										<Image
											src={url}
											alt={`Project image ${index + 1}`}
											fill
											className='object-cover'
										/>
										<button
											type='button'
											onClick={() => handleRemoveImage(url)}
											className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
										>
											<Trash2 className='w-4 h-4' />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Tech Stack */}
				<div>
					<Label htmlFor='tech'>Tech Stack *</Label>
					<div className='flex gap-2 mt-1'>
						<Input
							id='tech'
							value={techInput}
							onChange={(e) => setTechInput(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									handleAddTech();
								}
							}}
							placeholder='Add technology'
						/>
						<Button type='button' onClick={handleAddTech} variant='outline'>
							Add
						</Button>
					</div>
					<div className='flex flex-wrap gap-2 mt-2'>
						{formData.tech.map((tech) => (
							<span
								key={tech}
								className='inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm'
							>
								{tech}
								<button
									type='button'
									onClick={() => handleRemoveTech(tech)}
									className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
								>
									<X className='w-3 h-3' />
								</button>
							</span>
						))}
					</div>
				</div>

				{/* Selects and Numbers */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div>
						<Label htmlFor='type'>Project Type *</Label>
						<Select
							value={formData.type}
							onValueChange={(value) => handleSelectChange('type', value)}
						>
							<SelectTrigger className='mt-1'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='Backend Projects'>Backend Projects</SelectItem>
								<SelectItem value='Frontend Projects'>
									Frontend Projects
								</SelectItem>
								<SelectItem value='Full Stack Projects'>
									Full Stack Projects
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor='status'>Status *</Label>
						<Select
							value={formData.status}
							onValueChange={(value) => handleSelectChange('status', value)}
						>
							<SelectTrigger className='mt-1'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='live'>Live</SelectItem>
								<SelectItem value='building'>Building</SelectItem>
								<SelectItem value='completed'>Completed</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor='priority'>Priority *</Label>
						<Input
							id='priority'
							name='priority'
							type='number'
							min='1'
							value={formData.priority}
							onChange={handleInputChange}
							required
							className='mt-1'
						/>
					</div>
				</div>

				{/* Switches */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='isVertical'>Vertical Layout</Label>
						<Switch
							id='isVertical'
							checked={formData.isVertical}
							onCheckedChange={(checked) =>
								handleSwitchChange('isVertical', checked)
							}
						/>
					</div>

					<div className='flex items-center justify-between'>
						<Label htmlFor='isFeatured'>Featured</Label>
						<Switch
							id='isFeatured'
							checked={formData.isFeatured}
							onCheckedChange={(checked) =>
								handleSwitchChange('isFeatured', checked)
							}
						/>
					</div>

					<div className='flex items-center justify-between'>
						<Label htmlFor='wantToShow'>Show on Site</Label>
						<Switch
							id='wantToShow'
							checked={formData.wantToShow}
							onCheckedChange={(checked) =>
								handleSwitchChange('wantToShow', checked)
							}
						/>
					</div>
				</div>

				{/* Submit Buttons */}
				<div className='flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
					<Button type='button' variant='outline' onClick={onClose}>
						Cancel
					</Button>
					<Button
						type='submit'
						disabled={isSubmitting || uploadingImages || formData.image.length === 0}
						className='bg-gray-900 hover:bg-black text-white dark:bg-gray-100 dark:text-black dark:hover:bg-white'
					>
						{isSubmitting
							? 'Saving...'
							: project
							? 'Update Project'
							: 'Create Project'}
					</Button>
				</div>
			</form>
		</div>
	);
}
