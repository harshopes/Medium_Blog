import { useState } from "react";
import { UserIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
const UserProfileIcon = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        // Perform logout actions here (e.g., clearing token, redirecting to login)
        localStorage.removeItem("token"); // example: remove token
        navigate("/signin")// Redirect to login page
    };

    const handleMyBlogs = () => {
        navigate("/mineblogs")
    }
    return (
        <div className="relative">
            <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer rounded-full bg-gray-200 flex items-center justify-center w-10 h-10"
            >
                <UserIcon className="h-6 w-6 text-gray-600" />
            </div>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <button
                        onClick={handleMyBlogs}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                        MyBlogs
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                    </button>


                </div>
            )}
        </div>
    );
};

export default UserProfileIcon;
