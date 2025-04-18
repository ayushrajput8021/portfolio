'use client';

import { useState, useCallback, useEffect } from 'react';
import {
	databases,
	account,
	ANALYTICS_DATABASE_ID,
	SESSIONS_COLLECTION_ID,
	SECTION_VIEWS_COLLECTION_ID,
	PROJECT_LINK_CLICKS_COLLECTION_ID,
	SectionId,
	ProjectLinkClick,
} from '@/app/services/appwrite';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Query, AppwriteException } from 'appwrite';

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

// Define the data types
interface SessionStats {
	totalSessions: number;
	averageDuration: number;
	bounceRate: number;
	averageScrollDepth: number;
}

interface SectionStats {
	sectionId: string;
	views: number;
	averageTimeSpent: number;
	isLowEngagement: boolean;
}

// New interface for Project Click Stats
interface ProjectClickStats {
	projectId: string;
	visit: number;
	github: number;
	star: number;
	fork: number;
	totalClicks: number;
}

type TimeFilter = 'all' | 'day' | 'week' | 'month' | '4hours';

// Helper function to get the start date based on the filter
const getStartDate = (filter: TimeFilter): Date | null => {
	const now = new Date();
	switch (filter) {
		case 'day':
			now.setHours(now.getHours() - 24);
			return now;
		case 'week':
			now.setDate(now.getDate() - 7);
			return now;
		case 'month':
			now.setMonth(now.getMonth() - 1);
			return now;
		case '4hours':
			now.setHours(now.getHours() - 4);
			return now;
		case 'all':
		default:
			return null;
	}
};

