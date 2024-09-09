import { useRef, useState, useEffect } from "react";
import { IoCloseOutline, IoImagesOutline, IoHappyOutline } from "react-icons/io5";

const CreatePostModal = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const imgRef = useRef(null);
    const textareaRef = useRef(null);

    const isPending = false;
    const isError = false;

    const data = {
        profileImg: "/avatars/boy1.png",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Post created successfully");
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";  // Reset height first
        textarea.style.height = `${textarea.scrollHeight}px`;  // Set to content height
    };

    useEffect(() => {
        autoResizeTextarea();  // Auto-resize on component mount and when the text changes
    }, [text]);

    return (
        <dialog id="createPostModal" className="modal">
            <div className='modal-box flex p-4 items-start gap-4 border-b border-gray-700'>
                <div className='avatar'>
                    <div className='w-8 rounded-full'>
                        <img src={data.profileImg || "/avatar-placeholder.png"} />
                    </div>
                </div>
                <form className='flex flex-col gap-2 w-full' method="dialog" onSubmit={handleSubmit}>
                    <textarea
                        ref={textareaRef}  // Attach ref for auto-resizing
                        className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none border-gray-800'
                        placeholder='What is happening?!'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ overflow: 'hidden' }}  // Hide the scrollbar
                    />
                    {img && (
                        <div className='relative w-72 mx-auto'>
                            <IoCloseOutline
                                className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                                onClick={() => {
                                    setImg(null);
                                    imgRef.current.value = null;
                                }}
                            />
                            <img src={img} className='w-full mx-auto h-72 object-contain rounded' />
                        </div>
                    )}

                    <div className='flex justify-between border-t py-2 border-t-gray-700'>
                        <div className='flex gap-3 items-center'>
                            <IoImagesOutline
                                className='fill-primary w-6 h-6 cursor-pointer'
                                onClick={() => imgRef.current.click()}
                            />
                            <IoHappyOutline className='fill-primary w-5 h-5 cursor-pointer' />
                        </div>
                        <input type='file' hidden ref={imgRef} onChange={handleImgChange} />
                        <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                            {isPending ? "Posting..." : "Post"}
                        </button>
                    </div>
                    {isError && <div className='text-red-500'>Something went wrong</div>}
                </form>
            </div>
        </dialog>
    );
};

export default CreatePostModal;
