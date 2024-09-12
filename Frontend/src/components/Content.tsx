
interface blogData {
    title: string,
    content: string
}
export const Content = ({ title, content }: blogData) => {
    return (
        <div className="grid grid-cols-4 h-screen items-center">
            <div className="col-span-3 pl-4 pr-10">
                <div className="text-3xl pb-4">
                    {title}
                </div>
                <div className="font-serif text-lg">
                    {content}
                </div>
            </div>

            <div className="col-span-1">
                <div className="max-w-md text-lg font-semibold text-left">
                    Author
                </div>
                <div className="max-w-md text-sm font-medium ">

                </div>
            </div>
        </div>
    )
}