import { Link } from "react-router-dom";
import { IoHomeOutline, IoPersonOutline, IoHeartOutline, IoAddOutline, IoSearchOutline } from "react-icons/io5";

const NavBar = () => {
    return (
        <div className='fixed bottom-0 left-0 w-full md:hidden bg-gray-900 border-t border-gray-700 z-10'>
            <div className='flex justify-around items-center py-3'>
                <Link to='/' className='btn flex flex-col items-center'>
                    <IoHomeOutline className='w-7 h-7' />
                </Link>
                <Link to='/search' className='btn flex flex-col items-center'>
                    <IoSearchOutline className='w-7 h-7' />
                </Link>
                <Link to='/create' className='btn flex flex-col items-center'>
                    <IoAddOutline className='w-7 h-7' />
                </Link>
                <Link to='/favorites' className='btn flex flex-col items-center'>
                    <IoHeartOutline className='w-7 h-7' />
                </Link>
                <Link to='/profile' className='btn flex flex-col items-center'>
                    <IoPersonOutline className='w-7 h-7' />
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
