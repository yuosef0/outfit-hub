'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DiscoverStoresPage() {
    const [activeGender, setActiveGender] = useState('All');

    const stores = [
        {
            id: 1,
            name: 'Nike Flagship',
            category: 'Sportswear',
            rating: 4.8,
            reviews: '1.2k',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwI2gvIuESb_f694SYtdOJ2WgQLePGT-4VWBY_eqovTAMqGTyHQ76d_10HLqZMEMHLB_c2boPSx5XqZ3iRML6Wy9s4bZsHfFUlL3y5B80jdQs2sV0C4ILE0ZwH157XiFwT0KZ-ZqWdLA5AVhhuqaw8KtqjnyOivLq3BKQrDLb-IsErMyPUG5-_Du9Hanf04vm82GyMRYbaovQHbLqwpC9tuhwEG_JAL4oTTnvvolvnDpof1lyD3nVQfpon5zqapYsCSURXIY2XIkg',
            description: 'Discover the latest innovation in sportswear, footwear, and accessories for athletes of all levels.'
        },
        {
            id: 2,
            name: 'H&M',
            category: 'Fashion',
            rating: 4.5,
            reviews: '850',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCReONTIiNgCC8WfLBTSMRg8P8ryscDv-KoSUvSENRSSH3dvaeJNgQikCSG8OxWUrl8YPoAnWOy_U2cJgEoyJg9q1HTkbYkNNhCO4DF6p7JNnjMbDgW8TOscdnuAts50JIep6HiLe9YI8VN54RfVAqfQ8WAw98Q6pmaDLDftifeG32LiCrPsVytX4ILwtItTgiNBFudleifgWSGkKxidQn-b7aS4Ar8vu2T-E3Smg4c1CoK63yzSOkAyDGj3YvFBgq256Vrn0FzcJM',
            description: 'Sustainable fashion at the best price. Shop the latest trends for men, women, and kids.'
        },
        {
            id: 3,
            name: 'Uniqlo',
            category: 'Casual',
            rating: 4.9,
            reviews: '2.1k',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLaaYFbjAFb649XKgsn90rGwp2cSXiJwiGTME6M3yXtjbdU54h1uJ-Zyyoir1xYxg82kRMrYE4wEiTxw4toahGguxYkVQZ_NQIVNOmDIg3Ju6u7SqL5w-Xwm4P52G3hHjG53CaWhRn_z0i1JW5NgyCe7Ksj6mJbbn8RnOjqdoQSxHsulgwYirVBUGaTr863E3QXhhQLmVfVfTmAt_i57N2BNj26uTR8hopsMwaS3NYlPLgSDOZ55kfR4DUzhKZG-j7SYQ-YRJZQq0',
            description: 'Innovative, high-quality clothing that is universal in design and comfort. LifeWear for everyone.'
        },
        {
            id: 4,
            name: 'Zara',
            category: 'Trendy',
            rating: 4.3,
            reviews: '920',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlL-2q6iT20c2JIH-YDyZSD2GH5QXliFjjOG9iDoDPlACCwFRiHgt_AqixhWVXzJasPBvcVZLc2aD6ycNsOkdJd_83lKXfcZVvMKjovcyY0JEFdKgqeDoYY3yNJ1iIF5kw10ngV17GjrmoRQjt2bF4iU2fzSqG1tMshVYMZ5RNy6yDGn3Og9DCV_uS8-cOxonguMLJ2YRPBourOfjOLyJNoTF9tSo1s_tGT8lBBfXYuFFpKNOeiEQyZEMsYUpRQWWrOV-hT8KDuc',
            description: "The world's largest fashion retailer. Explore the latest collections for women, men and kids."
        }
    ];

    const genders = ['All', 'Men', 'Women', 'Kids'];

    return (
        <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-[#000000] shadow-2xl relative overflow-hidden flex flex-col transition-colors duration-200">
            {/* Top App Bar */}
            {/* Filters Section */}
            <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-[#000000]/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50 pt-3 flex flex-col gap-3 pb-3">

                {/* Gender Pills */}
                <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
                    <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
                    {genders.map((gender) => (
                        <button
                            key={gender}
                            onClick={() => setActiveGender(gender)}
                            className={`flex h-9 min-w-[60px] shrink-0 items-center justify-center rounded-full px-4 transition-transform active:scale-95 ${activeGender === gender
                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                        >
                            <p className="text-sm font-medium leading-normal">{gender}</p>
                        </button>
                    ))}
                </div>
                {/* Sort & Filter Toolbar */}
                <div className="flex justify-between items-center px-5 pt-1">
                    <button className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">sort</span>
                        <span>Sort by: Rating</span>
                    </button>
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>
            </div>

            {/* Main Content: Store List */}
            <main className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-24">
                {stores.map((store) => (
                    <div key={store.id} className="group bg-white dark:bg-gray-800/50 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700/50 hover:border-primary/30 transition-all">
                        <div className="flex gap-4 mb-3">
                            <div className="w-16 h-16 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-600">
                                <img
                                    className="w-10 h-10 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert"
                                    src={store.image}
                                    alt={`${store.name} Logo`}
                                />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight truncate">{store.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                                {store.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{store.rating}</span>
                                                <span className="text-xs text-gray-400 font-normal">({store.reviews})</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                            {store.description}
                        </p>
                        <Link
                            href={`/stores/${store.id}`}
                            className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
                        >
                            View Store
                        </Link>
                    </div>
                ))}
            </main>
        </div>
    );
}
