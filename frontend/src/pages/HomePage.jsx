import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
            <div className="max-w-3xl text-center">
                <h2 className="text-4xl font-bold text-teal-400 mb-4">Welcome to the Ethical Hacking Simulator!</h2>
                <p className="text-lg text-gray-300 mb-8">
                    Test your skills, learn new techniques, and become a cybersecurity expert. Choose from various
                    real-world hacking challenges in a safe and educational environment.
                </p>
            </div>
            
            <section className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-3xl w-full mb-8">
                <h2 className="text-2xl font-semibold text-teal-400 mb-2">What is the Ethical Hacking Simulator?</h2>
                <p className="text-gray-300">
                    The Ethical Hacking Simulator is an interactive platform where users can test their hacking skills
                    in a controlled and legal environment. It provides various real-world hacking challenges that help
                    sharpen cybersecurity knowledge while learning ethical hacking principles.
                </p>
            </section>
            
            <section className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-3xl w-full mb-8">
                <h2 className="text-2xl font-semibold text-teal-400 mb-2">Key Features</h2>
                <ul className="text-gray-300 space-y-2 list-disc pl-5">
                    <li>Real-world hacking scenarios</li>
                    <li>Interactive hacking challenges</li>
                    <li>Progress tracking and leaderboard</li>
                    <li>Safe, legal, and educational environment</li>
                    <li>Community support and learning resources</li>
                </ul>
            </section>
            
            <button 
                onClick={() => navigate("/tasks")} 
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                <Play size={20} />
                <span>Start Tasks</span>
            </button>
        </div>
    );
};

export default HomePage;
