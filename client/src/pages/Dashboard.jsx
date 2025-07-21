import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Leaf, Car, Bus, Plane, Bolt, Beef, Lightbulb, BarChartHorizontal } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const months = [
  "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12"
];

const AnimatedCounter = ({ value, colorClass }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setDisplayValue(value);
    });
    return () => cancelAnimationFrame(animation);
  }, [value]);

  return (
    <span className={`font-bold text-5xl md:text-6xl ${colorClass} transition-colors duration-500`}>
      {displayValue.toFixed(2)}
    </span>
  );
};

const suggestionIcons = {
  transport: <Car className="w-6 h-6 text-blue-500" />,
  flight: <Plane className="w-6 h-6 text-purple-500" />,
  electricity: <Bolt className="w-6 h-6 text-yellow-500" />,
  redMeat: <Beef className="w-6 h-6 text-red-500" />,
  leaf: <Leaf className="w-6 h-6 text-green-500" />
};

const PersonalizedSuggestions = ({ suggestion }) => {
  if (!suggestion || !suggestion.icon) {
    return null;
  }

  return (
    <div className="mt-6 text-left p-4 bg-red-50 border border-red-200 rounded-lg">
      <h4 className="font-bold text-gray-800 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        Personalized Tip
      </h4>
      <div className="flex items-start gap-3 mt-2">
        <div className="mt-1">{suggestionIcons[suggestion.icon]}</div>
        <div>
          <p className="font-semibold text-gray-700">{suggestion.title}</p>
          <p className="text-sm text-gray-600">{suggestion.tip}</p>
        </div>
      </div>
    </div>
  );
};

