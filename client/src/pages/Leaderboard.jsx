import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LogOut, User, LayoutDashboard, ArrowLeft, Trophy, ShieldCheck, BarChart2 } from 'lucide-react';
import axios from 'axios';

// --- NEW: Leaderboard Page ---
function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                const res = await fetch('/api/leaderboard');
                const data = await res.json();
                const users = Array.isArray(res.data) ? res.data : [];
                setUsers(users);
            } catch (err) {
                setError("Could not load the leaderboard. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getLeaderboard();
    }, []);

    const getRankColor = (rank) => {
        if (rank === 1) return "text-yellow-400";
        if (rank === 2) return "text-gray-400";
        if (rank === 3) return "text-yellow-600";
        return "text-gray-500 dark:text-gray-400";
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8 md:mb-12">
                    <div className="flex justify-center items-center gap-3">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Monthly Leaderboard
                        </h1>
                    </div>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        See who's making the biggest impact by reducing their CO₂ footprint this month.
                    </p>
                </header>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    {loading && <div className="p-8 text-center text-gray-500">Loading leaderboard...</div>}
                    {error && <div className="p-8 text-center text-red-500">{error}</div>}
                    {!loading && !error && (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => (
                                <li key={user.rank} className={`flex items-center p-4 transition-all duration-300 ${user.name === 'Alex Green' ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                    <div className="flex items-center w-16">
                                        <span className={`text-2xl font-bold w-8 text-center ${getRankColor(user.rank)}`}>{user.rank}</span>
                                        {user.rank <= 3 && <Trophy size={20} className={`ml-2 ${getRankColor(user.rank)}`} />}
                                    </div>
                                    <div className="flex items-center flex-grow">
                                        <span className="font-semibold text-gray-800 dark:text-white">{user.name}</span>
                                        {user.name === 'Alex Green' && <ShieldCheck size={18} className="ml-2 text-blue-500" title="This is you" />}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{user.footprint.toFixed(1)}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">kg CO₂e</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}


export default LeaderboardPage;