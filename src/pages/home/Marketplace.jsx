import React from 'react';
import { useNavigate } from "react-router-dom";

function Marketplace() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen font-sans text-gray-900" style={{ background: '#F8F9FF' }}>

            <nav
                className="flex items-center justify-between px-12 py-6 sticky top-0 z-50"
                style={{ background: '#0F0E2A' }}
            >
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold tracking-[0.2em] text-white">Maildoll</h1>
                    <span className="text-[10px] tracking-[0.5em] uppercase text-gray-400">Marketplace</span>
                </div>
                <div className="flex space-x-8 font-medium text-white">
                    <a href="/" className="hover:text-[#06B6D4]">Home</a>
                    <a href="/about" className="hover:text-[#06B6D4]">About Us</a>
                </div>
            </nav>

            <main
                className="relative mx-4 md:mx-12 rounded-sm p-8 md:p-20 overflow-hidden min-h-[600px]"
                style={{ background: 'linear-gradient(160deg, #F8F9FF 0%, #EEF0FF 60%, #E4E7FF 100%)' }}
            >
                <div
                    className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
                        transform: 'translate(30%, -30%)'
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
                        transform: 'translate(-30%, 30%)'
                    }}
                />

                <div className="absolute top-10 left-10 grid grid-cols-6 gap-2 opacity-20">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"></div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">

                    <div className="z-10">
                        <h2 className="text-6xl md:text-8xl font-serif leading-tight text-[#0F0E2A]">
                            Get Start Your <br />
                            Marketing <br />
                            Campaign <br />
                            Today
                        </h2>
                        <p className="mt-8 text-lg text-gray-500 max-w-md leading-relaxed">
                            Start your email marketing journey with powerful tools.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">

                            <button
                                onClick={() => navigate("/pricing")}
                                className="flex items-center gap-3 border-2 border-[#4F46E5] px-6 py-3 rounded-md hover:bg-[#4F46E5] hover:text-white transition"
                            >
                                <span className="text-xl font-bold">$</span>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase leading-none">Get it now</p>
                                    <p className="font-bold">See Pricing</p>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 border-2 border-[#06B6D4] px-6 py-3 rounded-md hover:bg-[#06B6D4] hover:text-white transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                                </svg>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase leading-none">Upload CSV</p>
                                    <p className="font-bold">CSV Viewer</p>
                                </div>
                            </button>

                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end z-10">
                        <div className="bg-white p-1 border-2 border-[#4F46E5] rounded-3xl w-full max-w-sm shadow-xl">
                            <div className="p-8">
                                <div className="flex justify-center mb-4">
                                    <span className="text-5xl font-light text-gray-400">0</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full mb-8 relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#4F46E5] rounded-full border-2 border-white"></div>
                                </div>
                                <div className="bg-[#EEF0FF] rounded-2xl p-10 text-center mb-6">
                                    <h3 className="text-5xl font-medium text-[#0F0E2A]">$0</h3>
                                    <div className="mt-4 flex items-center justify-center text-[#06B6D4] gap-2">
                                        <select className="bg-transparent font-medium focus:outline-none">
                                            <option>Select Country</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate("/pricing")}
                                    className="w-full text-white py-4 rounded-xl flex items-center justify-center gap-4 transition"
                                    style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
                                >
                                    <div className="text-left">
                                        <p className="text-[10px] opacity-70 leading-none">Get the CSV</p>
                                        <p className="font-semibold">Purchase Now</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="py-24 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                    <h2 className="text-5xl font-bold tracking-[0.2em] text-[#0F0E2A]">Maildoll</h2>
                    <p className="text-xs tracking-[0.6em] uppercase text-gray-500 mt-2">Marketplace</p>
                    <p className="text-sm text-gray-400 mt-4 italic">Copyright @ 2026</p>
                </div>
            </footer>

        </div>
    );
}

export default Marketplace;