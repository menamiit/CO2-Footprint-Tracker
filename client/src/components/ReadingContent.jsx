import React from "react";

const ReadingContent = () => {
    return (
        <div className="flex flex-col gap-10 md:flex-row my-10 mx-auto max-w-7xl px-4">
            {/* Reading Content (7 parts) */}
            <div className="flex-[7] flex flex-col justify-center">
                <p className="max-w-3xl text-lg leading-relaxed mb-6">
                    <em>
                        Every day, our activities—like driving, using electricity, or even eating—release carbon dioxide (CO2) and other greenhouse gases into the atmosphere.
                        These emissions contribute to climate change by trapping heat and disrupting global ecosystems. Your carbon footprint is the total amount of CO2
                        generated by your actions, and understanding it is the first step toward reducing your environmental impact.
                        <br /><br />
                        <span className="font-semibold">Welcome to CO2 Tracker—Your Personal Carbon Tracker!</span>
                        <br />
                        Our app makes it easy to monitor and reduce your carbon footprint by tracking daily activities, from transportation to energy usage.
                        Simply log your actions, get real-time emission insights, and discover eco-friendly alternatives. Whether you're commuting, shopping, or traveling,
                        we help you make smarter choices for a greener future. Start your sustainability journey today!
                    </em>
                </p>
                <img 
                    className="rounded-lg shadow max-w-xl w-full h- mx-auto mt-4" 
                    src="src\assets\per-capita-co-emissions.png" 
                    alt="Per capita CO2 emissions"
                />
            </div>
            
            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-gray-300 mx-8 rounded-full" />

            {/* News Feed (3 parts) */}
            <div className="flex-[3]">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">News Feed</h2>
                    <ul className="space-y-6">
                        <li>
                            <a className="group block hover:bg-gray-100 rounded-lg p-2 transition" 
                               href="https://wmo.int/media/news/record-carbon-emissions-highlight-urgency-of-global-greenhouse-gas-watch" 
                               target="_blank" 
                               rel="noopener noreferrer"
                            >
                                <img 
                                    src="https://wmo.int/sites/default/files/styles/featured_image_x2_1536x1024_/public/2024-11/thumbnails_7.jpg?h=d1cb525d&itok=czdcGm9Z"
                                    alt="News article"
                                    className="rounded-xl w-full h-44 object-cover mb-2"
                                />
                                <span className="underline group-hover:text-blue-700">
                                    Record carbon emissions highlight urgency of Global Greenhouse Gas Watch
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="group block hover:bg-gray-100 rounded-lg p-2 transition" 
                               href="https://www.frontiersin.org/news/2025/06/19/ai-prompts-50-times-more-co2-emissions"
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                <img 
                                    src="https://images.ctfassets.net/mrbo2ykgx5lt/16ADlwl0bfiq9ArC6jXIoR/3770cf90ebc98c2f462643da31a698d1/Horizontal-Team_of_hackers_brainstorming_using_laptop_at_hackathon_in_workshop.png?&w=912&fm=webp&q=80"
                                    alt="News article"
                                    className="rounded-xl w-full h-44 object-cover mb-2"
                                />
                                <span className="underline group-hover:text-blue-700">
                                    Some of your AI prompts could cause 50 times more CO2 emissions than others
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ReadingContent;
