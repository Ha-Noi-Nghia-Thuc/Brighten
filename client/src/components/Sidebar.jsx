import { Link } from "react-router-dom";
import { IoHomeOutline, IoPersonOutline, IoHeartOutline, IoAddOutline, IoSettingsOutline, IoSearchOutline } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className='hidden md:block md:flex-[2_2_0] w-18 max-w-72'>
            <div className='sticky py-4 top-0 left-0 h-screen flex flex-col justify-between border-r border-gray-700 w-20 md:w-full'>
                {/* Logo Section */}
                <div className='flex justify-start'>
                    <Link to='/' className='text-2xl font-bold'>
                        Brighten
                    </Link>
                </div>
                {/* Navigation Section */}
                <div className='flex flex-col items-start gap-3 flex-grow justify-center py-40'>
                    <ul className='flex flex-col gap-3'>
                        <li className='flex justify-start'>
                            <button
                                className='btn flex gap-3 items-center transition-all duration-300 py-2 cursor-pointer'
                            >
                                <IoHomeOutline className='w-7 h-7' />
                            </button>
                        </li>
                        <li className='flex justify-start'>
                            <button
                                className='btn flex gap-3 items-center transition-all duration-300 py-2 cursor-pointer'
                            >
                                <IoSearchOutline className='w-7 h-7' />
                            </button>
                        </li>
                        <li className='flex justify-start'>
                            <button
                                className='btn btn-outline flex gap-3 items-center transition-all duration-300 py-2 cursor-pointer'
                            >
                                <IoAddOutline className='w-7 h-7' />
                            </button>
                        </li>
                        <li className='flex justify-start'>
                            <button
                                className='btn flex gap-3 items-center transition-all duration-300 py-2 cursor-pointer'
                            >
                                <IoHeartOutline className='w-7 h-7' />
                            </button>
                        </li>
                        <li className='flex justify-start'>
                            <button
                                className='btn flex gap-3 items-center transition-all duration-300 py-2 cursor-pointer'
                            >
                                <IoPersonOutline className='w-7 h-7' />
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Settings Section */}
                <div className="flex flex-col items-start gap-3 flex-grow justify-center dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1"><IoSettingsOutline className='w-7 h-7' /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
