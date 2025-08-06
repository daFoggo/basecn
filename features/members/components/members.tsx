import PageHeading from "@/components/common/page-heading"
import MembersTable from "./members-table"

export const Members = () => {
    return (
        <div className="flex flex-col gap-6">
            <PageHeading title="Members"/>
            <MembersTable/>
        </div>
    )
}
