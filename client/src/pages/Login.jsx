import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/UserService";

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleChange = (e)=> {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        try {
            const res = await loginUser(credentials);
            localStorage.setItem("token", res.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert("Login failed");
        }
    }

    const navigate = useNavigate();

    const handleClick = ()=> {
        navigate('/Register')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="your@email.com"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?
                    <button className="text-indigo-600 hover:text-indigo-500 font-medium" onClick={handleClick}>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Login;