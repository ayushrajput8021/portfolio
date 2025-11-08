import { NextRequest, NextResponse } from 'next/server';
import { redisService } from '@/app/services/redis';
import { validateSession } from '@/app/services/auth';

// GET all projects (admin access - no filtering)
export async function GET(request: NextRequest) {
	try {
		console.log('Admin API: GET request received');
		console.log(
			'Admin API: Authorization header:',
			request.headers.get('authorization') ? 'present' : 'missing'
		);

		// Validate Appwrite session
		const isValid = await validateSession(request);
		console.log('Admin API: Session validation result:', isValid);

		if (!isValid) {
			console.log('Admin API: Returning 401 - Invalid session');
			return NextResponse.json(
				{ error: 'Unauthorized - Invalid or expired session' },
				{ status: 401 }
			);
		}

		const projects = await redisService.getAllProjects();
		console.log('Admin API: Returning', projects.length, 'projects');
		return NextResponse.json({ projects }, { status: 200 });
	} catch (error) {
		console.error('Error fetching admin projects:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch projects' },
			{ status: 500 }
		);
	}
}
