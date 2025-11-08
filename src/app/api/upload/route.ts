import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/app/services/auth';
import { cloudinaryService } from '@/app/services/blob';

// POST upload images to Cloudinary
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

		const formData = await request.formData();
		const files = formData.getAll('files') as File[];
		const folder = (formData.get('folder') as string) || 'projects';

		if (!files || files.length === 0) {
			return NextResponse.json({ error: 'No files provided' }, { status: 400 });
		}

		console.log(`[Upload] Uploading ${files.length} files to Cloudinary`);

		const urls = await cloudinaryService.uploadImages(files, folder);

		console.log(`[Upload] Successfully uploaded ${urls.length} files`);

		return NextResponse.json({ urls }, { status: 200 });
	} catch (error) {
		console.error('Error uploading files:', error);
		return NextResponse.json(
			{ error: 'Failed to upload files' },
			{ status: 500 }
		);
	}
}
