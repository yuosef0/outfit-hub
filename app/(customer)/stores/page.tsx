'use client';

import Link from 'next/link';
import { useState } from 'react';

const stores = [
  {
    id: 1,
    name: 'Nike Flagship',
    category: 'Sportswear',
    rating: 4.8,
    reviews: '1.2k',
    description: 'Discover the latest innovation in sportswear, footwear, and accessories for athletes of all levels.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwI2gvIuESb_f694SYtdOJ2WgQLePGT-4VWBY_eqovTAMqGTyHQ76d_10HLqZMEMHLB_c2boPSx5XqZ3iRML6Wy9s4bZsHfFUlL3y5B80jdQs2sV0C4ILE0ZwH157XiFwT0KZ-ZqWdLA5AVhhuqaw8KtqjnyOivLq3BKQrDLb-IsErMyPUG5-_Du9Hanf04vm82GyMRYbaovQHbLqwpC9tuhwEG_JAL4oTTnvvolvnDpof1lyD3nVQfpon5zqapYsCSURXIY2XIkg',
  },
  {
    id: 2,
    name: 'H&M',
    category: 'Fashion',
    rating: 4.5,
    reviews: '850',
    description: 'Sustainable fashion at the best price. Shop the latest trends for men, women, and kids.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCReONTIiNgCC8WfLBTSMRg8P8ryscDv-KoSUvSENRSSH3dvaeJNgQikCSG8OxWUrl8YPoAnWOy_U2cJgEoyJg9q1HTkbYkNNhCO4DF6p7JNnjMbDgW8TOscdnuAts50JIep6HiLe9YI8VN54RfVAqfQ8WAw98Q6pmaDLDftifeG32LiCrPsVytX4ILwtItTgiNBFudleifgWSGkKxidQn-b7aS4Ar8vu2T-E3Smg4c1CoK63yzSOkAyDGj3YvFBgq256Vrn0FzcJM',
  },
  {
    id: 3,
    name: 'Uniqlo',
    category: 'Casual',
    rating: 4.9,
    reviews: '2.1k',
    description: 'Innovative, high-quality clothing that is universal in design and comfort. LifeWear for everyone.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLaaYFbjAFb649XKgsn90rGwp2cSXiJwiGTME6M3yXtjbdU54h1uJ-Zyyoir1xYxg82kRMrYE4wEiTxw4toahGguxYkVQZ_NQIVNOmDIg3Ju6u7SqL5w-Xwm4P52G3hHjG53CaWhRn_z0i1JW5NgyCe7Ksj6mJbbn8RnOjqdoQSxHsulgwYirVBUGaTr863E3QXhhQLmVfVfTmAt_i57N2BNj26uTR8hopsMwaS3NYlPLgSDOZ55kfR4DUzhKZG-j7SYQ-YRJZQq0',
  },
  {
    id: 4,
    name: 'Zara',
    category: 'Trendy',
    rating: 4.3,
    reviews: '920',
    description: 'The world\'s largest fashion retailer. Explore the latest collections for women, men and kids.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlL-2q6iT20c2JIH-YDyZSD2GH5QXliFjjOG9iDoDPlACCwFRiHgt_AqixhWVXzJasPBvcVZLc2aD6ycNsOkdJd_83lKXfcZVvMKjovcyY0JEFdKgqeDoYY3yNJ1iIF5kw10ngV17GjrmoRQjt2bF4iU2fzSqG1tMshVYMZ5RNy6yDGn3Og9DCV_uS8-cOxonguMLJ2YRPBourOfjOLyJNoTF9tSo1s_tGT8lBBfXYuFFpKNOeiEQyZEMsYUpRQWWrOV-hT8KDuc',
  },
];

const genderFilters = ['All', 'Men', 'Women', 'Kids'];

export default function StoresPage() {
  const [activeGender, setActiveGender] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('Clothing & Apparel');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7f6] shadow-2xl relative overflow-hidden flex flex-col">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-[#f6f7f6]/95 backdrop-blur-sm border-b border-gray-200/50">
        <div className="flex flex-col px-5 pt-6 pb-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-900 tracking-tight text-[28px] font-bold leading-tight">Discover Stores</p>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-gray-900 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>

        {/* Sticky Filter Section */}
        <div className="flex flex-col gap-3 pb-3">
          {/* Search/Category Input */}
          <div className="px-5">
            <div className="relative">
              <div className="flex items-center w-full h-12 bg-white border border-gray-200 rounded-xl px-4 shadow-sm">
                <span className="material-symbols-outlined text-gray-400 mr-3">storefront</span>
                <input
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 text-base font-medium cursor-pointer"
                  placeholder="Select Category"
                  readOnly
                  type="text"
                  value={selectedCategory}
                />
                <span className="material-symbols-outlined text-gray-400">expand_more</span>
              </div>
            </div>
          </div>

          {/* Gender Pills */}
          <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
            {genderFilters.map((gender) => (
              <button
                key={gender}
                onClick={() => setActiveGender(gender)}
                className={`flex h-9 min-w-[60px] shrink-0 items-center justify-center rounded-full px-4 transition-transform active:scale-95 ${
                  activeGender === gender
                    ? 'bg-[#1f431f] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                <p className="text-sm font-medium leading-normal">{gender}</p>
              </button>
            ))}
          </div>

          {/* Sort & Filter Toolbar */}
          <div className="flex justify-between items-center px-5 pt-1">
            <button className="flex items-center gap-2 text-[#1f431f] font-bold text-sm bg-[#1f431f]/10 px-3 py-2 rounded-lg hover:bg-[#1f431f]/20 transition-colors">
              <span className="material-symbols-outlined text-[20px]">sort</span>
              <span>Sort by: Rating</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-[#1f431f] transition-colors">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: Store List */}
      <main className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-24">
        {stores.map((store) => (
          <div
            key={store.id}
            className="group bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-[#1f431f]/30 transition-all"
          >
            <div className="flex gap-4 mb-3">
              <div className="w-16 h-16 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
                <img
                  className="w-10 h-10 object-contain"
                  alt={`${store.name} Logo`}
                  src={store.logo}
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-900 text-lg font-bold leading-tight truncate">{store.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {store.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-sm font-bold text-gray-700">{store.rating}</span>
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
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
              {store.description}
            </p>
            <button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-[#1f431f]/10 text-[#1f431f] font-semibold text-sm hover:bg-[#1f431f] hover:text-white transition-all active:scale-[0.98]">
              View Store
            </button>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-50">
        <Link href="/" className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-[#1f431f] transition-colors">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/stores" className="flex flex-col items-center gap-1 p-2 text-[#1f431f] transition-colors">
          <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="text-[10px] font-bold">Stores</span>
        </Link>
        <div className="relative">
          <Link href="/cart" className="flex w-12 h-12 bg-[#1f431f] text-white rounded-full items-center justify-center shadow-lg -mt-6 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          </Link>
        </div>
        <Link href="/saved" className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-[#1f431f] transition-colors">
          <span className="material-symbols-outlined text-2xl">favorite</span>
          <span className="text-[10px] font-medium">Saved</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-[#1f431f] transition-colors">
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
