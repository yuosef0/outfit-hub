'use client';

import React from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-20 bg-background-light dark:bg-black text-slate-900 dark:text-slate-100 antialiased selection:bg-accent-green/30">

            {/* Categories Grid */}
            <main className="flex-1 p-4">
                <div className="grid grid-cols-2 gap-4 pb-4">
                    {/* Category Card: Women */}
                    <Link href="/categories/women" className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-neutral-900 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                            <img
                                alt="Women's fashion category showing a modern outfit"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6W7OW3zVkaVBgg5zMn0yP2xTgVBRHx3eiqhQlOuxtnsHMw4UFRfUcoY8njiKXBoBdb9ljyKJl45diwimmRUh1guiQJnI0ZP27k1g2ljVOJAhZuF-82PWiEdmzaPgVMmQKaqKixkDmZeDcmweO9RybJhK-mqiz-DcdgcrKCKZOemL81CKFFtECxCZn9qfDt1d2Hky3a5LIvc5-DsvTEx6_JtigWAF9KFte7lvq0f9Z3Yd6R2tWS40I9HGpp-qsnXLijGrFuVAPa90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">Women</h3>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">1.2k+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Men */}
                    <Link href="/categories/men" className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-neutral-900 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                            <img
                                alt="Men's fashion category with casual wear"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh5MJYP0O8TemHZ3P8l1jA9tpKG_455N-R7s4I0LhwIJ3csSCVFN4C92f1EW2Wr7v7aHDAO-aaXx_OqgUgAV-rxP3aYAMP6ythDM1tjquguJG00RReyNtVgpKF_VIpQVNVum2E04LgRZgTMVniOA_4JiF1rVSVyp0i2n-3V5hZmk4adynCIKlFIMMQAuljz7UnGrnbUGkUQDQTBwg2gxhFaolXCwWGH5IdIaIB7MPZjpyiP1gVeFPrahQdqBEon3aLHZXCTZsD4wk"
                            />
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">Men</h3>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">850+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Kids */}
                    <Link href="/categories/kids" className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-neutral-900 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                            <img
                                alt="Kids clothing collection"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbXhQ8sy_OTQIqM2mZSPWFNLi9ZvNtIeajgfyib-De4WeuPbL7enthyn2ql0nvcxJIu-EGT9ostotiLATYHS29mMy63_LpKlF1UY5nuFZogqmKnON3VumdfMCzC-zNuyc9MmU4IVkxpCtYuYedbSg5j1fpAqWfPA4TBCuxYdwYjT2BO9IyvY-NdgO3lmqhmcdRNx8ik-vCwTu55o9cdVQT0ffy3G-7a1MOsW6N_Idgv9fhS6XZDyhVAb4a3Xs5QGnf10MICeQ9UrE"
                            />
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">SALE</span>
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">Kids</h3>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">500+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Shoes */}
                    <Link href="/categories/shoes" className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-neutral-900 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                            <img
                                alt="Footwear and shoes collection"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChsD-MC-9_Fpcj8g6nBgrPIuIBBxZrJp9OHuhv3YTxHOIEJzW_gTPK2cGn7wKzFJQt4uZnoPz61koqpI6sdrfJYwZmySDNdaRG7WGc6vUCCZUFS5Lyk9sl9eHmk3Esc9io1a5B8sKNNiPEKYRmMMBpbCUu_4mH9D0Tn3hUmU0cBq008rsA1gCCTBJTgZ04WXWQgmdSTL3k2FD6hLTT4wsL9uxeTW1sfvUGInNXBqbFAVIrATA2clOBmDwif_7ViBuUWSLTFAGLGLg"
                            />
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">Shoes</h3>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">320+ items</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
