import React, { useState, useEffect, useMemo } from 'react';
import { Leaf, Car, Bus, Plane, Bolt, Beef, Lightbulb } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const PersonalizedSuggestions = ({ emissions }) => {
  const suggestions = {
    transport: {
      title: "Focus on Your Commute",
      tip: "Your travel habits are a major contributor. Try carpooling, using public transport more often, or cycling for short trips to make a big difference.",
      icon: <Car className="w-6 h-6 text-blue-500" />
    },
    flight: {
      title: "Rethink Air Travel",
      tip: "Flights have a significant impact. Consider high-speed trains for shorter distances or combine multiple trips into one to reduce your flight frequency.",
      icon: <Plane className="w-6 h-6 text-purple-500" />
    },
    electricity: {
      title: "Optimize Home Energy",
      tip: "Your electricity usage is high. Switch to LED bulbs, unplug electronics when not in use, and consider a smart thermostat to cut down on energy waste.",
      icon: <Bolt className="w-6 h-6 text-yellow-500" />
    },
    redMeat: {
      title: "Adjust Your Diet",
      tip: "Red meat has a high carbon footprint. Try incorporating more plant-based meals into your week or swapping beef for chicken to reduce your impact.",
      icon: <Beef className="w-6 h-6 text-red-500" />
    }
  };

  // Find the category with the highest emission
  const highestEmitter = Object.keys(emissions).reduce((a, b) => emissions[a] > emissions[b] ? a : b);
  const suggestion = suggestions[highestEmitter];

  return (
    <div className="mt-6 text-left p-4 bg-red-50 border border-red-200 rounded-lg">
      <h4 className="font-bold text-gray-800 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        Personalized Tip
      </h4>
      <div className="flex items-start gap-3 mt-2">
        <div className="mt-1">{suggestion.icon}</div>
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [selectedMonth, setSelectedMonth] = useState(() => {

    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const [activities, setActivities] = useState({
    car: 0, bus: 0, train: 0, flight: 0, electricity: 5, redMeat: 0,
  });


  const emissionFactors = useMemo(() => ({
    car: 0.21, bus: 0.105, train: 0.041, flight: 0.25, electricity: 0.71, redMeat: 2.66,
  }), []);

  const emissionsByCategory = useMemo(() => {
    const daysInMonth = 30;
    const weeksInMonth = 4;
    return {
      transport: (activities.car * emissionFactors.car + activities.bus * emissionFactors.bus + activities.train * emissionFactors.train) * daysInMonth,
      flight: activities.flight * emissionFactors.flight,
      electricity: activities.electricity * emissionFactors.electricity * daysInMonth,
      redMeat: activities.redMeat * emissionFactors.redMeat * weeksInMonth,
    };
  }, [activities, emissionFactors]);

  const totalFootprint = useMemo(() => {
    const daysInMonth = 30;
    const weeksInMonth = 4;

    // All calculations are converted to a monthly basis
    const transportEmissions = (activities.car + activities.bus + activities.train) * emissionFactors.car * daysInMonth;
    const flightEmissions = activities.flight * emissionFactors.flight; // This is already a monthly value
    const electricityEmissions = activities.electricity * emissionFactors.electricity * daysInMonth;
    const redMeatEmissions = activities.redMeat * emissionFactors.redMeat * weeksInMonth;

    return transportEmissions + flightEmissions + electricityEmissions + redMeatEmissions;
  }, [activities, emissionFactors]);

  const handleInputChange = (key) => (e) => {
    setActivities(prev => ({
      ...prev,
      [key]: Number(e.target.value)
    }));
  };

  // Fetch activity for selected month
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

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
        console.error('Failed to fetch activity data:', error);
      }
    };

    fetchActivities();
  }, [selectedMonth]);

  // Save activity to DB when activities change, with debouncing
  useEffect(() => {
    const token = localStorage.getItem('token');

    const debounceSave = setTimeout(() => {
      axios.post('http://localhost:5000/api/activity', {
        month: selectedMonth,
        activities,
        totalFootprint
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch((err) => { console.log(err) });
    }, 500); // Debounce for 500ms

    return () => clearTimeout(debounceSave);
  }, [activities, totalFootprint, selectedMonth]); // Re-run when data changes



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
            <button className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 fixed left-0 ml-10 "
              type="button"
              onClick={() => { handleNavigation('/') }}>
              Home
            </button>
            <Leaf className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              CO<sub className="text-2xl">2</sub> Footprint Calculator
            </h1>
          </div>
          <div className="mt-4 flex justify-center">
            <label className="mr-2 font-semibold">Select Month:</label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="border rounded px-2 py-1"
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
              {totalFootprint > 400 && <PersonalizedSuggestions emissions={emissionsByCategory} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;