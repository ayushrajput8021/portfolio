import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
	.setEndpoint('https://fra.cloud.appwrite.io/v1')
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '');

export const account = new Account(client);
export const databases = new Databases(client);

// Analytics constants
export const ANALYTICS_DATABASE_ID =
	process.env.NEXT_PUBLIC_APPWRITE_ANALYTICS_DATABASE_ID ?? '';
export const SESSIONS_COLLECTION_ID =
	process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID ?? '';
export const SECTION_VIEWS_COLLECTION_ID =
	process.env.NEXT_PUBLIC_APPWRITE_SECTION_VIEWS_COLLECTION_ID ?? '';
export const PROJECT_LINK_CLICKS_COLLECTION_ID =
	process.env.NEXT_PUBLIC_APPWRITE_PROJECT_LINK_CLICKS_COLLECTION_ID ?? '';

export { ID } from 'appwrite';

// Session schema
export interface Session {
	sessionId: string;
	startedAt: Date;
	endedAt?: Date;
	totalTime?: number; // in seconds
	scrollDepth: number; // percentage 0-100
	isBounce: boolean;
}

// Section view schema
export interface SectionView {
	sessionId: string;
	sectionId: string;
	enterTime: Date;
	exitTime?: Date;
	timeSpent?: number; // in seconds
}

// New interface for Project Link Click data
export interface ProjectLinkClick {
	sessionId: string;
	projectId: string;
	linkType: 'visit' | 'github' | 'star' | 'fork';
	clickedAt: Date;
}

// Section IDs - matching your existing sections
export enum SectionId {
	HERO = 'hero',
	ABOUT = 'about',
	EXPERIENCE = 'experience',
	PROJECTS = 'projects',
	SKILLS = 'skills',
	FUN_FACTS = 'funFacts',
	LINKS = 'links',
	CONTACT = 'contact',
}
