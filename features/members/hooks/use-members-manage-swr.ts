import { useCallback } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type { IMember } from "@/features/overview";
import { membersManageServices } from "../services/members-manage";

export const MEMBERS_MANAGE_CACHE_KEYS = {
	MEMBERS: "members",
	MEMBER_BY_ID: "member-by-id",
	CREATE_MEMBER: "create-member",
	UPDATE_MEMBER: "update-member",
	DELETE_MEMBER: "delete-member",
	BULK_UPDATE_MEMBERS: "bulk-update-members",
	BULK_DELETE_MEMBERS: "bulk-delete-members",
};

export const useMembersManageSWR = () => {
	const {
		data: members,
		error: membersError,
		isLoading: isLoadingMembers,
		mutate: mutateMembers,
	} = useSWR<IMember[]>(
		MEMBERS_MANAGE_CACHE_KEYS.MEMBERS,
		membersManageServices.getMembers,
		{
			onError: (error) => {
				toast.error("Failed to fetch members");
				console.error("Failed to fetch members:", error);
			},
		},
	);

	const {
		trigger: createMemberTrigger,
		isMutating: isCreatingMember,
		error: createMemberError,
		reset: resetCreateMember,
	} = useSWRMutation(
		MEMBERS_MANAGE_CACHE_KEYS.CREATE_MEMBER,
		async (_, { arg }: { arg: Omit<IMember, "id"> }) => {
			const response = await membersManageServices.createMember(arg);
			return response;
		},
		{
			onSuccess: () => {
				mutateMembers();
				toast.success("Member created successfully!");
			},
			onError: (error) => {
				toast.error("Failed to create member");
				console.error("Failed to create member:", error);
			},
		},
	);

	const {
		trigger: updateMemberTrigger,
		isMutating: isUpdatingMember,
		error: updateMemberError,
		reset: resetUpdateMember,
	} = useSWRMutation(
		MEMBERS_MANAGE_CACHE_KEYS.UPDATE_MEMBER,
		async (
			_,
			{ arg }: { arg: { id: string; data: Partial<Omit<IMember, "id">> } },
		) => {
			const response = await membersManageServices.updateMember(
				arg.id,
				arg.data,
			);
			return response;
		},
		{
			onSuccess: () => {
				mutateMembers();
				toast.success("Member updated successfully!");
			},
			onError: (error) => {
				toast.error("Failed to update member");
				console.error("Failed to update member:", error);
			},
		},
	);

	const {
		trigger: deleteMemberTrigger,
		isMutating: isDeletingMember,
		error: deleteMemberError,
		reset: resetDeleteMember,
	} = useSWRMutation(
		MEMBERS_MANAGE_CACHE_KEYS.DELETE_MEMBER,
		async (_, { arg }: { arg: string }) => {
			const response = await membersManageServices.deleteMember(arg);
			return response;
		},
		{
			onSuccess: () => {
				mutateMembers();
				toast.success("Member deleted successfully!");
			},
			onError: (error) => {
				toast.error("Failed to delete member");
				console.error("Failed to delete member:", error);
			},
		},
	);

	const {
		trigger: bulkDeleteMembersTrigger,
		isMutating: isBulkDeletingMembers,
		error: bulkDeleteMembersError,
		reset: resetBulkDeleteMembers,
	} = useSWRMutation(
		MEMBERS_MANAGE_CACHE_KEYS.BULK_DELETE_MEMBERS,
		async (_, { arg }: { arg: string[] }) => {
			const response = await membersManageServices.bulkDeleteMembers(arg);
			return response;
		},
		{
			onSuccess: (deletedCount: number) => {
				mutateMembers();
				toast.success(`${deletedCount} members deleted successfully!`);
			},
			onError: (error) => {
				toast.error("Failed to delete members");
				console.error("Failed to delete members:", error);
			},
		},
	);

	const createMember = useCallback(
		async (params: Omit<IMember, "id">) => {
			return await createMemberTrigger(params);
		},
		[createMemberTrigger],
	);

	const updateMember = useCallback(
		async (id: string, data: Partial<Omit<IMember, "id">>) => {
			return await updateMemberTrigger({ id, data });
		},
		[updateMemberTrigger],
	);

	const deleteMember = useCallback(
		async (id: string) => {
			return await deleteMemberTrigger(id);
		},
		[deleteMemberTrigger],
	);

	const bulkDeleteMembers = useCallback(
		async (ids: string[]) => {
			return await bulkDeleteMembersTrigger(ids);
		},
		[bulkDeleteMembersTrigger],
	);

	const refreshMembers = useCallback(() => {
		return mutateMembers();
	}, [mutateMembers]);

	return {
		members,
		membersError,
		isLoadingMembers,

		createMember,
		updateMember,
		deleteMember,
		bulkDeleteMembers,
		refreshMembers,

		isCreatingMember,
		isUpdatingMember,
		isDeletingMember,
		isBulkDeletingMembers,

		createMemberError,
		updateMemberError,
		deleteMemberError,
		bulkDeleteMembersError,

		resetCreateMember,
		resetUpdateMember,
		resetDeleteMember,
		resetBulkDeleteMembers,
	};
};
