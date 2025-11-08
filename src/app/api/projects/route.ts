import { NextRequest, NextResponse } from 'next/server';
import { redisService } from '@/app/services/redis';
import { validateSession } from '@/app/services/auth';

// GET projects visible to users (wantToShow: true only)
export async function GET() {
	try {
		const allProjects = await redisService.getAllProjects();
		// Filter to show only projects with wantToShow: true
		const visibleProjects = allProjects.filter(
			(project) => project.wantToShow !== false
		);
		return NextResponse.json({ projects: visibleProjects }, { status: 200 });
	} catch (error) {
		console.error('Error fetching projects:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch projects' },
			{ status: 500 }
		);
	}
}

// POST create new project (requires authentication)
export async function POST(request: NextRequest) {
	try {
		// Validate Appwrite session
		const isValid = await validateSession(request);
		if (!isValid) {
			return NextResponse.json(
				{ error: 'Unauthorized - Invalid or expired session' },
				{ status: 401 }
			);
		}

		const project = await request.json();
		await redisService.createProject(project);

		return NextResponse.json(
			{ message: 'Project created successfully', project },
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error creating project:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to create project',
			},
			{ status: 500 }
		);
	}
}
