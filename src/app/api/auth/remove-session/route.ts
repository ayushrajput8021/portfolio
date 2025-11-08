import { NextRequest, NextResponse } from 'next/server';
import { removeSession } from '@/app/services/auth';

// POST endpoint to remove session after logout
export async function POST(request: NextRequest) {
	try {
		const { sessionId } = await request.json();

		if (!sessionId) {
			return NextResponse.json(
				{ error: 'Session ID required' },
				{ status: 400 }
			);
		}

		// Remove session from Redis
		await removeSession(sessionId);

		return NextResponse.json(
			{ message: 'Session removed successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error removing session:', error);
		return NextResponse.json(
			{ error: 'Failed to remove session' },
			{ status: 500 }
		);
	}
}
