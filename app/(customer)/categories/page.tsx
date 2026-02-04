'use client';

import React from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-20 bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary antialiased selection:bg-primary selection:text-white">
            {/* Top Sticky Header */}
            <header className="sticky top-0 z-40 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
                <div className="flex items-center justify-between px-4 py-3 h-14">
                    <div className="w-10"></div>
                    <h1 className="text-lg font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">Categories</h1>
                    <div className="w-10 flex justify-end"></div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="px-4 pt-4 pb-2">
                <label className="flex flex-col w-full">
                    <div className="relative flex w-full items-center rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
                        <div className="absolute left-4 flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined text-[24px]">search</span>
                        </div>
                        <input
                            className="h-12 w-full rounded-xl bg-transparent pl-12 pr-4 text-base font-normal text-text-light-primary dark:text-text-dark-primary placeholder:text-gray-400 focus:outline-none border-none"
                            placeholder="Search for products..."
                            type="text"
                        />
                    </div>
                </label>
            </div>

            {/* Categories Grid */}
            <main className="flex-1 p-4">
                <div className="grid grid-cols-2 gap-4 pb-4">
                    {/* Category Card: Women */}
                    <Link href="/categories/women" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Women's fashion category showing a modern outfit"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6W7OW3zVkaVBgg5zMn0yP2xTgVBRHx3eiqhQlOuxtnsHMw4UFRfUcoY8njiKXBoBdb9ljyKJl45diwimmRUh1guiQJnI0ZP27k1g2ljVOJAhZuF-82PWiEdmzaPgVMmQKaqKixkDmZeDcmweO9RybJhK-mqiz-DcdgcrKCKZOemL81CKFFtECxCZn9qfDt1d2Hky3a5LIvc5-DsvTEx6_JtigWAF9KFte7lvq0f9Z3Yd6R2tWS40I9HGpp-qsnXLijGrFuVAPa90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Women</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">1.2k+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Men */}
                    <Link href="/categories/men" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Men's fashion category with casual wear"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh5MJYP0O8TemHZ3P8l1jA9tpKG_455N-R7s4I0LhwIJ3csSCVFN4C92f1EW2Wr7v7aHDAO-aaXx_OqgUgAV-rxP3aYAMP6ythDM1tjquguJG00RReyNtVgpKF_VIpQVNVum2E04LgRZgTMVniOA_4JiF1rVSVyp0i2n-3V5hZmk4adynCIKlFIMMQAuljz7UnGrnbUGkUQDQTBwg2gxhFaolXCwWGH5IdIaIB7MPZjpyiP1gVeFPrahQdqBEon3aLHZXCTZsD4wk"
                            />
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Men</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">850+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Kids */}
                    <Link href="/categories/kids" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Kids clothing collection"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbXhQ8sy_OTQIqM2mZSPWFNLi9ZvNtIeajgfyib-De4WeuPbL7enthyn2ql0nvcxJIu-EGT9ostotiLATYHS29mMy63_LpKlF1UY5nuFZogqmKnON3VumdfMCzC-zNuyc9MmU4IVkxpCtYuYedbSg5j1fpAqWfPA4TBCuxYdwYjT2BO9IyvY-NdgO3lmqhmcdRNx8ik-vCwTu55o9cdVQT0ffy3G-7a1MOsW6N_Idgv9fhS6XZDyhVAb4a3Xs5QGnf10MICeQ9UrE"
                            />
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">SALE</span>
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Kids</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">500+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Shoes */}
                    <Link href="/categories/shoes" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Footwear and shoes collection"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChsD-MC-9_Fpcj8g6nBgrPIuIBBxZrJp9OHuhv3YTxHOIEJzW_gTPK2cGn7wKzFJQt4uZnoPz61koqpI6sdrfJYwZmySDNdaRG7WGc6vUCCZUFS5Lyk9sl9eHmk3Esc9io1a5B8sKNNiPEKYRmMMBpbCUu_4mH9D0Tn3hUmU0cBq008rsA1gCCTBJTgZ04WXWQgmdSTL3k2FD6hLTT4wsL9uxeTW1sfvUGInNXBqbFAVIrATA2clOBmDwif_7ViBuUWSLTFAGLGLg"
                            />
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Shoes</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">320+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Accessories */}
                    <Link href="/categories/accessories" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Accessories like watches and jewelry"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGbON6Po-ZPP56wxZkH_LnIAbT5OJX9OqfCZ4abZlzaRNoJcABFZdnltnwWmFehfYPIySKiLPsgl9CPyC6rABrqfmgV8n5cZ7NdrOevNAPELL3IcENXiC1zTCyPty9WUeDNGdT3R-EMGAd16AO5p9S-HGrcQM9pwsOdZax5naGIx5HL6ytKNuU8ZEKNkjhzGytNS_33-CTnZeZESy7Wwc3gblgU9RGu_U14lYjv2XHmnSdgYS1l-Uu4GgJOExQ5C0mt-5riR0XWEQ"
                            />
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Accessories</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">150+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Bags */}
                    <Link href="/categories/bags" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Handbags and backpacks"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhdvt5OWkIXRqETCKUm1ECRskVMM9QGWc8XTcfksb7XHlpJ5NPLbtCSqDlZ9DT-5C4zrDmSqJHc5s71BDL_6cmPyxHSBOdK1ArfroifZuRuctBjRbyUsWGeOfvrSHcBsflOmKgKeDx_lXTeyl7CeuLWj-79RgpJwkq4dO4inqY-8kFAQqzGi5DvMonpAiMqnZ-6-E820KOD1L0v3s13Y91yKnMZtEFJSnr3FD34hQ6FnGicHmQ4quDY6OSGJUsH_oDyqxMoJRijBM"
                            />
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Bags</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">90 items</p>
                        </div>
                    </Link>

                    {/* Category Card: Sportswear */}
                    <Link href="/categories/sportswear" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Sportswear and gym clothing"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwkyv5PDMcpxl-sK7q8dTcyL7FkBRPDMoosB646PCfYVgvpWB5nNosGh8YUkhIJ2aUwp15i5kbE8w-ABWcXBjTg1qRNCrfb923N887xNNDJPPHV3RiR_bMolpo8qA5Q_vlWhHxBR9TRMVy0Hz0UIdtDTouHWAKmhWkJFTGz50hyXQDJJMT6gff_61NT2Qd1VQBrDXlMHoM4hWHbC6g0FPM2HbCAJowJb69pZTkWHmJBIEzztrBEbNtUTvh9A3V37BAkasLrxyVn0Y"
                            />
                            <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">NEW</span>
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Sportswear</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">210+ items</p>
                        </div>
                    </Link>

                    {/* Category Card: Beauty */}
                    <Link href="/categories/beauty" className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all active:scale-95 duration-200">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <img
                                alt="Beauty and cosmetics products"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeZQjWBmcRxwk01Z2tLl7ck69ldnRoXIK_9J95_r9HsDcig3jU0Yqyf-ZLFlehqgbjBUW25KmeTdoFjnntwQNq0WQYcEhOLs5fn5Cg_21TAnc-4ytt9vcLbgON0hSBhMTlSySTt0hsam0zluaQB5REQ_KYSxYeeu2vktO6R3zaLPAG6IA01rkC1WCL2L58fLA1a-K200reBySvK2zBzeeINcnekN7octdkj0RYL3wei9eGmzTA5y8LfcwkAJjKm02Fv1FDriRRp0U"
                            />
                        </div>
                        <div className="flex flex-col px-1 pb-1">
                            <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary leading-tight">Beauty</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">400+ items</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
