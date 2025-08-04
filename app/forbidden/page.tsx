import { ErrorPage } from "@/components/common/error-page"

const ForbiddenPage = () => {
    return (
        <ErrorPage
            errorCode={403}
            showHomeButton={true}
            showContactButton={true}
        />
    )
}

export default ForbiddenPage;
