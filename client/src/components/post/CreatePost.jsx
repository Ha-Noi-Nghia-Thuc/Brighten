import { useState } from "react";
import { Link } from "react-router-dom";

const CreatePost = () => {
    const [text, setText] = useState("");

    const data = {
        profileImg: "/avatars/boy1.png",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Post created successfully");
    };

    return (
        <div className='flex p-4 items-start gap-4 border-b border-gray-700'>
            <div className='avatar'>
                <div className='w-8 rounded-full'>
                    <Link to="/profile" ><img src={data.profileImg || "/avatar-placeholder.png"} /></Link>
                </div>
            </div>
            <form className='flex flex-row gap-2 w-full' onSubmit={handleSubmit}>
                <textarea
                    className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
                    placeholder='What is happening?!'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                    Post
                </button>
            </form>
        </div>
    );
};
export default CreatePost;