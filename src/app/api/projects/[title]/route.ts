import { NextRequest, NextResponse } from 'next/server';
import { redisService } from '@/app/services/redis';
import { validateSession } from '@/app/services/auth';

// GET single project
export async function GET(
	request: NextRequest,
	{ params }: { params: { title: string } }
) {
	try {
		const title = decodeURIComponent(params.title);
		const project = await redisService.getProject(title);

		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 });
		}

		return NextResponse.json({ project }, { status: 200 });
	} catch (error) {
		console.error('Error fetching project:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch project' },
			{ status: 500 }
		);
	}
}

// PUT update project (requires authentication)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { title: string } }
) {
	try {
		// Validate Appwrite session
		const isValid = await validateSession(request);
		if (!isValid) {
			return NextResponse.json(
				{ error: 'Unauthorized - Invalid or expired session' },
				{ status: 401 }
			);
		}

		const title = decodeURIComponent(params.title);
		const updatedProject = await request.json();

		await redisService.updateProject(title, updatedProject);

		return NextResponse.json(
			{ message: 'Project updated successfully', project: updatedProject },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error updating project:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to update project',
			},
			{ status: 500 }
		);
	}
}

// DELETE project (requires authentication)
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { title: string } }
) {
	try {
		// Validate Appwrite session
		const isValid = await validateSession(request);
		if (!isValid) {
			return NextResponse.json(
				{ error: 'Unauthorized - Invalid or expired session' },
				{ status: 401 }
			);
		}

		const title = decodeURIComponent(params.title);
		await redisService.deleteProject(title);

		return NextResponse.json(
			{ message: 'Project deleted successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error deleting project:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to delete project',
			},
			{ status: 500 }
		);
	}
}
