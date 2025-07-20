import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { TrendingUp, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom Tooltip for a more polished look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <p className="font-semibold text-gray-800 dark:text-white">{`Month: ${label}`}</p>
        <p className="text-sm text-cyan-500">{`Footprint: ${payload[0].value.toFixed(2)} kg CO₂e`}</p>
      </div>
    );
  }
  return null;
};

// Loading Skeleton component
const ChartSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
    <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
  </div>
);

// No Data component
const NoDataState = () => (
  <div className="flex flex-col items-center justify-center h-[350px] text-center">
    <Info className="w-12 h-12 text-gray-400 mb-4" />
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No History Data Available</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Start tracking your activities on the dashboard to see your progress.</p>
  </div>
);


const FootGraph = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/history/graph', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        const formatted = data.map(item => ({
          // Shorten month format for better axis display e.g. "Jan '25"
          month: new Date(item._id).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          footprint: item.totalFootprint
        }));
        setHistory(formatted);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-gray-800 dark:to-indigo-900 flex items-center justify-center px-4">
      <button
        onClick={() => navigate('/')}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white hover:bg-gray-400 rounded-lg transition fixed top-0 left-0 m-10"
      >
        🏠︎ Home
      </button>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-1 text-gray-800 flex items-center gap-2">
          <TrendingUp className="text-cyan-500" />
          Your Footprint Trend
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">A monthly overview of your CO₂ emissions.</p>

        {history.length === 0 ? (
          <NoDataState />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={history}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorFootprint" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />   {/* Indigo-500 */}
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />    {/* Purple-300 */}
                </linearGradient>

              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" dark:stroke="#4a5568" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280' }} dark:tick={{ fill: '#a0aec0' }} />
              <YAxis tick={{ fill: '#6b7280' }} dark:tick={{ fill: '#a0aec0' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="footprint"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorFootprint)"
              />

            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default FootGraph;
