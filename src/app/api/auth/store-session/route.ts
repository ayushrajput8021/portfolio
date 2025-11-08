import { NextRequest, NextResponse } from 'next/server';
import { storeSession } from '@/app/services/auth';

// POST endpoint to store session after login
export async function POST(request: NextRequest) {
	try {
		const { sessionId, email } = await request.json();

		if (!sessionId) {
			return NextResponse.json(
				{ error: 'Session ID required' },
				{ status: 400 }
			);
		}

		// Store session in Redis with user data
		await storeSession(sessionId, {
			email,
			createdAt: new Date().toISOString(),
		});

		return NextResponse.json(
			{ message: 'Session stored successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error storing session:', error);
		return NextResponse.json(
			{ error: 'Failed to store session' },
			{ status: 500 }
		);
	}
}
