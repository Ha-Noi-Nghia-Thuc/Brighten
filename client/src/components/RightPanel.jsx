import { IoAddOutline } from "react-icons/io5";

const RightPanel = () => {
    return (
        <div className='hidden lg:flex flex-col justify-end h-screen my-4 mx-2'>
            <div className='p-4 rounded-md'>
                <button className="btn btn-outline absolute bottom-4">
                    <IoAddOutline className='w-7 h-7' />
                </button>
            </div>
        </div>
    );
};

export default RightPanel;
