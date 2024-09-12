import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupType } from "@harshopes/medium-blog-zod"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (err) {
            alert(`Error while signing in ${err}`)
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col justify-center items-center">
                <div className="pb-3">
                    <div className="text-3xl  font-bold">
                        {type === "signin" ? "Login" : "Create an Account"}
                    </div>
                    <div className="font-medium  text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="underline text-blue-600 pl-1" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                    </div>
                </div>
                <div className="">
                    {type === "signup" && (
                        <LabeledInput label="Name" placeholder="Name" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} />
                    )}

                    <LabeledInput label="Email" placeholder="example@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabeledInput label="Password" placeholder="password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <div className="pt-3">
                        <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2">{type === "signup" ? "Sign up" : "Sign in"}</button>

                    </div>
                </div>
            </div>
        </div >
    )
}


interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string;
}

function LabeledInput({ label, placeholder, onChange, type }: LabeledInputType) {
    return (
        <div className="p-2">
            <label className=" mb-2 text-sm font-bold text-gray-900 " htmlFor="">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder={placeholder} />
        </div>
    )
}