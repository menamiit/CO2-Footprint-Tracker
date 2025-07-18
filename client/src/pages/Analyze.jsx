import React, { useState, useEffect, useMemo } from 'react';
import { Leaf, Car, Bus, Plane, Bolt, Beef } from 'lucide-react';


const AnimatedCounter = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const animation = requestAnimationFrame(() => {
            setDisplayValue(value);
        });
        return () => cancelAnimationFrame(animation);
    }, [value]);

    return (
        <span className="font-bold text-5xl md:text-6xl text-green-500 transition-all duration-500">
            {displayValue.toFixed(2)}
        </span>
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



const Dashboard = ()=> {
    const [activities, setActivities] = useState({
        car: 0,
        bus: 0,
        train: 0,
        flight: 0,
        electricity: 5,
        redMeat: 0,
    });

    const [totalFootprint, setTotalFootprint] = useState(0);

    const emissionFactors = useMemo(() => ({
        car: 0.21,
        bus: 0.105,
        train: 0.041,
        flight: 0.25,
        electricity: 0.71,
        redMeat: 2.66,              
    }), []);

    const handleInputChange = (activity) => (e) => {
        setActivities(prev => ({ ...prev, [activity]: Number(e.target.value) }));
    };

    useEffect(() => {
        const calculateFootprint = () => {
            const carFootprint = activities.car * emissionFactors.car;
            const busFootprint = activities.bus * emissionFactors.bus;
            const trainFootprint = activities.train * emissionFactors.train;
            const flightFootprint = activities.flight * emissionFactors.flight;
            const electricityFootprint = activities.electricity * emissionFactors.electricity;
            const redMeatFootprint = activities.redMeat * emissionFactors.redMeat;

            const total = carFootprint + busFootprint + trainFootprint + flightFootprint + electricityFootprint + redMeatFootprint;
            setTotalFootprint(total);
        };

        calculateFootprint();
    }, [activities, emissionFactors]);

    const getFootprintMessage = () => {
        if (totalFootprint <= 5) return "Excellent! You have a very low carbon footprint.";
        if (totalFootprint <= 15) return "Good job! There are still ways to reduce your impact.";
        if (totalFootprint <= 30) return "Your footprint is a bit high. Consider more sustainable choices.";
        return "Your carbon footprint is significant. Let's work on reducing it.";
    };

    const footprintPercentage = Math.min((totalFootprint / 40) * 100, 100);

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                <header className="text-center mb-8 md:mb-12">
                    <div className="flex justify-center items-center gap-3">
                        <Leaf className="w-10 h-10 text-green-500" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            CO<sub className="text-2xl">2</sub> Footprint Calculator
                        </h1>
                    </div>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        See how your daily activities impact the environment and learn how to make a difference.
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

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Daily Footprint</h3>

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
                                <p>This is an estimate of the greenhouse gases produced by your activities today. The average daily footprint varies globally, but every small reduction helps!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;