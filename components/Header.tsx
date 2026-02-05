'use client';

import React from 'react';

export default function Header() {
  return (
    <header
      className="relative z-50 border-b bg-white dark:bg-[#000000] border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-center p-4 pb-2 justify-between gap-2">
        {/* Location Selector */}
        <div className="flex items-center gap-1 flex-1 cursor-pointer group">
          <span className="material-symbols-outlined text-primary group-hover:opacity-80 transition-opacity" style={{ fontSize: '20px' }}>location_on</span>
          <h2 className="text-slate-900 dark:text-white text-sm font-bold leading-tight">Cairo, Egypt</h2>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors" style={{ fontSize: '18px' }}>expand_more</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex border border-slate-200 dark:border-slate-800 rounded-full p-0.5 bg-slate-100 dark:bg-slate-900">
            <button className="px-3 py-1 text-[10px] font-bold bg-white dark:bg-primary rounded-full shadow-sm text-primary dark:text-white transition-all">EN</button>
            <button className="px-3 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">AR</button>
          </div>

          {/* Notifications */}
          <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"></span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <label className="flex flex-col w-full">
          <div className="flex w-full items-center rounded-xl bg-slate-100/30 dark:bg-slate-900/30 backdrop-blur-md h-12 border border-slate-200/30 dark:border-slate-700/30 focus-within:border-primary/30 transition-all cursor-text group">
            <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center pl-4 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 px-3 text-sm h-full"
              placeholder="Search for brands, products..."
              readOnly // Making it readonly as per original design, implying it might trigger a modal later
              suppressHydrationWarning
            />
          </div>
        </label>
      </div>
    </header>
  );
}
