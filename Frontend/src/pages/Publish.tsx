import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (!title.trim() || !description.trim()) {
            alert("Title and content cannot be empty");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing post:", error);
            alert("Failed to publish post");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="flex justify-center pt-8 w-full">
                <div className="max-w-screen-lg w-full bg-white p-8 shadow-md rounded-lg">
                    <h1 className="text-2xl font-semibold mb-4 text-gray-800">Create a New Post</h1>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4"
                        placeholder="Enter the title"
                    />
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handlePublish}
                            type="submit"
                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-700 transition duration-200 ease-in-out"
                        >
                            Publish Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-4">
            <label htmlFor="editor" className="sr-only">Write your post</label>
            <textarea
                onChange={onChange}
                id="editor"
                rows={10}
                className="block w-full px-4 py-2 text-gray-900 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your article here..."
                required
            />
        </div>
    );
}
