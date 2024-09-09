import { Link } from "react-router-dom";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const NotificationPage = () => {
    const [feedType, setFeedType] = useState("activity");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleFeedChange = (type) => {
        setFeedType(type);
        setDropdownOpen(false);
    };

    const feedOptions = [
        { type: "activity", label: "Activity" },
        { type: "request", label: "Requests" },
    ];

    const isLoading = false;
    const notifications = [
        {
            _id: "1",
            from: {
                _id: "1",
                username: "johndoe",
                profileImg: "/avatars/boy2.png",
            },
            type: "follow",
        },
        {
            _id: "2",
            from: {
                _id: "2",
                username: "janedoe",
                profileImg: "/avatars/girl1.png",
            },
            type: "like",
        },
    ];

    const deleteNotifications = () => {
        alert("All notifications deleted");
    };

    return (
        <>
            <div className='flex-[4_4_0] mr-auto min-h-screen max-w-screen-sm'>
                <div className='flex justify-between items-center pt-5 pb-14 border-b border-gray-700'>
                    {/* Left Side (You can add content here if needed) */}
                    <div></div>

                    {/* Center */}
                    <div className="flex justify-center items-center">
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

                    {/* Right Side */}
                    <div className='dropdown'>
                        <div tabIndex={0} role='button' className='m-1'>
                            <IoSettingsOutline className='w-4' />
                        </div>
                        <ul
                            tabIndex={0}
                            className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <a onClick={deleteNotifications}>Delete all notifications</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {isLoading && (
                    <div className='flex justify-center h-full items-center'>
                    </div>
                )}
                {notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications 🤔</div>}
                {notifications?.map((notification) => (
                    <div className='border-b border-r border-l border-gray-700' key={notification._id}>
                        <div className='flex items-center gap-2 p-4'>
                            <Link to={`/profile/${notification.from.username}`}>
                                <div className='avatar gap-2'>
                                    <div className='w-8 rounded-full'>
                                        <img src={notification.from.profileImg || "/avatar-placeholder.png"} />
                                    </div>
                                    <span className='font-bold'>@{notification.from.username}</span>{" "}
                                    {notification.type === "follow" ? "followed you" : "liked your post"}
                                </div>

                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default NotificationPage;
