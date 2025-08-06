import PageHeading from "@/components/common/page-heading";
import { useMembersManageSWR } from "../hooks/use-members-manage-swr";
import { CreateMemberDialog } from "./create-member-dialog";
import MembersTable from "./members-table";

export const Members = () => {
    const { members, isLoadingMembers, membersError,
        createMember, isCreatingMember, createMemberError,
        deleteMember, isDeletingMember, deleteMemberError,
        bulkDeleteMembers, isBulkDeletingMembers, bulkDeleteMembersError,
        updateMember, isUpdatingMember, updateMemberError } = useMembersManageSWR();

    return (
        <div className="flex flex-col gap-6">
            <PageHeading title="Members"
                rightSections={<CreateMemberDialog
                    createMember={createMember}
                    isCreatingMember={isCreatingMember}
                    createMemberError={createMemberError}
                />}
            />
            <MembersTable
                membersData={members || []}
                isLoadingMembers={isLoadingMembers}
                membersError={membersError}

                updateMember={updateMember}
                isUpdatingMember={isUpdatingMember}
                updateMemberError={updateMemberError}

                deleteMember={deleteMember}
                isDeletingMember={isDeletingMember}
                deleteMemberError={deleteMemberError}


                bulkDeleteMembers={bulkDeleteMembers}
                isBulkDeletingMembers={isBulkDeletingMembers}
                bulkDeleteMembersError={bulkDeleteMembersError}
            />
        </div>
    );
};
