'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function StoreProfilePage() {
    const router = useRouter();
    const params = useParams();
    // id can be used here if needed: const { id } = params;

    const [activeTab, setActiveTab] = useState('Products');

    // Dummy data could be fetched based on params.id in a real app
    const storeData = {
        name: "Nordic Threads",
        category: "Fashion & Apparel",
        rating: 4.8,
        reviews: "1.2k",
        coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOmdH26kn6j2Xb0EW60B5iJxd7z_yEdUcTc7JDTIoX653IIW-RaGhNFCO9qkXQHkPt5WNF_swPowfSF5sqUB8TPT2YUcaJMVHj1O5Guqqs9XiAj6IYqaTYDmdwxWWTKU4TPt3H1Kod-WXwsczYmmHvUWsHw8xfVGZUHpH5sA_v09Mfo-BpBJAiXufgECoXyIufrTYLaOJRVnrB2JUkMlcXDV10GbmH9YoTfCEloSzqhysGPdglMsYAORzYuSYSBjmko_VJbkUZ_ns",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-K6i_Z98qZtAyXWUPjtVvHlxkhvr6u5h3jhPvNle50aMCMCgmw_IhNtYfNjDaZEWTZyWfgW6X0_y3qz4OOOD56MbccNRK-QrlAwnMjZVnj9m0cBuAo15TVSLYVX_MIkTt9uzKGa2c36Pwgo-wVdwHUfatONCbt_7UFjuCER_VXY0pAB918K-gdzvB2wdChV7n2baZuSIWjCAuYY9ECP6tEmLjcY71WRx7i1_qWo7T4pHWqU46UkuPCHHCN9RsnCp9Y97DO_bOxsY",
        address: "123 Fashion St",
        distance: "2.5 km away",
        phone: "+1 234-567...",
        hours: "Until 9 PM"
    };

    const products = [
        {
            id: 1,
            name: "Classic Cotton Tee",
            category: "Men's Apparel",
            price: 24.99,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7I-0J-WGUkrkEDbxKOBzeHoicaEHP-jtbagEr0s0azSWaCoHvBTphHmaCgCX51Be8-cMxv8JH1MuI7JB8Ie4GUvVvwV7vKZWaC2LhFJvVVu3GUJ6aD-QpShrhHXdT1Z0VPelbajBPjC4NmwERIrLWt6mHno-2WBOnmWk-eDqKA8bYc0b6ya8EGhET8hh32loiM928EeM4RqNXpz5L05lSxc_rUuD7fpUPiyk8_hw3pJ9sXeoDyw5jLFExW8gpu8JhM1hfHksCJ-8",
            tag: "NEW",
            tagColor: "bg-black/60",
            discount: null
        },
        {
            id: 2,
            name: "Urban Sport Sneakers",
            category: "Footwear",
            price: 89.99,
            originalPrice: 112.00,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiGfARD1psqfuExXsjipGD8ME1K-tr0kerrkC-sQhSE43hqqdW7s-lsZtgi0k72qAlu_LHWM5AZKXcYq9szKSPH8XOgq_eP8QaAqlRWLKGhvDLOnKFWhRgNsE72C0nwiOp14NWXi1M0yfI8SgWwIUaW3_WcVZa7fqUx9cfDzGZ6XUOTYMZrztqU9xQHq0xBgqFggkQgciIQ3uEHMQ1hf_dhN3tNRXtm1tSsnnx4RW42w8t2h3qw9hCkrh74uXzYTDK5TUwQCdGgVM",
            tag: "-20%",
            tagColor: "bg-red-500",
            discount: true
        },
        {
            id: 3,
            name: "Linen Summer Blouse",
            category: "Women's Tops",
            price: 45.00,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmtHL3osMcBXDMw2NEJHodwWsNXRCJjLp_wBqzeicSncbvEb6amJ9EKRaMSoVLHJIpvt61bMxi8yq0E7Ssj-c3aNht6OoLutkPn5g7bgTXsAB3tsV5UPuBiz3rDscovmwmwHVlOHbe8cnkyiRagFHyZbYHNjGdmOhtPcojNBZvcAiMZaNJ3N4X-CtT8w6MsgwxH7bM89YAYBT2kKxce6w2BfR9mOG6MozAREYpGlrG1x47QBbCgyLpd9JvISHqz_wF0ObcoIn4W_Q",
            tag: null,
            discount: null
        },
        {
            id: 4,
            name: "Vintage Denim Jacket",
            category: "Outerwear",
            price: 78.50,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFeEWWGauIWqI6hKy6nkX-K9uNUxZLNzrwoXqlwcmXEpYDFOltzg_W2FwtA0RaI-MrnJZxyFjgNvSm9K1kVFPHNoS1p8eFBXpuFHX_EgMEHU4VStF9CZG_M8YNprJaY95FL1vKLh9sI_bJFKCxaeavI4ymZomPAE8l-ERofZ0T9FNhjDWJgDIJGR6a6y6fuOEwIqSm4TquWe-yqfXyAHoiqdTryHqhyFyopcITNtiunWAK3rp4syXNLLbbNU4XbH22Ed9KTgc63Kc",
            tag: null,
            discount: null
        }
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-[#000000] shadow-xl overflow-hidden transition-colors duration-200">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-[#000000]/95 backdrop-blur-md p-4 justify-between border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => router.back()}
                    className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center truncate px-2">{storeData.name}</h2>
                <div className="flex w-10 items-center justify-end">
                    <button className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">more_vert</span>
                    </button>
                </div>
            </div>

            {/* Store Header Area */}
            <div className="flex flex-col w-full relative">
                {/* Cover Image */}
                <div className="w-full h-40 bg-gray-300 relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${storeData.coverImage}')` }}
                    >
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Profile Info & Logo */}
                <div className="px-4 relative pb-4">
                    <div className="flex justify-between items-end -mt-10 mb-3">
                        {/* Logo */}
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-[4px] border-background-light dark:border-[#000000] bg-white overflow-hidden shadow-sm">
                                <img alt="Store Logo" className="w-full h-full object-cover" src={storeData.logo} />
                            </div>
                            {/* Verified Badge */}
                            <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-0.5 border-2 border-background-light dark:border-[#000000] flex items-center justify-center" title="Verified Merchant">
                                <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                            </div>
                        </div>
                        {/* Follow Button */}
                        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-sm transition-transform active:scale-95 h-10 mb-2">
                            <span>Follow</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{storeData.name}</h1>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium text-xs border border-gray-200 dark:border-gray-700">{storeData.category}</span>
                            <div className="flex items-center gap-1 text-amber-500">
                                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                <span className="font-bold text-gray-900 dark:text-white">{storeData.rating}</span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal">({storeData.reviews} Reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Bar (Actions) */}
            <div className="px-4 py-2">
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
                    <div className="flex items-center gap-2 pl-1 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">{storeData.address}</span>
                            <span className="text-[10px] text-gray-500">{storeData.distance}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pl-1 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[18px]">call</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">Call Now</span>
                            <span className="text-[10px] text-gray-500">{storeData.phone}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pl-1 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">Open</span>
                            <span className="text-[10px] text-gray-500">{storeData.hours}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-[73px] z-40 bg-background-light dark:bg-[#000000] border-b border-gray-200 dark:border-gray-800">
                <div className="flex px-4">
                    <button
                        onClick={() => setActiveTab('Products')}
                        className={`flex-1 pb-3 pt-3 border-b-[3px] font-bold text-sm text-center relative transition-colors ${activeTab === 'Products' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('About')}
                        className={`flex-1 pb-3 pt-3 border-b-[3px] font-medium text-sm text-center transition-colors ${activeTab === 'About' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => setActiveTab('Reviews')}
                        className={`flex-1 pb-3 pt-3 border-b-[3px] font-medium text-sm text-center transition-colors ${activeTab === 'Reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        Reviews
                    </button>
                </div>
            </div>

            {/* Main Content Area: Products Tab */}
            <main className="flex-1 flex flex-col p-4 gap-5 min-h-[500px]">
                {/* Search & Filter Controls */}
                <div className="flex flex-col gap-4">
                    {/* Search Bar */}
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">search</span>
                        </div>
                        <input
                            className="block w-full rounded-xl border-none bg-white dark:bg-gray-800 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary shadow-sm"
                            placeholder={`Search in ${storeData.name}...`}
                            type="text"
                        />
                    </div>

                    {/* Gender Segmented Control */}
                    <div className="w-full bg-gray-200 dark:bg-gray-800 p-1 rounded-lg flex text-sm font-medium">
                        <button className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm rounded-md py-1.5 transition-all">All</button>
                        <button className="flex-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1.5 transition-colors">Men</button>
                        <button className="flex-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1.5 transition-colors">Women</button>
                        <button className="flex-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1.5 transition-colors">Kids</button>
                    </div>

                    {/* Category Chips */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        <button className="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold whitespace-nowrap shadow-sm">
                            New Arrivals
                        </button>
                        <button className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Tops & T-Shirts
                        </button>
                        <button className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Bottoms
                        </button>
                        <button className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Outerwear
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-4 pb-20">
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col bg-white/50 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="aspect-[3/4] w-full relative bg-gray-100 dark:bg-gray-700">
                                <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                                <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-gray-600 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                                {product.tag && (
                                    <div className={`absolute bottom-2 left-2 ${product.tagColor || 'bg-black/60'} backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded`}>
                                        {product.tag}
                                    </div>
                                )}
                            </div>
                            <div className="p-3 flex flex-col gap-1 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">{product.name}</h3>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                                <div className="mt-auto pt-2 flex items-center justify-between">
                                    {product.discount ? (
                                        <div className="flex flex-col leading-none">
                                            <span className="text-base font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                                            <span className="text-[10px] text-gray-400 line-through">${product.originalPrice?.toFixed(2)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-base font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                                    )}
                                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90">
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
