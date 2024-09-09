import { Link } from "react-router-dom";
import { IoHomeOutline, IoPersonOutline, IoHeartOutline, IoAddOutline, IoSettingsOutline, IoSearchOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
    const queryClient = useQueryClient()
    const { mutate: logoutMutation } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST"
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        },
        onError: () => {
            toast.error("Logout failed")
        }
    })


    return (
        <div className='hidden md:block md:flex-[2_2_0] w-18 max-w-72'>
            <div className='sticky py-4 top-0 left-0 h-screen flex flex-col justify-between w-20 md:w-full'>
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
                                onClick={() => document.getElementById('createPostModal').showModal()}
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
                    <div tabIndex={0} role="button" className="btn"><IoSettingsOutline className='w-7 h-7' /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a onClick={(e) => {
                            e.preventDefault();
                            logoutMutation()
                        }}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
