import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, BarChart2, LayoutDashboard, User, LogOut, TrendingUp, Leaf } from 'lucide-react';

const Header = () => {
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
    
    const navLinks = [
        { name: "Dashboard", path: "/Dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Leaderboard", path: "/Leaderboard", icon: <BarChart2 size={20} /> },
        { name: "Analytics", path: "/analytics", icon: <TrendingUp size={20} /> },
        { name: "Profile", path: "/Profile", icon: <User size={20} /> },
    ];

    return (
        <div className="relative bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2d3b3e] to-gray-900 opacity-90"></div>
                <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="absolute top-0 left-0 p-4 md:p-6 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 cursor-pointer"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 text-black dark:text-white z-[60] shadow-2xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Navigation</h2>
                    <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} className="cursor-pointer text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                <ul className="mt-4">
                    {navLinks.map(link => (
                         <li key={link.name} onClick={() => handleNavigation(link.path)} className="flex items-center gap-4 p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                            {link.icon}
                            <span>{link.name}</span>
                        </li>
                    ))}
                </ul>
                <div className="absolute bottom-0 w-full p-4">
                     <button onClick={handleLogout} className="flex items-center gap-4 w-full p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg cursor-pointer transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setSidebarOpen(false)} />}

            <div className="relative max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        <span className="block">Understand Your Impact.</span>
                        <span className="block text-green-400">Change The Future.</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0">
                        Our platform provides the tools to track your carbon footprint, gain insights, and make smarter choices for a sustainable tomorrow.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => navigate("/Dashboard")}
                            className="cursor-pointer group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Start Tracking
                            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button
                            onClick={() => navigate("/Leaderboard")}
                            className="cursor-pointer inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                        >
                            View Leaderboard
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="flex-1 flex justify-center">
                    {/* Using an SVG for a cleaner, more modern look than a GIF */}
                    <Leaf className="w-64 h-64 lg:w-80 lg:h-80 text-green-500 opacity-30" strokeWidth={0.5} />
                </div>
            </div>
        </div>
    );
}

export default Header;