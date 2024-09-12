export const Quote = () => {
    return (
        <div className="bg-slate-300 h-screen flex flex-col justify-center">
            <div className="flex justify-center "> {/* //this div should take whole space and should be in centre of the screen */}
                <div className="max-w-lg ">
                    <div className="text-3xl font-bold">
                        "The customer support I recieved was exceptional. The support team went above and beyond to address my concers."
                    </div>
                    <div className="mt-3">
                        <div className="max-w-md text-xl font-semibold text-left">
                            John Doe
                        </div>
                        <div className="max-w-md text-sm font-medium  text-slate-500">
                            CEO | A technologies
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}