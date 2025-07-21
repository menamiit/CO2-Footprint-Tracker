import React, { useState } from "react";
import { ArrowRight } from 'lucide-react';

const ReadingContent = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Main Content Column */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Why Tracking Matters</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                        <span>
                            Welcome to your personal carbon accounting tool. We make it simple to monitor and reduce your environmental impact by tracking daily activities—from your commute to your diet.
                        </span>
                        <span>
                            Every action we take contributes to our collective carbon footprint. By understanding your personal emissions, you gain the power to make informed, eco-friendly choices. Start your sustainability journey with us today and see the difference you can make.
                        </span>
                    </p>
                    <div className="bg-white dark:bg-gray-800 mt-8 p-6 rounded-2xl shadow-md">
                         <img 
                            className="rounded-lg w-full h-auto" 
                            src="https://www.siegwerk.com/fileadmin/_processed_/4/6/csm_SW_Carbon_footprint_88537f8f81.png"
                            alt="Per capita CO2 emissions chart"
                        />
                    </div>
                </div>
                
                {/* News Feed Column */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Latest Insights</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 group hover:shadow-xl transition-shadow duration-300">
                        <a href="https://wmo.int/media/news/record-carbon-emissions-highlight-urgency-of-global-greenhouse-gas-watch" target="_blank" rel="noopener noreferrer">
                            <img 
                                src="https://wmo.int/sites/default/files/styles/featured_image_x2_1536x1024_/public/2024-11/thumbnails_7.jpg?h=d1cb525d&itok=czdcGm9Z"
                                alt="News article"
                                className="rounded-xl w-full h-44 object-cover mb-4"
                            />
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                Record emissions highlight urgency of Global Greenhouse Gas Watch
                            </h3>
                            <span className="flex items-center mt-2 text-sm font-medium text-green-600 dark:text-green-400">Read More <ArrowRight size={16} className="ml-1" /></span>
                        </a>
                    </div>
                     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 group hover:shadow-xl transition-shadow duration-300">
                        <a href="https://www.frontiersin.org/news/2025/06/19/ai-prompts-50-times-more-co2-emissions" target="_blank" rel="noopener noreferrer">
                            <img 
                                src="https://images.ctfassets.net/mrbo2ykgx5lt/16ADlwl0bfiq9ArC6jXIoR/3770cf90ebc98c2f462643da31a698d1/Horizontal-Team_of_hackers_brainstorming_using_laptop_at_hackathon_in_workshop.png?&w=912&fm=webp&q=80"
                                alt="News article"
                                className="rounded-xl w-full h-44 object-cover mb-4"
                            />
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                Your AI prompts could cause 50x more CO2 emissions than others
                            </h3>
                             <span className="flex items-center mt-2 text-sm font-medium text-green-600 dark:text-green-400">Read More <ArrowRight size={16} className="ml-1" /></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>  
    )
}



export default ReadingContent;