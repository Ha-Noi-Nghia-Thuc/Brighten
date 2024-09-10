import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../components/post/Posts";

import { POSTS } from "../utils/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
    const [profileImg] = useState(null);
    const [feedType, setFeedType] = useState("posts");

    // const profileImgRef = useRef(null)

    const { username } = useParams()
    // const isMyProfile = true;

    const { data: user, isLoading } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/user/profile/${username}`)
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        }
    })

    // const handleImgChange = (e, state) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             state === "profileImg" && setProfileImg(reader.result)
    //         }
    //         reader.readAsDataURL(file)
    //     }
    // }

    return (
        <>
            <div className='flex-[4_4_0] mr-auto min-h-screen max-w-screen-sm'>
                {/* HEADER */}
                {isLoading && <div />}
                {!isLoading && !user && <p className='text-center text-lg mt-4'>User not found</p>}
                <div className='flex flex-col'>
                    {!isLoading && user && (
                        <>
                            <div className='flex gap-10 px-4 py-2 items-center'>
                                <Link to='/'>
                                    <FaArrowLeft className='w-4 h-4' />
                                </Link>
                                <div className='flex flex-col'>
                                    <p className='font-bold text-lg'>{user?.fullName}</p>
                                    <span className='text-sm text-slate-500'>{POSTS?.length} posts</span>
                                </div>
                            </div>


                            <div className='flex flex-col gap-4 mt-14 px-4'>
                                <div className="flex flex-row justify-between items-center">
                                    <div className='flex flex-col gap-y-3'>
                                        <span className='text-sm text-slate-500'>@{user?.username}</span>
                                        <span className='text-sm my-1'>{user?.bio}</span>
                                    </div>

                                    {/* USER AVATAR */}
                                    <div className='avatar'>
                                        <div className='w-32 rounded-full relative group/avatar'>
                                            <img src={profileImg || user?.profileImg || "/avatar-placeholder.png"} />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex gap-2 flex-wrap'>
                                    {user?.link && (
                                        <div className='flex gap-1 items-center '>
                                            <>
                                                <FaLink className='w-3 h-3 text-slate-500' />
                                                <a
                                                    href='https://youtube.com/@asaprogrammer_'
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='text-sm text-blue-500 hover:underline'
                                                >
                                                    youtube.com/@asaprogrammer_
                                                </a>
                                            </>
                                        </div>
                                    )}
                                    <div className='flex gap-2 items-center'>
                                        <IoCalendarOutline className='w-4 h-4 text-slate-500' />
                                        <span className='text-sm text-slate-500'>Joined July 2021</span>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex gap-1 items-center'>
                                        <span className='text-sm font-bold'>{user?.following.length}</span>
                                        <span className='text-slate-500 text-sm'>Following</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <span className='text-sm font-bold'>{user?.followers.length}</span>
                                        <span className='text-slate-500 text-sm'>Followers</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full border-b border-gray-700 mt-4'>
                                <div
                                    className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer'
                                    onClick={() => setFeedType("posts")}
                                >
                                    Posts
                                    {feedType === "posts" && (
                                        <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
                                    )}
                                </div>
                                <div
                                    className='flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer'
                                    onClick={() => setFeedType("likes")}
                                >
                                    Likes
                                    {feedType === "likes" && (
                                        <div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <Posts />
                </div>
            </div>
        </>
    );
};
export default ProfilePage;