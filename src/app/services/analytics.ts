import { v4 as uuidv4 } from 'uuid';
import {
	databases,
	ID,
	ANALYTICS_DATABASE_ID,
	SESSIONS_COLLECTION_ID,
	SECTION_VIEWS_COLLECTION_ID,
	PROJECT_LINK_CLICKS_COLLECTION_ID,
	Session,
	SectionView,
	ProjectLinkClick,
} from './appwrite';
import { Query } from 'appwrite';

// Remove activeSectionViews, no longer needed for this approach
// const activeSectionViews: Record<string, { sessionId: string; enterTime: Date }> = {};

// Session management
const getSessionId = (): string => {
	const sessionId = localStorage.getItem('portfolio_session_id');

	if (!sessionId) {
		const newSessionId = uuidv4();
		localStorage.setItem('portfolio_session_id', newSessionId);

		// Start a new session
		startSession(newSessionId);
		return newSessionId;
	}

	return sessionId;
};

const startSession = async (sessionId: string): Promise<void> => {
	try {
		const session: Partial<Session> = {
			sessionId,
			startedAt: new Date(),
			scrollDepth: 0,
			isBounce: true, // Assume it's a bounce until proven otherwise
		};

		await databases.createDocument(
			ANALYTICS_DATABASE_ID,
			SESSIONS_COLLECTION_ID,
			ID.unique(),
			session
		);

		// Store the start time in localStorage
		localStorage.setItem('portfolio_session_started', new Date().toISOString());

		// Set up bounce rate detection
		setTimeout(() => {
			updateSession({ isBounce: false });
		}, 10000); // 10 seconds
	} catch (error) {
		console.error('Error starting session:', error);
	}
};

const updateSession = async (updates: Partial<Session>): Promise<void> => {
	try {
		const sessionId = localStorage.getItem('portfolio_session_id');
		if (!sessionId) return;

		// First, find the document ID by querying for the session
		const response = await databases.listDocuments(
			ANALYTICS_DATABASE_ID,
			SESSIONS_COLLECTION_ID,
			[Query.equal('sessionId', sessionId)]
		);

		if (response.documents.length > 0) {
			const documentId = response.documents[0].$id;

			await databases.updateDocument(
				ANALYTICS_DATABASE_ID,
				SESSIONS_COLLECTION_ID,
				documentId,
				updates
			);
		}
	} catch (error) {
		console.error('Error updating session:', error);
	}
};

const endSession = async (): Promise<void> => {
	try {
		const sessionId = localStorage.getItem('portfolio_session_id');
		if (!sessionId) return;

		const endedAt = new Date();
		const sessionStartStr = localStorage.getItem('portfolio_session_started');
		const startedAt = sessionStartStr ? new Date(sessionStartStr) : endedAt;
		const totalTime = Math.round(
			(endedAt.getTime() - startedAt.getTime()) / 1000
		);

		await updateSession({
			endedAt,
			totalTime,
		});

		// Clear local storage related to the session
		localStorage.removeItem('portfolio_session_id');
		localStorage.removeItem('portfolio_session_started');
		localStorage.removeItem('portfolio_scroll_depth');
	} catch (error) {
		console.error('Error ending session:', error);
	}
};

// Scroll depth tracking
const updateScrollDepth = async (depth: number): Promise<void> => {
	try {
		// Only update if the new depth is greater than the current one
		const depthStr = localStorage.getItem('portfolio_scroll_depth');
		const currentDepth = depthStr ? parseInt(depthStr, 10) : 0;

		if (depth > currentDepth) {
			localStorage.setItem('portfolio_scroll_depth', depth.toString());
			await updateSession({ scrollDepth: depth });
		}
	} catch (error) {
		console.error('Error updating scroll depth:', error);
	}
};

// New function to track section view duration (replaces track/endSectionView)
const trackSectionViewDuration = async (
	sectionId: string,
	enterTime: Date,
	duration: number // Duration in seconds
): Promise<void> => {
	const sessionId = getSessionId();
	if (!sessionId || duration < 0) return; // Basic validation

	const exitTime = new Date(enterTime.getTime() + duration * 1000);

	const sectionViewData: SectionView = {
		sessionId,
		sectionId,
		enterTime,
		exitTime,
		timeSpent: duration,
	};

	try {
		console.log(
			'[Analytics Service] Sending section view data:',
			sectionViewData
		);
		await databases.createDocument(
			ANALYTICS_DATABASE_ID,
			SECTION_VIEWS_COLLECTION_ID,
			ID.unique(),
			sectionViewData
		);
		console.log('[Analytics Service] Section view data sent successfully.');
	} catch (error) {
		console.error(
			'[Analytics Service] Error sending section view data:',
			error,
			sectionViewData
		);
	}
};

// Track project link clicks
const trackProjectLinkClick = async (
	projectId: string,
	linkType: ProjectLinkClick['linkType']
): Promise<void> => {
	const sessionId = getSessionId();
	if (!sessionId) return;

	const clickData: ProjectLinkClick = {
		sessionId,
		projectId,
		linkType,
		clickedAt: new Date(),
	};

	try {
		console.log('Sending project link click data:', clickData);
		await databases.createDocument(
			ANALYTICS_DATABASE_ID,
			PROJECT_LINK_CLICKS_COLLECTION_ID,
			ID.unique(),
			clickData
		);
		console.log('Project link click data sent successfully.');
	} catch (error) {
		console.error('Error sending project link click data:', error, clickData);
	}
};

export const analyticsService = {
	getSessionId,
	updateScrollDepth,
	trackSectionViewDuration,
	endSession,
	trackProjectLinkClick,
};
