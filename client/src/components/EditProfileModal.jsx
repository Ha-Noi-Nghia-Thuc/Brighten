import { useEffect, useState } from "react";
import useUpdateUserProfile from "../hooks/useUpdateProfile";

const EditProfileModal = ({ authUser }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        username: "",
        currentPassword: "",
        newPassword: "",
        email: "",
        phoneNumber: "",
        bio: "",
        link: "",
    });

    const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (authUser) {
            setFormData({
                firstName: authUser.firstName,
                lastName: authUser.lastName,
                gender: authUser.gender,
                username: authUser.username,
                currentPassword: "",
                newPassword: "",
                email: authUser.email,
                phoneNumber: authUser.phoneNumber,
                bio: authUser.bio,
                link: authUser.link,

            });
        }
    }, [authUser]);

    return (
        <>
            <button
                className='btn btn-outline rounded-full btn-sm'
                onClick={() => document.getElementById("edit_profile_modal").showModal()}
            >
                Edit profile
            </button>
            <dialog id='edit_profile_modal' className='modal'>
                <div className='modal-box border rounded-md border-gray-700 shadow-md'>
                    <h3 className='font-bold text-lg my-3'>Update Profile</h3>
                    <form
                        className='flex flex-col gap-4'
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateProfile(formData);
                        }}
                    >
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='text'
                                placeholder='First name'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.firstName}
                                name='firstName'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                placeholder='Last name'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.lastName}
                                name='lastName'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='text'
                                placeholder='Gender'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.gender}
                                name='firstName'
                                onChange={handleInputChange}
                            />

                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='text'
                                placeholder='Username'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.username}
                                name='email'
                                onChange={handleInputChange}
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.email}
                                name='email'
                                onChange={handleInputChange}
                            />

                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='password'
                                placeholder='Current Password'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.currentPassword}
                                name='currentPassword'
                                onChange={handleInputChange}
                            />
                            <input
                                type='password'
                                placeholder='New Password'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.newPassword}
                                name='newPassword'
                                onChange={handleInputChange}
                            />
                        </div>
                        <textarea
                            placeholder='Bio'
                            className='flex-1 input border border-gray-700 rounded p-2 input-md'
                            value={formData.bio}
                            name='bio'
                            onChange={handleInputChange}
                        />
                        <input
                            type='text'
                            placeholder='Link'
                            className='flex-1 input border border-gray-700 rounded p-2 input-md'
                            value={formData.link}
                            name='link'
                            onChange={handleInputChange}
                        />
                        <button className='btn btn-primary rounded-full btn-sm text-white'>
                            {isUpdatingProfile ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button className='outline-none'>close</button>
                </form>
            </dialog>
        </>
    );
};
export default EditProfileModal;