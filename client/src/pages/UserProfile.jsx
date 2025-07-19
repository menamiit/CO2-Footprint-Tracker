import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="8" r="4" strokeWidth="2" />
        <path strokeWidth="2" d="M4 20c0-4 8-4 8-4s8 0 8 4" />
    </svg>
);

const ArrowLeft = ({ size = 18 }) => (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Failed to fetch Profile:", err);
                setError("Could not load the User Profile. Please try again later.");
            }
        }
        getUser();
    }, []);

    const getFootprintLevel = (footprint) => {
        if (footprint < 50) return { level: "Very Low", color: "text-green-500", bgColor: "bg-green-100" };
        if (footprint < 150) return { level: "Medium", color: "text-yellow-500", bgColor: "bg-yellow-100" };
        if (footprint < 300) return { level: "High", color: "text-orange-500", bgColor: "bg-orange-100" };
        return { level: "Very High", color: "text-red-500", bgColor: "bg-red-100" };
    };

    if (error) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center text-gray-500">
                    Loading profile...
                </div>
            </div>
        );
    }

    const footprintStatus = getFootprintLevel(user.totalFootprint);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4 border-4 border-white">
                        <User className="w-12 h-12 text-indigo-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                    <p className="text-md text-gray-500 mt-1">{user.email}</p>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Monthly Carbon Footprint
                    </h2>
                    <p className="text-5xl font-bold text-indigo-600">
                        {user.totalFootprint?.toLocaleString()}
                        <span className="text-2xl font-medium text-gray-500"> kg CO₂e</span>
                    </p>
                    <div className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold inline-block ${footprintStatus.bgColor} ${footprintStatus.color}`}>
                        Footprint Level: {footprintStatus.level}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="cursor-pointer flex items-center justify-center gap-2 w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export { ProfilePage };