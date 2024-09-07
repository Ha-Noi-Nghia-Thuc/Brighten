import { useState } from "react";
import CreatePost from "../components/post/CreatePost";
import Posts from "../components/post/Posts";

const HomePage = () => {
    const [feedType, setFeedType] = useState("forYou");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleFeedChange = (type) => {
        setFeedType(type);
        setDropdownOpen(false);
    };

    const feedOptions = [
        { type: "forYou", label: "For You" },
        { type: "following", label: "Following" },
        { type: "liked", label: "Liked" },
    ];

    return (
        <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen max-w-screen-sm">
            {/* Header */}
            <div className="flex w-full justify-center items-center pt-5 pb-28 border-b border-gray-700">
                <div className="relative">
                    {/* Dropdown Button */}
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="font-medium cursor-pointer flex items-center"
                    >
                        {feedOptions.find((option) => option.type === feedType)?.label}
                        <svg
                            className={`ml-2 h-5 w-5 transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box shadow z-10 w-40 p-2 absolute"
                        >
                            {feedOptions.map(({ type, label }) => (
                                <li key={type} onClick={() => handleFeedChange(type)}>
                                    <div className="flex justify-between items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-200">
                                        <span>{label}</span>
                                        {feedType === type && (
                                            <svg
                                                className="h-5 w-5 text-primary"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* CREATE POST INPUT */}
            <CreatePost />

            {/* POSTS */}
            <Posts />
        </div>
    );
};

export default HomePage;
