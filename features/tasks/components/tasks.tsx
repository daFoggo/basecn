"use client";

import { GripVertical } from "lucide-react";
import { Suspense, useState } from "react";
import PageHeading from "@/components/common/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/kanban";
import { KANBAN_COLUMN_TITLES, SAMPLE_TASKS } from "../utils/constants";
import type { ITask } from "../utils/types";
import { TasksSkeleton } from "./skeletons/tasks-skeleton";

export const Tasks = () => {
	const [columns, setColumns] = useState<Record<string, ITask[]>>(SAMPLE_TASKS);

	return (
		<div className="flex flex-col gap-6">
			<PageHeading title="Tasks" subtitle="Manage your tasks efficiently" />
			<Suspense fallback={<TasksSkeleton />}>
				<Kanban.Root
					value={columns}
					onValueChange={setColumns}
					getItemValue={(item) => item.id}
				>
					<Kanban.Board className="grid sm:grid-cols-3 auto-rows-fr">
						{Object.entries(columns).map(([columnValue, tasks]) => (
							<Kanban.Column key={columnValue} value={columnValue}>
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<span className="font-semibold text-sm">
											{KANBAN_COLUMN_TITLES[columnValue]}
										</span>
										<Badge
											variant="secondary"
											className="rounded-sm pointer-events-none"
										>
											{tasks.length}
										</Badge>
									</div>
									<Kanban.ColumnHandle asChild>
										<Button variant="ghost" size="icon">
											<GripVertical className="w-4 h-4" />
										</Button>
									</Kanban.ColumnHandle>
								</div>
								<div className="flex flex-col gap-2 p-0.5">
									{tasks.map((task) => (
										<Kanban.Item key={task.id} value={task.id} asHandle asChild>
											<div className="bg-card shadow-xs p-3 border rounded-md">
												<div className="flex flex-col gap-2">
													<div className="flex justify-between items-center gap-2">
														<span className="font-medium text-sm line-clamp-1">
															{task.title}
														</span>
														<Badge
															variant={
																task.priority === "high"
																	? "destructive"
																	: task.priority === "medium"
																		? "default"
																		: "secondary"
															}
															className="px-1.5 rounded-sm h-5 text-[11px] capitalize pointer-events-none"
														>
															{task.priority}
														</Badge>
													</div>
													<div className="flex justify-between items-center text-muted-foreground text-xs">
														{task.assignee && (
															<div className="flex items-center gap-1">
																<div className="bg-primary/20 rounded-full size-2" />
																<span className="line-clamp-1">
																	{task.assignee}
																</span>
															</div>
														)}
														{task.dueDate && (
															<time className="tabular-nums text-[10px]">
																{task.dueDate}
															</time>
														)}
													</div>
												</div>
											</div>
										</Kanban.Item>
									))}
								</div>
							</Kanban.Column>
						))}
					</Kanban.Board>
					<Kanban.Overlay>
						<div className="bg-primary/10 rounded-md size-full" />
					</Kanban.Overlay>
				</Kanban.Root>
			</Suspense>
		</div>
	);
};
