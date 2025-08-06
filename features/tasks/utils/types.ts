export interface ITask {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
} 
