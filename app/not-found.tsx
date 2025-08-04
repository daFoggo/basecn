import { ErrorPage } from "@/components/common/error-page";

const NotFound = () => {
	return (
		<ErrorPage
			errorCode={404}
			showHomeButton={true}
			showContactButton={true}
			
		/>
	);
};

export default NotFound;
