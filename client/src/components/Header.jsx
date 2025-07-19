import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNavigation = (path) => {
        setSidebarOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="relative bg-[#2d3b3e] text-white min-h-[300px] flex flex-col md:flex-row items-center p-8">

            {/* Sidebar Toggle Button */}
            <div className="absolute top-0 left-0 p-4 md:p-6">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                    ☰ Menu
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white text-black z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300`}
            >
                <div className="p-6 text-xl font-bold border-b border-gray-700">
                    Navigation
                </div>
                <ul className="mt-4">
                    <li
                        onClick={() => handleNavigation("/")}
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                    >
                        Home
                    </li>
                    <li
                        onClick={() => handleNavigation("/Dashboard")}
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                    >
                        Dashboard
                    </li>
                    <li
                        onClick={() => handleNavigation("/Profile")}
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                    >
                        Profile
                    </li>
                    <li
                        onClick={()=>handleNavigation("/Leaderboard")}
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                    >
                        Leaderboard
                    </li>
                    <li
                        onClick={handleLogout}
                        className="p-4 hover:bg-red-600 cursor-pointer hover:text-white text-red-400"
                    >
                        Logout
                    </li>
                </ul>
            </div>

            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0  bg-opacity-40 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Content */}
            <div className="flex-1">
                <h1 className="text-4xl font-bold">
                    Comprehensive Emissions Tracking
                </h1>
                <p className="text-xl mt-4 font-medium leading-relaxed">
                    Know Your Carbon. <br />
                    Cut Your Impact. <br />
                    Change the Future.
                </p>
                <div className="mt-8 flex flex-row sp">
                    <button
                        onClick={() => navigate("/Dashboard")}
                        className="w-45 h-16 mr-10 px-6 py-3 text-lg bg-white text-black rounded hover:bg-gray-200 transition cursor-pointer"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate("/Leaderboard")}
                        className="w-45 h-16 px-6 py-3 text-lg bg-white text-black rounded hover:bg-gray-200 transition cursor-pointer"
                    >
                        Leaderboard
                    </button>
                </div>
            </div>

            {/* Banner */}
            <div className="flex-1 flex justify-center">
                <img
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXpjeXIyb294cmszeDQ1eXNsdnBsN3lmajZwY3AwcTdiYTEyMXRvZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1zRdobfLq13t8BuL72/giphy.gif"
                    alt="Map Banner"
                    className="w-[100%] rounded-xl"
                />
            </div>
        </div>
    );
}

export default Header;
