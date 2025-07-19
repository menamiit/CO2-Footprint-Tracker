import React, { useState, useEffect } from "react";
import { Trophy, ShieldCheck } from 'lucide-react';

// --- NEW: Leaderboard Page ---
function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/leaderboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                console.log("Leaderboard API response:", data);
                const users = Array.isArray(data) ? data : [];
                setUsers(users);
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
                setError("Could not load the leaderboard. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getLeaderboard();
    }, []);

    return (
        <div className="bg-white/60 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8 md:mb-12">
                    <div className="flex justify-center items-center gap-3">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                        <h1 className="text-4xl md:text-5xl font-bold text-black">
                            Monthly Leaderboard
                        </h1>
                    </div>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        See who's making the biggest impact by reducing their CO₂ footprint this month.
                    </p>
                </header>

                <div className="bg-yellow-100 rounded-2xl shadow-lg overflow-hidden">
                    {loading && <div className="p-8 text-center text-gray-500">Loading leaderboard...</div>}
                    {error && <div className="p-8 text-center text-red-500">{error}</div>}
                    {!loading && !error && Array.isArray(users) && users.length === 0 && (
                        <div className="p-8 text-center text-gray-500">No data yet for this month.</div>
                    )}
                    {!loading && !error && Array.isArray(users) && users.length > 0 && (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user, idx) => (
                                <li
                                    key={user.userId || user.name || idx}
                                    className="flex items-center p-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                >
                                    <div className="flex items-center w-16">
                                        <span className="text-2xl font-bold w-8 text-center">{idx + 1}</span>
                                        {idx < 3 && <Trophy size={20} className="ml-2 text-yellow-400" />}
                                    </div>
                                    <div className="flex items-center flex-grow">
                                        <span className="font-semibold text-gray-800 dark:text-black ">{user.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900 dark:text-green-400 ">{user.totalFootprint?.toFixed(1) ?? 0}</p>
                                        <p className="text-sm text-gray-500 dark:text-green-400">kg CO₂e</p>
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