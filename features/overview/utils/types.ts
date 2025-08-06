import type { MEMBER_ROLE, MEMBER_STATUS, PROJECT_TYPE, TASK_PRIORITY, TASK_STATUS } from "./constants";

export interface IMember {
	id: string;
	name: string;
	email: string;
	avatar: string;
	role: MEMBER_ROLE;
	status: MEMBER_STATUS;
	department: string;
	joinedAt: string;
	skills: string[];
	currentTasksCount: number;
	completedTasksCount: number;
	workload: number; // percentage (0-100)
}

export interface ITask {
	id: string;
	title: string;
	description: string;
	status: TASK_STATUS;
	priority: TASK_PRIORITY;
	assigneeId: string;
	reporterId: string;
	projectId: string;
	projectName: string;
	projectType: PROJECT_TYPE;
	createdAt: string;
	updatedAt: string;
	dueDate: string;
	estimatedHours: number;
	actualHours?: number;
	tags: string[];
	attachments: number;
	comments: number;
	subtasksTotal: number;
	subtasksCompleted: number;
}

export interface IProject {
	id: string;
	name: string;
	type: PROJECT_TYPE;
	description: string;
	startDate: string;
	endDate: string;
	progress: number;
	membersCount: number;
	tasksCount: number;
}