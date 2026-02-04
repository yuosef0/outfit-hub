'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    // Handle animation state
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            document.body.style.overflow = '';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Close on route change
    useEffect(() => {
        onClose();
    }, [pathname]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Drawer Panel */}
            <div className={`relative w-full max-w-md h-full bg-background-light dark:bg-background-dark shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors shrink-0">
                    <div className="flex items-center justify-between px-4 h-14">
                        <button
                            onClick={onClose}
                            aria-label="Close cart"
                            className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>
                        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">My Cart</h1>
                        <button className="h-10 px-2 flex items-center justify-center text-primary font-semibold text-sm hover:opacity-80 transition-opacity">
                            Edit
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-4">
                    {/* POPULATED STATE (Main View) */}
                    <div className="space-y-6">
                        {/* Store Group 1 */}
                        <section className="flex flex-col gap-3">
                            {/* Store Header */}
                            <div className="flex items-center gap-3 px-1 py-1">
                                <div className="size-8 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                                    <img alt="Zara Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5ot0S9VTf2WRxaqb-jEQE8yPBXN_slGLt-b0FGqEtSFWgEN6rO04Am3w4hqcl06foUR5PjLlazty6NWIxMvZg3rTO2aTBHq48yyB33CTWS_B_4MPHg5sd7TeiVgX0DVo6GszWc0LsehDf7vZoURAxacS-m4C8stod4k_XYMrM_OO00HP3BX31fu9_ue8r-WdGOsWuwbJLUPtRLax_U_3ivI21VF5up-nKqxprGKR0q_Q9GMZWLttPN3XSDpCuXyJavs15S4-FzOo" />
                                </div>
                                <div className="flex-1 flex items-center gap-1">
                                    <h2 className="font-semibold text-sm text-white dark:text-white mix-blend-difference">Zara Official Store</h2>
                                    <span className="material-symbols-outlined text-white dark:text-white mix-blend-difference text-[18px]">chevron_right</span>
                                </div>
                            </div>
                            {/* Cart Item 1 */}
                            <article className="bg-transparent dark:bg-transparent rounded-2xl p-3 shadow-none flex gap-4 transition-colors border border-slate-200 dark:border-gray-800">
                                {/* Product Image */}
                                <div className="w-24 h-28 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Folded light blue linen shirt" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9MN-2ZGdAlq8y2srfpsFR9JyVdSYrMbC8sIdsm57yH3H36q5Azk0MF3IyDyORAHn37ZuixSD9Vli5KFgFsHJykq0Af6iVOelLK1lUmFgt-iwFC_1L606NqxvwO4o1uYODZbBEu0O8ZnVPK6iADTQTVNLgujj4Hd4ZiK516quvPWHEBumxZ1ljPhOMaPyVZv7z0_DRBL95QqdcZgvaKZXxqhEu7OXy4FSudmhTZCEwm1QsVy0y_UP0PNyeaC0zNWfNDLyzwqJwkKk')" }}></div>
                                </div>
                                {/* Content */}
                                <div className="flex flex-col flex-1 justify-between py-0.5">
                                    <div>
                                        <div className="flex justify-between items-start gap-3">
                                            <h3 className="font-semibold text-sm text-white dark:text-white mix-blend-difference leading-snug line-clamp-2">Premium Slim Fit Linen Shirt</h3>
                                            <button aria-label="Remove item" className="text-white dark:text-white mix-blend-difference hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0 p-1 -mr-1 -mt-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                        <p className="text-xs font-medium text-white dark:text-white mix-blend-difference mt-1.5">Color: Navy • Size: L</p>
                                    </div>
                                    <div className="flex items-end justify-between mt-3">
                                        <span className="font-bold text-base text-primary dark:text-blue-400">$45.00</span>
                                        {/* Quantity Stepper */}
                                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 h-8 shadow-inner">
                                            <button aria-label="Decrease quantity" className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all">
                                                <span className="material-symbols-outlined text-[16px] font-bold">remove</span>
                                            </button>
                                            <span className="w-8 text-center text-xs font-semibold text-white dark:text-white mix-blend-difference tabular-nums">1</span>
                                            <button aria-label="Increase quantity" className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all">
                                                <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Cart Item 2 */}
                            <article className="bg-transparent dark:bg-transparent rounded-2xl p-3 shadow-none flex gap-4 transition-colors border border-slate-200 dark:border-gray-800">
                                <div className="w-24 h-28 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Black leather chelsea boots" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3yeth4lw9VBmeUw5ka3CLcxmWuvisHBkUBzzsRjNfTroRyGdoe7E5kn8VNYoLOOwsVmlByn3zJ4fdn9OoQuPu7bDtR6K4Baeo7fv3hW8FpEHJgjMnXvIBp6LMwp_urG0nmbX-i2Qn6pT1GbOJTNhUbhaHaGG9q5dZLEPaPzi-le--GnN50TSlJi6gfrvyzthf2yZgs8W8Wn0_TuGCnjhB7rtUswpKZeu69PIaaZY-Mn0dsg2LYzVrOFALip-nJVEA7o-KTvxnKng')" }}></div>
                                </div>
                                <div className="flex flex-col flex-1 justify-between py-0.5">
                                    <div>
                                        <div className="flex justify-between items-start gap-3">
                                            <h3 className="font-semibold text-sm text-white dark:text-white mix-blend-difference leading-snug line-clamp-2">Classic Leather Chelsea Boots</h3>
                                            <button aria-label="Remove item" className="text-white dark:text-white mix-blend-difference hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0 p-1 -mr-1 -mt-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                        <p className="text-xs font-medium text-white dark:text-white mix-blend-difference mt-1.5">Color: Black • Size: 42</p>
                                    </div>
                                    <div className="flex items-end justify-between mt-3">
                                        <span className="font-bold text-base text-primary dark:text-blue-400">$120.00</span>
                                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 h-8 shadow-inner">
                                            <button className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all">
                                                <span className="material-symbols-outlined text-[16px] font-bold">remove</span>
                                            </button>
                                            <span className="w-8 text-center text-xs font-semibold text-white dark:text-white mix-blend-difference tabular-nums">1</span>
                                            <button className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all">
                                                <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </section>
                        {/* Store Group 2 */}
                        <section className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 px-1 py-1">
                                <div className="size-8 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                                    <img alt="Nike Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCam67M8TU117I_QpWypqO8lvG4XnedwauPTmxBn_zz55To8Gjfjn4cv6cvVERFSy57Sha6PPrFvfOy9Adix8rCxjYLZHEfDn4qc-2WmdF1yUg1KTpY6z3PKL16v9NK6PRyB9SGQqhIBaLOQHLg_4c9JWyPUkG85b0ZNR18vv95fFpkThdbgVg96rXYG-hXV2Rpfx5Yviur6iZk3NbnC6tv-ram1CwnqLIA7WXrlOZ9wnJdLKJ8Td3gVZ0AeCI3Kk_yTUl5lwPcbno" />
                                </div>
                                <div className="flex-1 flex items-center gap-1">
                                    <h2 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Nike Store</h2>
                                    <span className="material-symbols-outlined text-white dark:text-white mix-blend-difference text-[18px]">chevron_right</span>
                                </div>
                            </div>
                            {/* Cart Item 3 */}
                            <article className="bg-transparent dark:bg-transparent rounded-2xl p-3 shadow-none flex gap-4 transition-colors border border-slate-200 dark:border-gray-800">
                                <div className="w-24 h-28 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                                    {/* Using a slight opacity overlay on the image just for a modern touch */}
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Red Nike sneakers angled side view" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjj8sHpOgznPLvngXYGjkYc0Rf3cfSn8UsDpqItx2LWWZ4yOzeoJQXycITSlBanWC4NY-OQYsTVphXEJY78DMvtuTkt0H8OT2fLH4_j9qofbFOQOHB0iqbrNzFO8WcrvR0UkgAzjuRiyq-RrUhGqkG4rxZkTevtycZUsbJLU9-sTO74wbCmvRv4hgBVE1ah4tDits6W8HhaFCinzLFydMkrw6TRraoVQkGIeNpaVhT3Jzx9HucLArU_DdxffHBr7-2ViRHIkK13Fw')" }}></div>
                                </div>
                                <div className="flex flex-col flex-1 justify-between py-0.5">
                                    <div>
                                        <div className="flex justify-between items-start gap-3">
                                            <h3 className="font-semibold text-sm text-white dark:text-white mix-blend-difference leading-snug line-clamp-2">Nike Air Max 270 React</h3>
                                            <button aria-label="Remove item" className="text-white dark:text-white mix-blend-difference hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0 p-1 -mr-1 -mt-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                        <p className="text-xs font-medium text-white dark:text-white mix-blend-difference mt-1.5">Color: Red • Size: 10</p>
                                    </div>
                                    <div className="flex items-end justify-between mt-3">
                                        <span className="font-bold text-base text-primary dark:text-blue-400">$150.00</span>
                                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 h-8 shadow-inner">
                                            <button className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all">
                                                <span className="material-symbols-outlined text-[16px] font-bold">remove</span>
                                            </button>
                                            <span className="w-8 text-center text-xs font-semibold text-white dark:text-white mix-blend-difference tabular-nums">1</span>
                                            <button className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all">
                                                <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>


                    {/* EMPTY STATE PREVIEW */}
                    <div className="mt-12 mb-6">
                        <div className="flex items-center gap-4 py-4">
                            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Empty State Variant</span>
                            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                        </div>
                        <div className="flex flex-col items-center justify-center py-10 px-6 bg-transparent dark:bg-transparent rounded-3xl shadow-none border border-slate-200 dark:border-gray-800">
                            <div className="w-48 h-48 mb-6 flex items-center justify-center relative">
                                {/* Modern Minimalist Illustration constructed with divs and icons */}
                                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
                                <div className="relative z-10 p-6 bg-slate-50 dark:bg-slate-800 rounded-full shadow-sm">
                                    <span className="material-symbols-outlined text-[64px] text-primary/80">shopping_bag</span>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-10 right-10 p-2 bg-white dark:bg-slate-700 rounded-full shadow-md animate-bounce" style={{ animationDuration: "3s" }}>
                                    <span className="material-symbols-outlined text-xl text-yellow-400">star</span>
                                </div>
                                <div className="absolute bottom-10 left-8 p-1.5 bg-white dark:bg-slate-700 rounded-full shadow-md">
                                    <span className="material-symbols-outlined text-lg text-red-400">favorite</span>
                                </div>
                            </div>
                            <div className="max-w-[280px] flex flex-col items-center gap-3">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Your cart is empty</h3>
                                <p className="text-sm text-black dark:text-white text-center leading-relaxed">
                                    Looks like you haven't added anything to your cart yet. Explore our latest collections!
                                </p>
                            </div>
                            <button className="mt-8 flex items-center justify-center px-8 h-11 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all shadow-glow hover:shadow-lg active:scale-95">
                                Start Shopping
                            </button>
                        </div>
                    </div>
                    {/* Footer (Now part of scrollable content) */}
                    <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-6 pb-8">
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-black dark:text-white mix-blend-difference">Subtotal (3 items)</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-black dark:text-white tracking-tight mix-blend-difference">$315.00</span>
                                </div>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white h-12 rounded-xl font-bold text-base transition-all shadow-glow hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                                Proceed to Checkout
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