export default function InsightsPage() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loginError, setLoginError] = useState<string | null>(null);
	const [sessionStats, setSessionStats] = useState<SessionStats>({
		totalSessions: 0,
		averageDuration: 0,
		bounceRate: 0,
		averageScrollDepth: 0,
	});
	const [sectionStats, setSectionStats] = useState<SectionStats[]>([]);
	const [projectClickStats, setProjectClickStats] = useState<
		ProjectClickStats[]
	>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<TimeFilter>('all');

	// Define fetchData before useEffect that uses it
	const fetchData = useCallback(async (filter: TimeFilter) => {
		console.log(`Fetching data for filter: ${filter}`);
		setIsLoading(true);
		const startDate = getStartDate(filter);
		const sessionQueries: string[] = [];
		const sectionViewQueries: string[] = [];
		const clickQueries: string[] = [];

		if (startDate) {
			console.log(`Applying start date filter: ${startDate.toISOString()}`);
			sessionQueries.push(
				Query.greaterThanEqual('startedAt', startDate.toISOString())
			);
			sectionViewQueries.push(
				Query.greaterThanEqual('enterTime', startDate.toISOString())
			);
			clickQueries.push(
				Query.greaterThanEqual('clickedAt', startDate.toISOString())
			);
		} else {
			console.log('No date filter applied (All Time).');
		}

		try {
			// Fetch session data with filter
			const sessionsResponse = await databases.listDocuments(
				ANALYTICS_DATABASE_ID,
				SESSIONS_COLLECTION_ID,
				sessionQueries // Apply specific queries
			);

			// Fetch section view data with filter
			const sectionViewsResponse = await databases.listDocuments(
				ANALYTICS_DATABASE_ID,
				SECTION_VIEWS_COLLECTION_ID,
				sectionViewQueries // Apply specific queries
			);

			// Fetch project link click data with filter
			const projectClicksResponse = await databases.listDocuments(
				ANALYTICS_DATABASE_ID,
				PROJECT_LINK_CLICKS_COLLECTION_ID,
				clickQueries // Apply specific queries
			);

			console.log('Fetched sessions:', sessionsResponse.total);
			console.log('Fetched section views:', sectionViewsResponse.total);
			console.log('Fetched project clicks:', projectClicksResponse.total);

			// Process session stats
			const sessions = sessionsResponse.documents;
			const totalSessions = sessions.length;
			let totalDuration = 0;
			let totalBounces = 0;
			let totalScrollDepth = 0;
			sessions.forEach((session) => {
				if (session.totalTime) {
					totalDuration += session.totalTime;
				}
				if (session.isBounce) {
					totalBounces += 1;
				}
				totalScrollDepth += session.scrollDepth || 0;
			});
			const averageDuration =
				totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
			const bounceRate =
				totalSessions > 0
					? Math.round((totalBounces / totalSessions) * 100)
					: 0;
			const averageScrollDepth =
				totalSessions > 0 ? Math.round(totalScrollDepth / totalSessions) : 0;
			setSessionStats({
				totalSessions,
				averageDuration,
				bounceRate,
				averageScrollDepth,
			});

			// Process section stats
			const sectionViews = sectionViewsResponse.documents;
			const sectionData: Record<string, { views: number; totalTime: number }> =
				{};
			Object.values(SectionId).forEach((section) => {
				sectionData[section] = { views: 0, totalTime: 0 };
			});
			sectionViews.forEach((view) => {
				if (!sectionData[view.sectionId]) {
					sectionData[view.sectionId] = { views: 0, totalTime: 0 };
				}
				sectionData[view.sectionId].views += 1;
				sectionData[view.sectionId].totalTime += view.timeSpent || 0;
			});
			const sectionStatsArray = Object.keys(sectionData).map((sectionId) => {
				const { views, totalTime } = sectionData[sectionId];
				const averageTimeSpent = views > 0 ? Math.round(totalTime / views) : 0;
				return {
					sectionId,
					views,
					averageTimeSpent,
					isLowEngagement: averageTimeSpent < 5,
				};
			});
			sectionStatsArray.sort((a, b) => b.views - a.views);
			setSectionStats(sectionStatsArray);

			// Process project click stats
			const projectClicks = projectClicksResponse.documents;
			const clickCounts: Record<string, ProjectClickStats> = {};
			projectClicks.forEach((clickDoc) => {
				const projectId = clickDoc.projectId as string;
				const linkType = clickDoc.linkType as ProjectLinkClick['linkType'];
				if (!projectId || !linkType) {
					console.warn('Skipping click document with missing data:', clickDoc);
					return;
				}
				if (!clickCounts[projectId]) {
					clickCounts[projectId] = {
						projectId: projectId,
						visit: 0,
						github: 0,
						star: 0,
						fork: 0,
						totalClicks: 0,
					};
				}
				if (linkType in clickCounts[projectId]) {
					clickCounts[projectId][linkType]++;
					clickCounts[projectId].totalClicks++;
				} else {
					console.warn(
						`Invalid linkType encountered: ${linkType} for project ${projectId}`
					);
				}
			});
			const clickStatsArray = Object.values(clickCounts).sort(
				(a, b) => b.totalClicks - a.totalClicks
			);
			setProjectClickStats(clickStatsArray);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Check existing session on mount
	useEffect(() => {
		const checkSession = async () => {
			setIsLoading(true);
			try {
				await account.get();
				setIsLoggedIn(true);
				fetchData(selectedFilter); // Fetch data if session exists
			} catch {
				// No active session, do nothing, user will see login form
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		};
		checkSession();
	}, [fetchData, selectedFilter]); // Add fetchData and selectedFilter to dependencies

	// Login handler
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setLoginError(null);
		try {
			// Check if a session exists and delete it before creating a new one
			try {
				await account.getSession('current'); // Check if a session exists
				await account.deleteSession('current'); // Delete existing session
				console.log('Deleted existing session before login.');
			} catch {
				// No session existed, proceed to login
			}

			// Now create the new session
			await account.createEmailPasswordSession(email, password);
			setIsLoggedIn(true);
			fetchData(selectedFilter); // Fetch data after successful login
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
			await account.deleteSession('current');
			setIsLoggedIn(false);
			setSessionStats({
				totalSessions: 0,
				averageDuration: 0,
				bounceRate: 0,
				averageScrollDepth: 0,
			});
			setSectionStats([]);
			setProjectClickStats([]);
			setEmail('');
			setPassword('');
			setLoginError(null);
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Handler for changing the filter
	const handleFilterChange = (newFilter: TimeFilter) => {
		setSelectedFilter(newFilter);
		if (isLoggedIn) {
			fetchData(newFilter);
		}
	};

	// Get chart data for section views
	const getSectionViewsChartData = () => {
		return {
			labels: sectionStats.map((section) => section.sectionId),
			datasets: [
				{
					label: 'Views',
					data: sectionStats.map((section) => section.views),
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
				},
			],
		};
	};

	// Get chart data for section engagement
	const getSectionEngagementChartData = () => {
		return {
			labels: sectionStats.map((section) => section.sectionId),
			datasets: [
				{
					label: 'Average Time Spent (seconds)',
					data: sectionStats.map((section) => section.averageTimeSpent),
					backgroundColor: sectionStats.map((section) =>
						section.isLowEngagement
							? 'rgba(255, 99, 132, 0.5)'
							: 'rgba(75, 192, 192, 0.5)'
					),
				},
			],
		};
	};

	if (!isLoggedIn) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8'>
				<div className='max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
					<h1 className='text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white'>
						Admin Login
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
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
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
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='Password'
							/>
						</div>

						{loginError && (
							<p className='mb-4 text-center text-sm text-red-600 dark:text-red-400'>
								{loginError}
							</p>
						)}

						<button
							type='submit'
							disabled={isLoading}
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-900 p-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold mb-8 text-gray-900 dark:text-white'>
					Analytics Dashboard
				</h1>

				{/* Filter Buttons */}
				<div className='mb-6 flex flex-wrap gap-2 items-center'>
					<span className='text-sm font-medium text-gray-700 dark:text-gray-300 mr-2'>
						Filter by:
					</span>
					{(['all', 'day', 'week', 'month', '4hours'] as TimeFilter[]).map(
						(filter) => (
							<button
								key={filter}
								onClick={() => handleFilterChange(filter)}
								className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
									selectedFilter === filter
										? 'bg-blue-600 text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
								}`}
							>
								{filter === 'all' && 'All Time'}
								{filter === 'day' && 'Last 24h'}
								{filter === 'week' && 'Last Week'}
								{filter === 'month' && 'Last Month'}
								{filter === '4hours' && 'Last 4h'}
							</button>
						)
					)}
				</div>

				{isLoading && !isLoggedIn ? (
					<div className='flex justify-center items-center h-64'>
						<p>Checking session...</p>
					</div>
				) : isLoading ? (
					<div className='flex justify-center items-center h-64'>
						<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
					</div>
				) : (
					<>
						{/* Session Stats */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
								<h2 className='text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300'>
									Total Sessions
								</h2>
								<p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
									{sessionStats.totalSessions}
								</p>
							</div>

							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
								<h2 className='text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300'>
									Avg. Session Duration
								</h2>
								<p className='text-3xl font-bold text-green-600 dark:text-green-400'>
									{sessionStats.averageDuration}s
								</p>
							</div>

							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
								<h2 className='text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300'>
									Bounce Rate
								</h2>
								<p className='text-3xl font-bold text-red-600 dark:text-red-400'>
									{sessionStats.bounceRate}%
								</p>
							</div>

							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
								<h2 className='text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300'>
									Avg. Scroll Depth
								</h2>
								<p className='text-3xl font-bold text-purple-600 dark:text-purple-400'>
									{sessionStats.averageScrollDepth}%
								</p>
							</div>
						</div>

						{/* Section Stats */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-white'>
									Section Views
								</h2>
								<div className='h-64'>
									<Bar
										data={getSectionViewsChartData()}
										options={{ maintainAspectRatio: false }}
									/>
								</div>
							</div>

							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
								<h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-white'>
									Average Time Spent (seconds)
								</h2>
								<div className='h-64'>
									<Bar
										data={getSectionEngagementChartData()}
										options={{ maintainAspectRatio: false }}
									/>
								</div>
							</div>
						</div>

						{/* Section Details Table */}
						<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
							<h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-white'>
								Section Details
							</h2>

							<div className='overflow-x-auto'>
								<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
									<thead className='bg-gray-50 dark:bg-gray-700'>
										<tr>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Section
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Views
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Avg. Time (s)
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Engagement
											</th>
										</tr>
									</thead>
									<tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
										{sectionStats.map((section) => (
											<tr key={section.sectionId}>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
													{section.sectionId}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
													{section.views}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
													{section.averageTimeSpent}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm'>
													<span
														className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
															section.isLowEngagement
																? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
																: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
														}`}
													>
														{section.isLowEngagement ? 'Low' : 'Good'}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						{/* Project Link Clicks Table */}
						<div className='mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
							<h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-white'>
								Project Link Clicks
							</h2>
							<div className='overflow-x-auto'>
								<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
									<thead className='bg-gray-50 dark:bg-gray-700'>
										<tr>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Project
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Visit
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												GitHub
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Star
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Fork
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
												Total
											</th>
										</tr>
									</thead>
									<tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
										{projectClickStats.length === 0 ? (
											<tr>
												<td
													colSpan={6}
													className='px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400'
												>
													No project link click data yet.
												</td>
											</tr>
										) : (
											projectClickStats.map((stat) => (
												<tr key={stat.projectId}>
													<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
														{stat.projectId}
													</td>
													<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
														{stat.visit}
													</td>
													<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
														{stat.github}
													</td>
													<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
														{stat.star}
													</td>
													<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
														{stat.fork}
													</td>
													<td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-200'>
														{stat.totalClicks}
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>
							</div>
						</div>

						<div className='mt-6 flex justify-end gap-4'>
							<button
								onClick={handleLogout}
								disabled={isLoading}
								className='bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50'
							>
								{isLoading ? 'Logging out...' : 'Logout'}
							</button>
							<button
								onClick={() => fetchData(selectedFilter)}
								disabled={isLoading}
								className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50'
							>
								{isLoading ? 'Refreshing...' : 'Refresh Data'}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
