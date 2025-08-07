"use client";
import type { Column, ColumnDef } from "@tanstack/react-table";
import { Ellipsis, FilePen, Trash2 } from "lucide-react";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type IMember, MEMBER_ROLE, MEMBER_STATUS } from "@/features/overview";
import type { DataTableRowAction } from "@/lib/types/data-table";
import { enumsToOptions } from "@/lib/utils/enums-to-options";
import { MemberRoleBadge } from "./member-role-badge";
import { MemberStatusBadge } from "./member-status-badge";

interface IGetMembersColumnConfig {
	setRowAction: Dispatch<SetStateAction<DataTableRowAction<IMember> | null>>;
}
export const getMembersColumnConfig = ({
	setRowAction,
}: IGetMembersColumnConfig): ColumnDef<IMember>[] => {
	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			size: 32,
			enableSorting: false,
			enableHiding: false,
		},
		{
			id: "index",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Index" />
			),
			cell: ({ row, table }) => {
				const sortedRows = table.getSortedRowModel().flatRows;
				const indexMap = useMemo(() => {
					const map = new Map();
					sortedRows.forEach((sortedRow, index) => {
						map.set(sortedRow.id, index + 1);
					});
					return map;
				}, [sortedRows]);

				const displayIndex = indexMap.get(row.id) || 1;

				return (
					<div className="font-medium text-muted-foreground text-center">
						{displayIndex}
					</div>
				);
			},
			meta: {
				label: "Index",
			},
			enableSorting: false,
			enableColumnFilter: false,
			size: 60,
		},
		{
			id: "id",
			accessorKey: "id",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="ID" />
			),
			cell: ({ cell }) => (
				<div className="bg-muted px-3 py-1 rounded-lg w-fit font-mono font-medium">
					{cell.getValue<IMember["id"]>()}
				</div>
			),
			meta: {
				label: "ID",
			},
			size: 30,
		},
		{
			id: "avatar",
			accessorKey: "avatar",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Avatar" />
			),
			cell: ({ row }) => (
				<div className="flex justify-center items-center">
					<Avatar>
						<AvatarImage src={row.original.avatar} alt={row.original.name} />
						<AvatarFallback>
							{row.original.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			),
			meta: {
				label: "Avatar",
			},
			enableSorting: false,
			size: 50,
		},
		{
			id: "name",
			accessorKey: "name",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			cell: ({ cell }) => <div>{cell.getValue<IMember["name"]>()}</div>,
			meta: {
				label: "Name",
				placeholder: "Search by name",
				variant: "text",
			},
			enableColumnFilter: true,
		},
		{
			id: "email",
			accessorKey: "email",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Email" />
			),
			cell: ({ cell }) => (
				<div className="font-mono text-sm">
					{cell.getValue<IMember["email"]>()}
				</div>
			),
			meta: {
				label: "Email",
				variant: "text",
			},
		},
		{
			id: "role",
			accessorKey: "role",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Role" />
			),
			cell: ({ cell }) => (
				<MemberRoleBadge role={cell.getValue<IMember["role"]>()} />
			),
			meta: {
				label: "Role",
				variant: "multiSelect",
				options: enumsToOptions(MEMBER_ROLE),
			},
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			id: "status",
			accessorKey: "status",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ cell }) => (
				<MemberStatusBadge status={cell.getValue<IMember["status"]>()} />
			),
			meta: {
				label: "Status",
				variant: "multiSelect",
				options: enumsToOptions(MEMBER_STATUS),
			},
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			id: "department",
			accessorKey: "department",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Department" />
			),
			cell: ({ cell }) => <div>{cell.getValue<IMember["department"]>()}</div>,
			meta: {
				label: "Department",
				variant: "text",
			},
		},
		{
			id: "joinedAt",
			accessorKey: "joinedAt",
			header: ({ column }: { column: Column<IMember, unknown> }) => (
				<DataTableColumnHeader column={column} title="Join Date" />
			),
			cell: ({ cell }) => (
				<div>
					{new Date(cell.getValue<IMember["joinedAt"]>()).toLocaleDateString(
						"vi-VN",
					)}
				</div>
			),
			meta: {
				label: "Join Date",
				variant: "dateRange",
				placeholder: "Search by join date",
			},
			size: 100,
			enableColumnFilter: true,
		},
		{
			id: "actions",
			cell: function Cell({ row }) {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								aria-label="Open menu"
								variant="ghost"
								className="flex data-[state=open]:bg-muted p-0 size-8"
							>
								<Ellipsis className="size-4" aria-hidden="true" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-40">
							<DropdownMenuItem
								onSelect={() => setRowAction({ row, variant: "update" })}
							>
								<FilePen className="mr-2" />
								Edit
							</DropdownMenuItem>

							<DropdownMenuSeparator />
							<DropdownMenuItem
								onSelect={() => setRowAction({ row, variant: "delete" })}
							>
								<Trash2 className="mr-2 text-destructive" />
								<span className="text-destructive">Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
			size: 40,
		},
	];
};
