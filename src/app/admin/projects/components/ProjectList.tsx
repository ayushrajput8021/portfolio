'use client';

import type { Project } from '@/app/components/sections/ProjectSection';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Pencil, Trash2, RefreshCw, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectListProps {
	projects: Project[];
	onEdit: (project: Project) => void;
	onDelete: (title: string) => void;
	onRefresh: () => void;
}

export default function ProjectList({
	projects,
	onEdit,
	onDelete,
	onRefresh,
}: ProjectListProps) {
	const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
			<div className='p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
					All Projects ({projects.length})
				</h2>
				<Button
					onClick={onRefresh}
					variant='outline'
					size='sm'
					className='border-gray-300 dark:border-gray-700'
				>
					<RefreshCw className='w-4 h-4 mr-2' />
					Refresh
				</Button>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
					<thead className='bg-gray-50 dark:bg-gray-700'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Preview
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Title
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Type
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Priority
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Featured
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Visible
							</th>
							<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
						{sortedProjects.length === 0 ? (
							<tr>
								<td
									colSpan={8}
									className='px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400'
								>
									No projects found. Add your first project to get started.
								</td>
							</tr>
						) : (
							sortedProjects.map((project) => (
								<tr
									key={project.title}
									className='hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
								>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900'>
											{project.image[0] && (
												<Image
													src={project.image[0]}
													alt={project.title}
													fill
													className='object-cover'
												/>
											)}
										</div>
									</td>
									<td className='px-6 py-4'>
										<div className='flex flex-col'>
											<div className='text-sm font-medium text-gray-900 dark:text-white'>
												{project.title}
											</div>
											<div className='text-xs text-gray-500 dark:text-gray-400 line-clamp-1'>
												{project.description}
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<Badge
											variant='outline'
											className='text-xs border-gray-300 dark:border-gray-600'
										>
											{project.type}
										</Badge>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<Badge
											className={`text-xs ${
												project.status === 'live'
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
													: project.status === 'building'
													? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
													: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
											}`}
										>
											{project.status || 'N/A'}
										</Badge>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
										{project.priority}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<Badge
											className={`text-xs ${
												project.isFeatured
													? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
													: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
											}`}
										>
											{project.isFeatured ? 'Yes' : 'No'}
										</Badge>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<Badge
											className={`text-xs ${
												project.wantToShow
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
													: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
											}`}
										>
											{project.wantToShow ? 'Yes' : 'No'}
										</Badge>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
										<div className='flex justify-end gap-2'>
											{project.url && (
												<a
													href={project.url}
													target='_blank'
													rel='noopener noreferrer'
													className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
												>
													<ExternalLink className='w-4 h-4' />
												</a>
											)}
											<button
												onClick={() => onEdit(project)}
												className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
											>
												<Pencil className='w-4 h-4' />
											</button>
											<button
												onClick={() => onDelete(project.title)}
												className='text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-100'
											>
												<Trash2 className='w-4 h-4' />
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}