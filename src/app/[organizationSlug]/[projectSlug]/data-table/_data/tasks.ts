import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";

export type TTaskStatus = "todo" | "in_progress" | "done" | "cancelled";
export type TTaskPriority = "low" | "medium" | "high" | "urgent";
export type TTaskCategory = "feature" | "bug" | "chore" | "docs";

export interface ITask {
  id: string;
  title: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  category: TTaskCategory;
  assignee: string;
  estimatedHours: number;
  budget: number;
  dueDate: number;
  isBlocked: boolean;
  completionRate: number;
}

export const SAMPLE_TASKS: ITask[] = [
  {
    id: "TASK-001",
    title: "Implement user authentication flow",
    status: "done",
    priority: "high",
    category: "feature",
    assignee: "Alice Johnson",
    estimatedHours: 16,
    budget: 3200,
    dueDate: new Date("2025-01-15").getTime(),
    isBlocked: false,
    completionRate: 100,
  },
  {
    id: "TASK-002",
    title: "Fix payment gateway timeout issue",
    status: "in_progress",
    priority: "urgent",
    category: "bug",
    assignee: "Bob Smith",
    estimatedHours: 8,
    budget: 1600,
    dueDate: new Date("2025-01-20").getTime(),
    isBlocked: true,
    completionRate: 45,
  },
  {
    id: "TASK-003",
    title: "Update API documentation",
    status: "todo",
    priority: "low",
    category: "docs",
    assignee: "Carol White",
    estimatedHours: 4,
    budget: 800,
    dueDate: new Date("2025-02-01").getTime(),
    isBlocked: false,
    completionRate: 0,
  },
  {
    id: "TASK-004",
    title: "Refactor database connection pooling",
    status: "in_progress",
    priority: "medium",
    category: "chore",
    assignee: "David Lee",
    estimatedHours: 12,
    budget: 2400,
    dueDate: new Date("2025-01-28").getTime(),
    isBlocked: false,
    completionRate: 60,
  },
  {
    id: "TASK-005",
    title: "Design new onboarding screens",
    status: "todo",
    priority: "high",
    category: "feature",
    assignee: "Emma Davis",
    estimatedHours: 20,
    budget: 4000,
    dueDate: new Date("2025-02-10").getTime(),
    isBlocked: false,
    completionRate: 0,
  },
  {
    id: "TASK-006",
    title: "Fix mobile navigation menu overlap",
    status: "done",
    priority: "medium",
    category: "bug",
    assignee: "Frank Miller",
    estimatedHours: 3,
    budget: 600,
    dueDate: new Date("2025-01-10").getTime(),
    isBlocked: false,
    completionRate: 100,
  },
  {
    id: "TASK-007",
    title: "Add dark mode support",
    status: "in_progress",
    priority: "medium",
    category: "feature",
    assignee: "Grace Kim",
    estimatedHours: 10,
    budget: 2000,
    dueDate: new Date("2025-02-05").getTime(),
    isBlocked: false,
    completionRate: 75,
  },
  {
    id: "TASK-008",
    title: "Set up CI/CD pipeline",
    status: "done",
    priority: "high",
    category: "chore",
    assignee: "Henry Brown",
    estimatedHours: 8,
    budget: 1600,
    dueDate: new Date("2025-01-05").getTime(),
    isBlocked: false,
    completionRate: 100,
  },
  {
    id: "TASK-009",
    title: "Implement real-time notifications",
    status: "todo",
    priority: "high",
    category: "feature",
    assignee: "Iris Chen",
    estimatedHours: 24,
    budget: 4800,
    dueDate: new Date("2025-02-20").getTime(),
    isBlocked: true,
    completionRate: 0,
  },
  {
    id: "TASK-010",
    title: "Resolve memory leak in image processor",
    status: "cancelled",
    priority: "urgent",
    category: "bug",
    assignee: "Jack Wilson",
    estimatedHours: 6,
    budget: 1200,
    dueDate: new Date("2025-01-12").getTime(),
    isBlocked: false,
    completionRate: 30,
  },
  {
    id: "TASK-011",
    title: "Write unit tests for checkout module",
    status: "in_progress",
    priority: "medium",
    category: "chore",
    assignee: "Karen Taylor",
    estimatedHours: 14,
    budget: 2800,
    dueDate: new Date("2025-01-30").getTime(),
    isBlocked: false,
    completionRate: 40,
  },
  {
    id: "TASK-012",
    title: "Migrate legacy REST endpoints to GraphQL",
    status: "todo",
    priority: "low",
    category: "feature",
    assignee: "Liam Anderson",
    estimatedHours: 40,
    budget: 8000,
    dueDate: new Date("2025-03-01").getTime(),
    isBlocked: false,
    completionRate: 0,
  },
  {
    id: "TASK-013",
    title: "Add CSV export functionality",
    status: "done",
    priority: "low",
    category: "feature",
    assignee: "Mia Martinez",
    estimatedHours: 5,
    budget: 1000,
    dueDate: new Date("2025-01-08").getTime(),
    isBlocked: false,
    completionRate: 100,
  },
  {
    id: "TASK-014",
    title: "Investigate slow dashboard load times",
    status: "in_progress",
    priority: "urgent",
    category: "bug",
    assignee: "Noah Garcia",
    estimatedHours: 10,
    budget: 2000,
    dueDate: new Date("2025-01-22").getTime(),
    isBlocked: false,
    completionRate: 55,
  },
  {
    id: "TASK-015",
    title: "Update third-party dependencies",
    status: "todo",
    priority: "medium",
    category: "chore",
    assignee: "Olivia Thompson",
    estimatedHours: 6,
    budget: 1200,
    dueDate: new Date("2025-02-15").getTime(),
    isBlocked: false,
    completionRate: 0,
  },
];