const InputCard = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800 ml-3">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const SliderInput = ({ label, value, onChange, min, max, unit }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <div className="flex items-center space-x-4">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-lg font-semibold text-gray-900 w-24 text-right">{value} {unit}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [selectedMonth, setSelectedMonth] = useState(() => {

    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const [activities, setActivities] = useState({
    car: 0, bus: 0, train: 0, flight: 0, electricity: 0, redMeat: 0,
  });

  const [history, setHistory] = useState([]);
  const [suggestion, setSuggestion] = useState(null);


  const emissionFactors = useMemo(() => ({
    car: 0.21, bus: 0.105, train: 0.041, flight: 0.25, electricity: 0.71, redMeat: 2.66,
  }), []);

  const emissionsByCategory = useMemo(() => {
    return {
      transport: (activities.car * emissionFactors.car + activities.bus * emissionFactors.bus + activities.train * emissionFactors.train),
      flight: activities.flight * emissionFactors.flight,
      electricity: activities.electricity * emissionFactors.electricity,
      redMeat: activities.redMeat * emissionFactors.redMeat,
    };
  }, [activities, emissionFactors]);

  const totalFootprint = useMemo(() => {
    return Object.values(emissionsByCategory).reduce((sum, value) => sum + value, 0);
  }, [emissionsByCategory]);

  const handleInputChange = (key) => (e) => {
    setActivities(prev => ({
      ...prev,
      [key]: Number(e.target.value)
    }));
  };

  const handleApiError = useCallback((error) => {
    console.error('API Error:', error);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      logout();
    }
  }, [logout]);

  // Fetch activity for selected month
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { logout(); return; }

    const fetchActivities = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/activity/${selectedMonth}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data && res.data.activities) {
          setActivities(res.data.activities);
        } else {
          // Reset to default values if no data exists for the selected month
          setActivities({ car: 0, bus: 0, train: 0, flight: 0, electricity: 5, redMeat: 0 });
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchActivities();
  }, [selectedMonth, logout, handleApiError]);

  // Fetch activity history
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { logout(); return; }

    const fetchHistory = async () => {
      try {
        // Use axios for consistency and error handling
        const res = await axios.get('http://localhost:5000/api/activity/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        handleApiError(error);
      }
    };
    fetchHistory();
  }, [activities, totalFootprint, selectedMonth, logout, handleApiError]);

  // Save activity to DB when activities change, with debouncing
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const debounceSave = setTimeout(() => {
      axios.post('http://localhost:5000/api/activity', {
        month: selectedMonth,
        activities,
        totalFootprint
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(handleApiError);
    }, 500);

    return () => clearTimeout(debounceSave);
  }, [activities, totalFootprint, selectedMonth, handleApiError]);

  // Fetch personalized suggestion
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const debounceSaveAndFetch = setTimeout(async () => {
      try {
        await axios.post('http://localhost:5000/api/activity', {
          month: selectedMonth,
          activities,
          totalFootprint
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // THEN fetch updated history
        const res = await axios.get('http://localhost:5000/api/activity/history', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setHistory(Array.isArray(res.data) ? res.data : []);

      } catch (error) {
        handleApiError(error);
      }
    }, 300);

    return () => clearTimeout(debounceSaveAndFetch);
  }, [activities, totalFootprint, selectedMonth, handleApiError]);



  const getFootprintMessage = () => {
    if (totalFootprint <= 250) return "🌱 Excellent! Your monthly carbon footprint is impressively low.";
    if (totalFootprint <= 500) return "👍 Good work! There's still room to go greener.";
    if (totalFootprint <= 1000) return "⚠️ Your footprint is moderate. Consider more sustainable choices.";
    return "🚨 High monthly footprint detected. Let's make a plan to reduce it!";
  };


  const footprintPercentage = Math.min((totalFootprint / 1200) * 100, 100); // Target of 1200 kg CO2e/month

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex justify-center items-center gap-3">
            <button className="cursor-pointer rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 fixed left-0 ml-10 "
              type="button"
              onClick={() => { handleNavigation('/') }}>
              Home
            </button>
            <Leaf className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              CO<sub className="text-2xl">2</sub> Footprint Calculator
            </h1>
          </div>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Select Month:
            </label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="cursor-pointer text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See how your monthly activities impact the environment and learn how to make a difference.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            <InputCard icon={<Car className="w-8 h-8 text-blue-500" />} title="Daily Commute & Travel">
              <SliderInput label="Car Travel" value={activities.car} onChange={handleInputChange('car')} min="0" max="200" unit="km" />
              <SliderInput label="Bus Travel" value={activities.bus} onChange={handleInputChange('bus')} min="0" max="200" unit="km" />
              <SliderInput label="Train Travel" value={activities.train} onChange={handleInputChange('train')} min="0" max="200" unit="km" />
            </InputCard>

            <InputCard icon={<Plane className="w-8 h-8 text-purple-500" />} title="Long Distance Travel">
              <SliderInput label="Flight Travel (per month)" value={activities.flight} onChange={handleInputChange('flight')} min="0" max="5000" unit="km" />
            </InputCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputCard icon={<Bolt className="w-8 h-8 text-yellow-500" />} title="Home Energy">
                <SliderInput label="Electricity (daily)" value={activities.electricity} onChange={handleInputChange('electricity')} min="0" max="50" unit="kWh" />
              </InputCard>
              <InputCard icon={<Beef className="w-8 h-8 text-red-500" />} title="Diet">
                <SliderInput label="Red Meat (servings/week)" value={activities.redMeat} onChange={handleInputChange('redMeat')} min="0" max="14" unit="servings" />
              </InputCard>
            </div>
          </div>

          {/* ----------------Fooprint Card from here-------------------- */}

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Monthly Footprint</h3>

              <div className="relative flex justify-center items-center my-6">
                <svg className="transform -rotate-90" width="200" height="200" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="12"
                    strokeDasharray="339.292"
                    strokeDashoffset={339.292 - (footprintPercentage / 100) * 339.292}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <AnimatedCounter value={totalFootprint} />
                  <span className="text-lg text-gray-500">kg CO<sub className="text-xs">2</sub>e</span>
                </div>
              </div>

              <p className="text-gray-600 mt-4 h-12">
                {getFootprintMessage()}
              </p>

              <div className="mt-6 text-left text-sm text-gray-500">
                <h4 className="font-semibold text-gray-700 mb-2">What this means:</h4>
                <p>This is an estimate of the greenhouse gases produced by your activities this month. The average monthly footprint varies globally, but every small reduction helps!</p>
              </div>
              {suggestion && <PersonalizedSuggestions suggestion={suggestion} />}
            </div>
          </div>
        </div>

        {/* ------------------- Activity History Table ------------------- */}

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3"><BarChartHorizontal /> Month-wise History</h2>
          <div className="bg-green-800/50 rounded-2xl shadow-lg p-6 ring-1 ring-white/10">
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((entry) => (
                  <div key={entry.month} className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-500/80 transition-colors">
                    <span className="font-semibold text-gray-300">{new Date(entry.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</span>
                    <span className="font-bold text-lg text-green-400">{entry.totalFootprint?.toFixed(2) ?? 0} kg CO₂e</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">No past activity data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;