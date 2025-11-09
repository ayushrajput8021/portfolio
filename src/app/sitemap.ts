import type { MetadataRoute } from 'next';
import { projects } from './data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://ayushrajput.in';

	// Main pages
	const mainPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/#about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/#skills`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/#experience`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/#projects`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/#contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	];

	// Project pages - only include projects that should be shown
	const projectPages: MetadataRoute.Sitemap = projects
		.filter((project) => project.wantToShow && project.status === 'live')
		.map((project) => ({
			url: `${baseUrl}/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: project.isFeatured ? 0.7 : 0.6,
		}));

	return [...mainPages, ...projectPages];
}