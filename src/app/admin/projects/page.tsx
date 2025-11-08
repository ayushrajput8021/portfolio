'use client';

import { useState, useEffect, useCallback } from 'react';
import { account } from '@/app/services/appwrite';
import { AppwriteException } from 'appwrite';
import type { Project } from '@/app/components/sections/ProjectSection';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProjectsManagementPage() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loginError, setLoginError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<Project[]>([]);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [editingProject, setEditingProject] = useState<Project | null>(null);
	const [sessionToken, setSessionToken] = useState<string>('');
	const [debugInfo, setDebugInfo] = useState<string>('');

	// Fetch projects
	const fetchProjects = useCallback(
		async (token?: string) => {
			try {
				const tokenToUse = token || sessionToken;
				console.log(
					'fetchProjects called with token:',
					tokenToUse ? 'present' : 'missing'
				);
				setDebugInfo(
					`Fetching with token: ${tokenToUse ? 'present' : 'missing'}`
				);

				const headers: Record<string, string> = {};
				if (tokenToUse) {
					headers['Authorization'] = `Bearer ${tokenToUse}`;
					console.log('Authorization header set');
				} else {
					console.warn('No token available for authorization');
				}

				const response = await fetch('/api/projects/admin', {
					headers,
				});

				console.log('Admin API response status:', response.status);

				if (!response.ok) {
					const errorData = await response.json();
					console.error('Error fetching projects:', errorData.error);
					setDebugInfo(`Error: ${errorData.error} (${response.status})`);
					if (response.status === 401) {
						setIsLoggedIn(false);
					}
					return;
				}

				const data = await response.json();
				console.log(
					'Projects fetched successfully:',
					data.projects?.length || 0
				);
				setDebugInfo(`Loaded ${data.projects?.length || 0} projects`);
				setProjects(data.projects || []);
			} catch (error) {
				console.error('Error fetching projects:', error);
				setDebugInfo(`Network error: ${error}`);
			}
		},
		[sessionToken]
	);

	// Check existing session on mount
	useEffect(() => {
		const checkSession = async () => {
			setIsLoading(true);
			try {
				await account.get();
				setIsLoggedIn(true);
				// Get session token for API calls
				const currentSession = await account.getSession('current');
				setSessionToken(currentSession.$id);
				fetchProjects();
			} catch {
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		};
		checkSession();
	}, [fetchProjects]);

	// Login handler
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setLoginError(null);
		try {
			try {
				await account.getSession('current');
				await account.deleteSession('current');
			} catch {
				// No session existed
			}

			await account.createEmailPasswordSession(email, password);
			const currentSession = await account.getSession('current');
			const sessionId = currentSession.$id;

			console.log('Login successful, session ID:', sessionId);

			// Store session in Redis for server-side validation
			try {
				const storeResponse = await fetch('/api/auth/store-session', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						sessionId,
						email,
					}),
				});

				if (!storeResponse.ok) {
					console.warn('Failed to store session in Redis');
				} else {
					console.log('Session stored in Redis');
				}
			} catch (storageError) {
				console.error('Error storing session:', storageError);
			}

			setSessionToken(sessionId);
			setIsLoggedIn(true);
			setDebugInfo('Logged in successfully');
			// Pass the new token to fetchProjects
			fetchProjects(sessionId);
		} catch (error) {
			setIsLoggedIn(false);
			if (error instanceof AppwriteException) {
				setLoginError(error.message);
			} else {
				setLoginError('An unknown error occurred during login.');
			}
			console.error('Login failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Logout handler
	const handleLogout = async () => {
		setIsLoading(true);
		try {
			// Get the session token before it's cleared
			const tokenToDelete = sessionToken;

			await account.deleteSession('current');

			// Remove session from Redis
			if (tokenToDelete) {
				try {
					await fetch('/api/auth/remove-session', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							sessionId: tokenToDelete,
						}),
					});
				} catch (error) {
					console.error('Error removing session from Redis:', error);
				}
			}

			setIsLoggedIn(false);
			setProjects([]);
			setEmail('');
			setPassword('');
			setLoginError(null);
			setSessionToken('');
			setDebugInfo('Logged out');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle edit
	const handleEdit = (project: Project) => {
		setEditingProject(project);
		setShowForm(true);
	};

	// Handle delete
	const handleDelete = async (title: string) => {
		if (!confirm('Are you sure you want to delete this project?')) {
			return;
		}

		try {
			const response = await fetch(
				`/api/projects/${encodeURIComponent(title)}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${sessionToken}`,
					},
				}
			);

			if (response.ok) {
				fetchProjects();
			} else {
				const data = await response.json();
				alert(`Error: ${data.error}`);
			}
		} catch (error) {
			console.error('Error deleting project:', error);
			alert('Failed to delete project');
		}
	};

	// Handle form close
	const handleFormClose = () => {
		setShowForm(false);
		setEditingProject(null);
	};

	// Handle form success
	const handleFormSuccess = () => {
		setShowForm(false);
		setEditingProject(null);
		fetchProjects();
	};

	if (!isLoggedIn) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8'>
				<div className='max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
					<h1 className='text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white'>
						Project Management Login
					</h1>
					<form onSubmit={handleLogin}>
						<div className='mb-4'>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white'
								placeholder='admin@example.com'
							/>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
							>
								Password
							</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white'
								placeholder='Password'
							/>
						</div>

						{loginError && (
							<p className='mb-4 text-center text-sm text-red-600 dark:text-red-400'>
								{loginError}
							</p>
						)}

						<Button
							type='submit'
							disabled={isLoading}
							className='w-full bg-gray-900 hover:bg-black text-white dark:bg-gray-100 dark:text-black dark:hover:bg-white'
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-900 p-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex justify-between items-center mb-8'>
					<div>
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
							Project Management
						</h1>
						<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
							{debugInfo}
						</p>
					</div>
					<div className='flex gap-4'>
						<Button
							onClick={() => setShowForm(true)}
							className='bg-gray-900 hover:bg-black text-white dark:bg-gray-100 dark:text-black dark:hover:bg-white'
						>
							<Plus className='w-4 h-4 mr-2' />
							Add Project
						</Button>
						<Button
							onClick={handleLogout}
							variant='outline'
							className='border-gray-300 dark:border-gray-700'
						>
							Logout
						</Button>
					</div>
				</div>

				{showForm ? (
					<ProjectForm
						project={editingProject}
						onClose={handleFormClose}
						onSuccess={handleFormSuccess}
						sessionToken={sessionToken}
					/>
				) : (
					<ProjectList
						projects={projects}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onRefresh={fetchProjects}
					/>
				)}
			</div>
		</div>
	);
}