// ─── Filter Options ───────────────────────────────────────────────────────────

export const STATUS_OPTIONS = [
  {
    label: "Todo",
    value: "todo",
    icon: Clock,
    count: SAMPLE_TASKS.filter((t) => t.status === "todo").length,
  },
  {
    label: "In Progress",
    value: "in_progress",
    icon: AlertCircle,
    count: SAMPLE_TASKS.filter((t) => t.status === "in_progress").length,
  },
  {
    label: "Done",
    value: "done",
    icon: CheckCircle2,
    count: SAMPLE_TASKS.filter((t) => t.status === "done").length,
  },
  {
    label: "Cancelled",
    value: "cancelled",
    icon: XCircle,
    count: SAMPLE_TASKS.filter((t) => t.status === "cancelled").length,
  },
];

export const PRIORITY_OPTIONS = [
  {
    label: "Low",
    value: "low",
    count: SAMPLE_TASKS.filter((t) => t.priority === "low").length,
  },
  {
    label: "Medium",
    value: "medium",
    count: SAMPLE_TASKS.filter((t) => t.priority === "medium").length,
  },
  {
    label: "High",
    value: "high",
    count: SAMPLE_TASKS.filter((t) => t.priority === "high").length,
  },
  {
    label: "Urgent",
    value: "urgent",
    count: SAMPLE_TASKS.filter((t) => t.priority === "urgent").length,
  },
];

export const CATEGORY_OPTIONS = [
  {
    label: "Feature",
    value: "feature",
    count: SAMPLE_TASKS.filter((t) => t.category === "feature").length,
  },
  {
    label: "Bug",
    value: "bug",
    count: SAMPLE_TASKS.filter((t) => t.category === "bug").length,
  },
  {
    label: "Chore",
    value: "chore",
    count: SAMPLE_TASKS.filter((t) => t.category === "chore").length,
  },
  {
    label: "Docs",
    value: "docs",
    count: SAMPLE_TASKS.filter((t) => t.category === "docs").length,
  },
];
