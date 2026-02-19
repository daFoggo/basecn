import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { createLevelConfig } from "@/constants/color-levels";

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
  CANCELLED: "cancelled",
} as const;

export const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export const TASK_CATEGORY = {
  FEATURE: "feature",
  BUG: "bug",
  CHORE: "chore",
  DOCS: "docs",
} as const;

export const TOOLBAR_MODE = {
  STANDARD: "standard",
  FILTER_LIST: "filter-list",
  FILTER_MENU: "filter-menu",
} as const;

export const TOOLBAR_MODE_OPTIONS = [
  { value: TOOLBAR_MODE.STANDARD, label: "Standard Toolbar" },
  { value: TOOLBAR_MODE.FILTER_LIST, label: "Filter List" },
  { value: TOOLBAR_MODE.FILTER_MENU, label: "Filter Menu" },
];

export const STATUS_OPTIONS = [
  {
    label: "Todo",
    value: TASK_STATUS.TODO,
    icon: Clock,
  },
  {
    label: "In Progress",
    value: TASK_STATUS.IN_PROGRESS,
    icon: AlertCircle,
  },
  {
    label: "Done",
    value: TASK_STATUS.DONE,
    icon: CheckCircle2,
  },
  {
    label: "Cancelled",
    value: TASK_STATUS.CANCELLED,
    icon: XCircle,
  },
];

export const PRIORITY_OPTIONS = [
  {
    label: "Low",
    value: TASK_PRIORITY.LOW,
  },
  {
    label: "Medium",
    value: TASK_PRIORITY.MEDIUM,
  },
  {
    label: "High",
    value: TASK_PRIORITY.HIGH,
  },
  {
    label: "Urgent",
    value: TASK_PRIORITY.URGENT,
  },
];

export const CATEGORY_OPTIONS = [
  {
    label: "Feature",
    value: TASK_CATEGORY.FEATURE,
  },
  {
    label: "Bug",
    value: TASK_CATEGORY.BUG,
  },
  {
    label: "Chore",
    value: TASK_CATEGORY.CHORE,
  },
  {
    label: "Docs",
    value: TASK_CATEGORY.DOCS,
  },
];

export const STATUS_COLOR_CONFIG = createLevelConfig({
  todo: { level: "neutral", label: "Todo" },
  in_progress: { level: "blue", label: "In Progress" },
  done: { level: "success", label: "Done" },
  cancelled: { level: "gray", label: "Cancelled" },
} as const);

export const PRIORITY_COLOR_CONFIG = createLevelConfig({
  low: { level: "neutral", label: "Low" },
  medium: { level: "blue", label: "Medium" },
  high: { level: "warning", label: "High" },
  urgent: { level: "danger", label: "Urgent" },
} as const);

export const FILTER_TYPE_LEGEND = [
  { color: "bg-blue-500", label: "Text", desc: "ID, Title, Assignees" },
  { color: "bg-green-500", label: "Multi-Select", desc: "Status, Category" },
  { color: "bg-orange-500", label: "Select", desc: "Priority" },
  { color: "bg-purple-500", label: "Range", desc: "Est. Hours, Completion" },
  { color: "bg-red-500", label: "Number", desc: "Budget" },
  { color: "bg-yellow-500", label: "Date Range", desc: "Due Date" },
  { color: "bg-pink-500", label: "Boolean", desc: "Blocked" },
];
