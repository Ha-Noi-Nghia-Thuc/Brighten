import { Link } from "react-router-dom";

const CreatePost = () => {
    const data = {
        profileImg: "/avatars/boy1.png",
    };

    return (
        <div className='flex p-4 items-start gap-4 border-b border-r border-l border-gray-700'>
            <div className='avatar'>
                <div className='w-8 rounded-full'>
                    <Link to="/profile" ><img src={data.profileImg || "/avatar-placeholder.png"} /></Link>
                </div>
            </div>
            <div className='flex flex-row gap-2 w-full'>
                <textarea
                    className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
                    placeholder='What is happening?!'
                    onClick={() => document.getElementById('createPostModal').showModal()}
                />
                <button onClick={() => document.getElementById('createPostModal').showModal()} className='btn btn-primary rounded-full btn-sm text-white px-4'>
                    Post
                </button>
            </div>
        </div>
    );
};
export default CreatePost;