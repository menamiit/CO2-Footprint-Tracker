import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/UserService";

const UserRegister = () => {
    const [form, setForm] = useState({username: "", email: "", password: ""});
    
    const handleChange = (e)=> {
        setForm({...form, [e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try{
            const res = await registerUser(form);
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }

    };

    const navigate = useNavigate();

    const handleClick = ()=> {
        navigate('/login')
    }

    return (
        <div className="flex flex-col justify-center sm:h-screen p-4">
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                <div className="text-center mb-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Username</label>
                            <input name="username" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter username" onChange={handleChange}/>
                        </div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Email Id</label>
                            <input name="email" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                            <input name="password" type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer cursor-pointer">
                            Create an account
                        </button>
                    </div>
                    <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <button  className="text-blue-600 font-medium hover:underline ml-1 cursor-pointer" onClick={handleClick}>Login here</button></p>
                </form>
            </div>
        </div>
    );
}

export default UserRegister;