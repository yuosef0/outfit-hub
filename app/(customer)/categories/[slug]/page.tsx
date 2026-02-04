'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryDetailPage() {
    const router = useRouter();
    const [selectedGender, setSelectedGender] = useState('Men');
    const [selectedSubcategory, setSelectedSubcategory] = useState('All');

    const subcategories = ['All', 'T-Shirts', 'Pants & Shorts', 'Shoes', 'Accessories'];
    const genders = ['Men', 'Women', 'Kids'];

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white dark:bg-background-dark">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-transparent dark:border-gray-800 transition-colors">
                <div className="flex items-center justify-between p-4 h-14">
                    <button
                        onClick={() => router.back()}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center truncate px-2">Men's Clothing</h2>
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
                    </button>
                </div>

                {/* Subcategory Chips */}
                <div className="w-full overflow-x-auto no-scrollbar pb-3 px-4">
                    <div className="flex gap-3">
                        {subcategories.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => setSelectedSubcategory(sub)}
                                className={`flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all active:scale-95 ${selectedSubcategory === sub
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <p className="text-sm font-medium whitespace-nowrap">{sub}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Filter & Sort Bar */}
            <div className="sticky top-[108px] z-40 bg-background-light dark:bg-background-dark border-y border-gray-200 dark:border-gray-800 px-4 py-3 flex gap-3 items-center justify-between">
                {/* Gender Segmented Control */}
                <div className="flex h-10 flex-1 items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                    {genders.map((gender) => (
                        <label key={gender} className="cursor-pointer relative flex-1 h-full flex items-center justify-center rounded-md transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-gray-700 has-[:checked]:shadow-sm">
                            <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={selectedGender === gender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="sr-only"
                            />
                            <span className={`text-xs font-medium ${selectedGender === gender
                                    ? 'font-semibold text-slate-900 dark:text-white'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}>
                                {gender}
                            </span>
                        </label>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button className="flex items-center justify-center size-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 shadow-sm active:bg-gray-50 dark:active:bg-gray-700">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>swap_vert</span>
                    </button>
                    <button className="flex items-center justify-center size-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 shadow-sm active:bg-gray-50 dark:active:bg-gray-700">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>tune</span>
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <main className="flex-1 p-4 pb-24">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {/* Product 1 */}
                    <div className="group flex flex-col gap-2 cursor-pointer">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApD1dv_2g0Vww0gIFtA1Xu_ennV8gPRRjeOyIvpHeKUIOzyOenBcj6yZkZ63i9OxX_Teb738-z2-vVokZvnZBwbSle2Sfuip66dzleRCmYQWG7maqcYMBwGhh-F3Rqhv36ZQ7O5aT-uaF1cdi8qZlScAkpN-FOBnLP9D8gf1J49ogeT-SZKEjsOsqWmhiP8d7wGcXU6JNPHEvrXf-htX8OCleX_KOPqr83obMdP8Rbf5td5oKeGz-kn6PgM21Xk2WHx29YptG242Y')" }}
                            />
                            <button className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white transition-transform active:scale-90">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite</span>
                            </button>
                        </div>
                        <div className="px-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Uniqlo</p>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">Cotton Crew Neck T-Shirt</h3>
                            <p className="text-sm font-bold text-primary">$14.90</p>
                        </div>
                    </div>

                    {/* Product 2 */}
                    <div className="group flex flex-col gap-2 cursor-pointer">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1uIK_VQr1CYc2pFBNnBB_4uBHVzRdauSkcp1uTMMpMt_Uu02sapUg2dP4wG4FCRd9eZcxaL2t7_4b6NkbeBaPw4cSGdNOWFVSyqzkJZ9wAz93yeSr58V2WIaWws7xT755FD1-3YD9p4QNjHDjN3N1Yrw4m-NbdbpsPDR8ciqLn2C3or7oqmBPTrIc1F7KaA9oFkOwyDmKBq-uTCr21bOTKb7BjE4NdbAP5OJuelepl6eQfhA5SYraKHaxiELVE4xNE8X7r4S8kQ8')" }}
                            />
                            <button className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white transition-transform active:scale-90">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite_border</span>
                            </button>
                        </div>
                        <div className="px-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Levi's</p>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">Original Trucker Jacket</h3>
                            <p className="text-sm font-bold text-primary">$89.00</p>
                        </div>
                    </div>

                    {/* Product 3 */}
                    <div className="group flex flex-col gap-2 cursor-pointer">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6L40odnndhNFDUNAuLXZa9HLhDB43o9-If5VYCgKVY4WZ7Hf22EObufNb3yZ4O6MVbuNTnQDhbQEoRPE1023gCs7TPjCA-ILbBsL_jU8bGeYaCsWqDh2DPCLio6rAwygGmqAGJkeiIOFiYOZ_DNwjgbkjZR4--sxhP8YjdYciBkqL3uenlpF4CaJUSktoVkkquAOxhhvUgEuqW078vEqmlD66gShUSd9JdrEk92YFuHE-NpZWyn4HfjuXTytiq3_jhTgZ662j5tE')" }}
                            />
                            <button className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white transition-transform active:scale-90">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite_border</span>
                            </button>
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded-md">
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Best Seller</span>
                            </div>
                        </div>
                        <div className="px-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Nike</p>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">Air Zoom Pegasus 39</h3>
                            <p className="text-sm font-bold text-primary">$120.00</p>
                        </div>
                    </div>

                    {/* Product 4 */}
                    <div className="group flex flex-col gap-2 cursor-pointer">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEpToz2x721wqELXuZFbkWFLzTD0Eu3Do3_bUZdQ8_R2nftTcHAFg6g2nj8EKkMgBGlYuQLf1bVhQuSqIE-rWjgG_sUIBWSJ2b5XVtpeqgPJtrjuacv5Jjb3TvdnkwclK8rLkCiY1z2Z9U1PI0LUC1ugvbL1sQwSZ6nfBEYeD9Xi3mCwWhlnVZDqIhKVhUBJPodSSpLUQB_VzBJeNpdknbrojgs6urABzDBpnDQ25vO7HXsOo8cqJM7nSqCUZzjhfwHC_ZsY1uGX0')" }}
                            />
                            <button className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white transition-transform active:scale-90">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite_border</span>
                            </button>
                        </div>
                        <div className="px-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Gap</p>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">10" Vintage Shorts</h3>
                            <p className="text-sm font-bold text-primary">$45.00</p>
                        </div>
                    </div>

                    {/* Product 5 */}
                    <div className="group flex flex-col gap-2 cursor-pointer">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpakZtAOC-CciyIFgTO7MTkJIEuPTPYZq6SvTwv0rU8crxn3cffMPO6Xq8KajdfJi_5heiZ0ShP5O_QrSd5jFJ4umaIXi9Fzrg2-tRO3svcavASsYnG3vA7NEFMu--wkRyZmaPRwqdYfX3HYrSfJdjdMxeWVr4TapqHUxr5_cJkZp3N47fJwAZ0SHKGu9tbH5JK3BQYxjYoda0f2IvoeQRNhnd7xKhEXlWhoEA0B1e_o9bt5mM5ZDSTr8sQjYbtePDHQsEq6d3Iow')" }}
                            />
                            <button className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white transition-transform active:scale-90">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite_border</span>
                            </button>
                        </div>
                        <div className="px-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Everlane</p>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">The Performance Chino</h3>
                            <p className="text-sm font-bold text-primary">$72.00</p>
                        </div>
                    </div>

                    {/* Product 6 */}
                    <div className="group flex flex-col gap-2 cursor-pointer">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9KO_LnaaCC8qY_xnGNGdOWdNZxdk0NBs0RTUYCpXvq7xcZCRGyz2Vf_7FHzm9DT5KKO5_2MM7C749TDGdjB97TWnHdBauo_1z6C60iMB7I8L6ZHjvN16ZDCHIP7ydfNl0lI7Qb_d4opEkkfHGo0Ywgn_ZcN0ddvbGA1zWYnDKcY92OmonmVIbVMd-PqBfznEB6II0b0HjvLLo2ygYOE5FLDT6d_SXvADgiBfooML-M8xkDVY4B-q-pKTD_B_mQ3ROT4D5RvC-qkM')" }}
                            />
                            <button className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white transition-transform active:scale-90">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite_border</span>
                            </button>
                        </div>
                        <div className="px-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">Vans</p>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">Old Skool Canvas</h3>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-primary">$65.00</p>
                                <p className="text-xs text-slate-400 line-through">$75.00</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Infinite Scroll Loading State */}
                <div className="flex flex-col items-center justify-center py-8 gap-3 opacity-60">
                    <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-medium text-slate-500">Loading more styles...</p>
                </div>
            </main>

            {/* Floating Cart Button */}
            <div className="fixed bottom-20 right-6 z-50">
                <button className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:bg-primary-dark transition-colors active:scale-95">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
                    <span className="absolute top-3 right-3 size-2.5 bg-red-500 border-2 border-primary rounded-full"></span>
                </button>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
