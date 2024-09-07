import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };


    return (
        <div className="my-5 h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Login To Your Account</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-4xl flex flex-col items-center space-y-8">
                <div className="w-full">
                    <div className="flex flex-col gap-y-2 items-center justify-center w-full p-6 bg-white shadow-md rounded-lg">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-semibold">Username</span>
                            </div>
                            <input type="text" name='username' onChange={handleInputChange} value={formData.username} placeholder="Username" className="input input-bordered w-full max-w-xs focus:outline-none" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-semibold">Password</span>
                            </div>
                            <input type="password" name='password' onChange={handleInputChange} value={formData.password} placeholder="Password" className="input input-bordered w-full max-w-xs focus:outline-none" />
                        </label>
                        <div className="flex space-x-4 mt-3">
                            <button className="btn btn-outline btn-success">Login</button>
                        </div>
                    </div>
                </div>
            </form>
            <p className='mt-3'>Don&apos;t have an account? <Link to="/register" className='underline'>Register</Link></p>
        </div>
    );
};

export default LoginPage;
