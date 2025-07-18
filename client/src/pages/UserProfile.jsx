import React from "react";
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
const LogOut = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
  </svg>
);

function ProfilePage() {
    const navigate = useNavigate();

    const user = {
        name: "Alex Green",
        email: "alex.green@example.com",
        totalFootprint: 1250.75,
        joinDate: "2024-01-15",
    };

    const getFootprintLevel = (footprint) => {
        if (footprint < 2000) return { level: "Low", color: "text-green-500", bgColor: "bg-green-100" };
        if (footprint < 5000) return { level: "Medium", color: "text-yellow-500", bgColor: "bg-yellow-100" };
        return { level: "High", color: "text-red-500", bgColor: "bg-red-100" };
    };

    const footprintStatus = getFootprintLevel(user.totalFootprint);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4 border-4 border-white">
                        <User className="w-12 h-12 text-indigo-500" />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-md text-gray-500 mt-1">{user.email}</p>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Annual Carbon Footprint
                    </h2>
                    <p className="text-5xl font-bold text-indigo-600">
                        {user.totalFootprint.toLocaleString()}
                        <span className="text-2xl font-medium text-gray-500"> kg CO₂e</span>
                    </p>
                    <div className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold inline-block ${footprintStatus.bgColor} ${footprintStatus.color}`}>
                        Footprint Level: {footprintStatus.level}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}


function LogoutPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <LogOut className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-4xl font-bold">You have been logged out.</h1>
        </div>
    );
}

function Header() {
    const navigate = useNavigate();
    
    const handleDashboardClick = () => navigate('/Dashboard');
    const handleLogout = () => navigate('/logout');
    const handleProfile = () => navigate('/profile');

    return (
        <div className="bg-[#2d3b3e] flex flex-col text-white min-h-[300px] p-4 md:p-8">
            <div className="w-full flex justify-between items-center mb-6">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white/10 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
                <button 
                    onClick={handleProfile}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white/10 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <User size={18} />
                    <span>Profile</span>
                </button>
            </div>
            <div className="flex flex-col md:flex-row items-center flex-grow">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold">
                        Comprehensive Emissions Tracking
                    </h1>
                    <p className="text-xl mt-4 font-medium leading-relaxed">
                        Know Your Carbon. <br/>
                        Cut Your Impact. <br />
                        Change the Future.
                    </p>
                    <div className="mt-8">
                        <button className="px-6 py-3 text-base bg-white text-black rounded-lg font-semibold shadow-md hover:bg-gray-200 transition-all transform hover:scale-105 cursor-pointer" onClick={handleDashboardClick}>
                            Track Your CO2 FOOTPRINT
                        </button>
                    </div>
                </div>
                <div className="flex-1 flex justify-center mt-10 md:mt-0">
                    <img
                        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXpjeXIyb294cmszeDQ1eXNsdnBsN3lmajZwY3AwcTdiYTEyMXRvZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1zRdobfLq13t8BuL72/giphy.gif"
                        alt="Map Banner"
                        className="w-full max-w-md rounded-xl shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
}

export { ProfilePage, LogoutPage, Header };