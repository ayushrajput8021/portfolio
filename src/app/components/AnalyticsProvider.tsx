'use client';

import React, { useEffect } from 'react';
import { analyticsService } from '../services/analytics';
import { useScrollTracker } from '../hooks/useScrollTracker';
import { account } from '../services/appwrite'; // Import the account service

interface AnalyticsProviderProps {
	children: React.ReactNode;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
	// Initialize scroll tracking
	useScrollTracker();

	useEffect(() => {
		// Create an anonymous session on mount
		const initializeSession = async () => {
			try {
				await account.get(); // Check if a session exists
			} catch (error) {
				console.error('Failed to get session:', error);
				// If no session, create an anonymous one
				try {
					await account.createAnonymousSession();
					console.log('Anonymous session created successfully.');
				} catch (sessionError) {
					console.error('Failed to create anonymous session:', sessionError);
				}
			}
			// Session exists or was created, now get/start the analytics session
			analyticsService.getSessionId();
		};

		initializeSession();

		// Handle page visibility changes
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'hidden') {
				// User is leaving the page, end the session
				analyticsService.endSession();
			}
		};

		// Handle before unload (user closes tab/browser)
		const handleBeforeUnload = () => {
			analyticsService.endSession();
		};

		// Add event listeners
		document.addEventListener('visibilitychange', handleVisibilityChange);
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			// Clean up event listeners
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			window.removeEventListener('beforeunload', handleBeforeUnload);

			// End session on component unmount
			analyticsService.endSession();
		};
	}, []);

	return <>{children}</>;
};

export default AnalyticsProvider;
