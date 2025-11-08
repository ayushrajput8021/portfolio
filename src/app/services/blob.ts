import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryService = {
	// Upload a single image
	async uploadImage(file: File, folder: string = 'projects'): Promise<string> {
		try {
			// Convert File to buffer
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Upload to Cloudinary
			const result = await new Promise<string>((resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{
							folder: `portfolio/${folder}`,
							resource_type: 'auto',
							public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}`,
						},
						(error, result) => {
							if (error) reject(error);
							else resolve(result?.secure_url || '');
						}
					)
					.end(buffer);
			});

			return result;
		} catch (error) {
			console.error('Error uploading image to Cloudinary:', error);
			throw error;
		}
	},

	// Upload multiple images
	async uploadImages(
		files: File[],
		folder: string = 'projects'
	): Promise<string[]> {
		try {
			const uploadPromises = files.map((file) =>
				this.uploadImage(file, folder)
			);
			return await Promise.all(uploadPromises);
		} catch (error) {
			console.error('Error uploading images to Cloudinary:', error);
			throw error;
		}
	},

	// Delete an image by URL
	async deleteImage(url: string): Promise<boolean> {
		try {
			// Extract public_id from Cloudinary URL
			const publicId = this.extractPublicId(url);
			if (!publicId) {
				throw new Error('Invalid Cloudinary URL');
			}

			await cloudinary.uploader.destroy(publicId);
			return true;
		} catch (error) {
			console.error('Error deleting image from Cloudinary:', error);
			throw error;
		}
	},

	// Delete multiple images
	async deleteImages(urls: string[]): Promise<boolean> {
		try {
			const deletePromises = urls.map((url) => this.deleteImage(url));
			await Promise.all(deletePromises);
			return true;
		} catch (error) {
			console.error('Error deleting images from Cloudinary:', error);
			throw error;
		}
	},

	// List all images in a folder
	async listImages(folder: string = 'projects'): Promise<string[]> {
		try {
			const result = await cloudinary.search
				.expression(`folder:portfolio/${folder}/*`)
				.sort_by('created_at', 'desc')
				.max_results(500)
				.execute();

			return result.resources.map(
				(resource: { secure_url: string }) => resource.secure_url
			);
		} catch (error) {
			console.error('Error listing images from Cloudinary:', error);
			throw error;
		}
	},

	// Helper function to extract public_id from Cloudinary URL
	extractPublicId(url: string): string | null {
		try {
			// Example URL: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
			const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
			return match ? match[1] : null;
		} catch (error) {
			console.error('Error extracting public_id:', error);
			return null;
		}
	},
};

// Export with original name for backwards compatibility
export const blobService = cloudinaryService;
