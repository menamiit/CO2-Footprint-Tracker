import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const handleClick = ()=> {
        navigate('/Analyze');
    }

    return (
        <div className="bg-[#2d3b3e] flex flex-col md:flex-row text-white min-h-[300px] items-center p-8">
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
                    <button className="px-6 py-3 text-base bg-white text-black rounded hover:bg-gray-200 transition cursor-pointer" onClick={handleClick}>
                        Track Your CO2 FOOTPRINT
                    </button>
                </div>
            </div>
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
