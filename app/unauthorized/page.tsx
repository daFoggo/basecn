import { ErrorPage } from "@/components/common/error-page";

const UnauthorizedPage = () => {
  return (
    <ErrorPage
      errorCode={401}
      showHomeButton={true}
      showContactButton={false}
    />
  )
}

export default UnauthorizedPage;