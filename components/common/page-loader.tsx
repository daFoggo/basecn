import { Loader, LoaderProps } from "./loaders"

export const PageLoader = ({variant, size, text, className}: LoaderProps) => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center mx-auto container">
        <Loader variant={variant} size={size} text={text} className={className} />
    </div>
  )
}
