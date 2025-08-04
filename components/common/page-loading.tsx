import { Loader, type LoaderProps } from "./loaders";

export const PageLoading = ({ variant, size, text, className }: LoaderProps) => {
	return (
		<div className="flex flex-col flex-1 justify-center items-center mx-auto min-h-dvh container">
			<Loader variant={variant} size={size} text={text} className={className} />
		</div>
	);
};
