import type { ITask } from "./types";

export const KANBAN_COLUMN_TITLES: Record<string, string> = {
	backlog: "Backlog",
	inProgress: "In Progress",
	done: "Done",
};

export const SAMPLE_TASKS: Record<string, ITask[]> = {
	backlog: [
		{
			id: "1",
			title: "Add authentication",
			priority: "high",
			assignee: "John Doe",
			dueDate: "2024-04-01",
		},
		{
			id: "2",
			title: "Create API endpoints",
			priority: "medium",
			assignee: "Jane Smith",
			dueDate: "2024-04-05",
		},
		{
			id: "3",
			title: "Write documentation",
			priority: "low",
			assignee: "Bob Johnson",
			dueDate: "2024-04-10",
		},
	],
	inProgress: [
		{
			id: "4",
			title: "Design system updates",
			priority: "high",
			assignee: "Alice Brown",
			dueDate: "2024-03-28",
		},
		{
			id: "5",
			title: "Implement dark mode",
			priority: "medium",
			assignee: "Charlie Wilson",
			dueDate: "2024-04-02",
		},
	],
	done: [
		{
			id: "7",
			title: "Setup project",
			priority: "high",
			assignee: "Eve Davis",
			dueDate: "2024-03-25",
		},
		{
			id: "8",
			title: "Initial commit",
			priority: "low",
			assignee: "Frank White",
			dueDate: "2024-03-24",
		},
	],
};
