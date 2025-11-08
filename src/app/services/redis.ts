import { Redis } from '@upstash/redis';
import type { Project } from '../components/sections/ProjectSection';

const redis = Redis.fromEnv();

const PROJECTS_KEY = 'projects';

export const redisService = {
	// Get all projects
	async getAllProjects(): Promise<Project[]> {
		try {
			const projects = await redis.get<Project[]>(PROJECTS_KEY);
			return projects || [];
		} catch (error) {
			console.error('Error fetching projects from Redis:', error);
			return [];
		}
	},

	// Get a single project by title
	async getProject(title: string): Promise<Project | null> {
		try {
			const projects = await this.getAllProjects();
			return projects.find((p) => p.title === title) || null;
		} catch (error) {
			console.error('Error fetching project from Redis:', error);
			return null;
		}
	},

	// Create a new project
	async createProject(project: Project): Promise<boolean> {
		try {
			const projects = await this.getAllProjects();

			// Check if project with same title exists
			if (projects.some((p) => p.title === project.title)) {
				throw new Error('Project with this title already exists');
			}

			projects.push(project);
			await redis.set(PROJECTS_KEY, projects);
			return true;
		} catch (error) {
			console.error('Error creating project in Redis:', error);
			throw error;
		}
	},

	// Update an existing project
	async updateProject(
		oldTitle: string,
		updatedProject: Project
	): Promise<boolean> {
		try {
			const projects = await this.getAllProjects();
			const index = projects.findIndex((p) => p.title === oldTitle);

			if (index === -1) {
				throw new Error('Project not found');
			}

			projects[index] = updatedProject;
			await redis.set(PROJECTS_KEY, projects);
			return true;
		} catch (error) {
			console.error('Error updating project in Redis:', error);
			throw error;
		}
	},

	// Delete a project
	async deleteProject(title: string): Promise<boolean> {
		try {
			const projects = await this.getAllProjects();
			const filteredProjects = projects.filter((p) => p.title !== title);

			if (filteredProjects.length === projects.length) {
				throw new Error('Project not found');
			}

			await redis.set(PROJECTS_KEY, filteredProjects);
			return true;
		} catch (error) {
			console.error('Error deleting project from Redis:', error);
			throw error;
		}
	},

	// Initialize with default projects (migration helper)
	async initializeProjects(projects: Project[]): Promise<boolean> {
		try {
			await redis.set(PROJECTS_KEY, projects);
			return true;
		} catch (error) {
			console.error('Error initializing projects in Redis:', error);
			throw error;
		}
	},
};
