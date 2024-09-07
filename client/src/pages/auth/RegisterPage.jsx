import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        username: "",
        password: "",
        secretAnswer: "",
        email: "",
        phoneNumber: "",
        address: "",
        ward: "",
        district: "",
        city: ""
    });

    const securityQuestions = [
        "Where did you share your first kiss?",
        "What is the name of the place where you met your first love?",
        "What was the first gift you gave to someone you loved?",
        "What was the most romantic meal you've ever had?",
        "What is the nickname of someone you hold dear?"
    ];

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    useEffect(() => {
        // Fetch cities
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then(response => setCities(response.data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    const fetchDistricts = async (cityCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
            setDistricts(response.data.districts);
            setWards([]);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchWards = async (districtCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            setWards(response.data.wards);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleCityChange = (e) => {
        const selectedCityCode = e.target.value;
        setFormData({ ...formData, city: selectedCityCode });
        setDistricts([]);
        setWards([]);
        fetchDistricts(selectedCityCode);
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictCode = e.target.value;
        setFormData({ ...formData, district: selectedDistrictCode });
        setWards([]);
        fetchWards(selectedDistrictCode);
    };

    const handleWardChange = (e) => {
        setFormData({ ...formData, ward: e.target.value });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };


    return (
        <div className="my-5 w-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-4xl flex flex-col items-center space-y-8">
                <div className="w-full">
                    {step === 1 && (
                        <div className="flex flex-col gap-y-2 items-center justify-center w-full p-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                            {/* Inputs for Personal Information */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">First Name</span>
                                </div>
                                <input type="text" name='firstName' onChange={handleInputChange} value={formData.firstName} placeholder="First name" className="input input-bordered w-full max-w-xs focus:outline-none" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Last Name</span>
                                </div>
                                <input type="text" name='lastName' onChange={handleInputChange} value={formData.lastName} placeholder="Last name" className="input input-bordered w-full max-w-xs focus:outline-none" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Gender</span>
                                </div>
                                <select className="select select-bordered w-full max-w-xs" value={formData.gender}>
                                    <option disabled selected>Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Birthday</span>
                                </div>
                                <input type="date" name='dob' onChange={handleInputChange} value={formData.dob} className="input input-bordered w-full max-w-xs focus:outline-none" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Phone Number</span>
                                </div>
                                <input type="text" name='phoneNumber' onChange={handleInputChange} value={formData.phoneNumber} placeholder="(+84)989xxxxxx" className="input input-bordered w-full max-w-xs focus:outline-none" />
                            </label>
                            <button onClick={nextStep} className="btn btn-outline btn-success mt-3">Next</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col gap-y-2 items-center justify-center p-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-lg font-bold mb-4">Login Information</h2>
                            {/* Inputs for Login Information */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </div>
                                <input type="email" name='email' onChange={handleInputChange} value={formData.email} placeholder="example@mail.com" className="input input-bordered w-full max-w-xs focus:outline-none" />
                            </label>
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
                                <input type="text" name='password' onChange={handleInputChange} value={formData.password} placeholder="Password (min. 6 characters)" className="input input-bordered w-full max-w-xs focus:outline-none" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Security Question</span>
                                </div>
                                <select
                                    className="select select-bordered w-full focus:outline-none"
                                    name="secretQuestion"
                                    value={formData.secretQuestion}
                                    onChange={handleInputChange}
                                >
                                    <option disabled>Select a security question</option>
                                    {securityQuestions.map((question, index) => (
                                        <option key={index} value={question}>
                                            {question}
                                        </option>
                                    ))}
                                </select>
                                <input type="text" name='secretAnswer' onChange={handleInputChange} value={formData.secretAnswer} placeholder="Answer here" className="input input-bordered w-full max-w-xs focus:outline-none" />
                            </label>
                            <div className="flex space-x-4 mt-3">
                                <button onClick={prevStep} className="btn btn-outline btn-warning">Previous</button>
                                <button onClick={nextStep} className="btn btn-outline btn-success">Next</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col gap-y-2 items-center justify-center p-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-lg font-bold mb-4">Address Information</h2>
                            {/* Inputs for Address Information */}
                            {/* Country */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Country</span>
                                </div>
                                <select className="select select-bordered w-full max-w-xs focus:outline-none" disabled>
                                    <option disabled selected>Vietnam</option>
                                </select>
                            </label>
                            {/* City */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">City</span>
                                </div>
                                <select
                                    className="select select-bordered w-full max-w-xs focus:outline-none"
                                    onChange={handleCityChange}
                                    value={formData.city}
                                >
                                    <option value="" disabled>
                                        {formData.city ? "Select City" : "Select City"}
                                    </option>
                                    {cities.map((city) => (
                                        <option key={city.code} value={city.code}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* District */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">District</span>
                                </div>
                                <select
                                    className="select select-bordered w-full max-w-xs focus:outline-none"
                                    onChange={handleDistrictChange}
                                    value={formData.district}
                                    disabled={!districts.length}
                                >
                                    <option value="" disabled>
                                        {formData.district ? "Select District" : "Select District"}
                                    </option>
                                    {districts.length === 0 ? (
                                        <option>Loading...</option>
                                    ) : (
                                        districts.map((district) => (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </label>

                            {/* Ward */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Ward</span>
                                </div>
                                <select
                                    className="select select-bordered w-full max-w-xs focus:outline-none"
                                    onChange={handleWardChange}
                                    value={formData.ward}
                                    disabled={!wards.length}
                                >
                                    <option value="" disabled>
                                        {formData.ward ? "Select Ward" : "Select Ward"}
                                    </option>
                                    {wards.length === 0 ? (
                                        <option>Loading...</option>
                                    ) : (
                                        wards.map((ward) => (
                                            <option key={ward.code} value={ward.code}>
                                                {ward.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </label>
                            {/* Address */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text font-semibold">Full Address</span>
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Full address"
                                    className="input input-bordered w-full max-w-xs focus:outline-none"
                                />
                            </label>
                            <div className="flex space-x-4 mt-3">
                                <button onClick={prevStep} className="btn btn-outline btn-warning">Previous</button>
                                <button className="btn btn-outline btn-success">Register</button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
            <p className='mt-3'>Already have an account? <Link to="/login" className='underline'>Login</Link></p>
        </div>
    );
};

export default RegisterPage;
