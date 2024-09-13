// Appbar.tsx
import { Link } from 'react-router-dom';
import UserProfileIcon from './UserProfileIcon';

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between items-center px-10 py-4">
            <Link to="/Blogs" className="flex items-center cursor-pointer text-xl">
                Medium Blog
            </Link>
            <div className="flex items-center">
                <Link to="/publish">
                    <button
                        type="button"
                        className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                        Create Blog
                    </button>
                </Link>
                <UserProfileIcon />
            </div>
        </div>
    );
};
