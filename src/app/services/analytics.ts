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

// Store active section views in memory
const activeSectionViews: Record<
	string,
	{ sessionId: string; enterTime: Date }
> = {};

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

		// End any active section views that are still open
		const activeKeys = Object.keys(activeSectionViews);
		for (const sectionId of activeKeys) {
			await endSectionView(sectionId, endedAt, true); // Pass flag to force send
		}

		// Clear local storage related to the session
		localStorage.removeItem('portfolio_session_id');
		localStorage.removeItem('portfolio_session_started');
		localStorage.removeItem('portfolio_scroll_depth');
		// Note: We don't clear individual section view items from localStorage here
		// as endSectionView handles its own cleanup.
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

// Section view tracking
const trackSectionView = (sectionId: string, enterTime: Date): void => {
	const sessionId = getSessionId();
	console.log(`Tracking enter: ${sectionId} at ${enterTime}`);
	activeSectionViews[sectionId] = { sessionId, enterTime };
};

const endSectionView = async (
	sectionId: string,
	exitTime: Date,
	forceSend: boolean = false // Flag to send even if time < 3s during session end
): Promise<void> => {
	const activeView = activeSectionViews[sectionId];
	if (!activeView) {
		// console.log(`No active view found for exit: ${sectionId}`);
		return;
	}

	console.log(`Tracking exit: ${sectionId} at ${exitTime}`);

	const { sessionId, enterTime } = activeView;
	const timeSpent = Math.round(
		(exitTime.getTime() - enterTime.getTime()) / 1000
	);

	// Remove the view from active tracking *before* sending data
	delete activeSectionViews[sectionId];

	// Only send if time spent is >= 3 seconds OR if we are forcing send on session end
	if (timeSpent >= 3 || forceSend) {
		const sectionViewData: SectionView = {
			sessionId,
			sectionId,
			enterTime,
			exitTime,
			timeSpent: timeSpent < 0 ? 0 : timeSpent, // Ensure timeSpent is not negative
		};

		try {
			console.log('Sending section view data:', sectionViewData);
			await databases.createDocument(
				ANALYTICS_DATABASE_ID,
				SECTION_VIEWS_COLLECTION_ID,
				ID.unique(),
				sectionViewData
			);
			console.log('Section view data sent successfully.');
		} catch (error) {
			console.error('Error sending section view data:', error, sectionViewData);
			// Optional: Consider adding the failed view back to try later, or implement retry logic
		}
	} else {
		console.log(
			`Section view for ${sectionId} skipped (duration: ${timeSpent}s < 3s)`
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
	trackSectionView,
	endSectionView,
	endSession,
	trackProjectLinkClick,
};
