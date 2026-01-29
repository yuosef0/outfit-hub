'use client';

import { useState } from 'react';

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="relative flex flex-col min-h-screen max-w-md mx-auto bg-white dark:bg-background-dark shadow-2xl overflow-hidden">
      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md">
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-800 dark:text-white">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-800 dark:text-white">share</span>
          </button>
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-800 dark:text-white">shopping_bag</span>
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-background-dark">
              2
            </span>
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-28 hide-scrollbar">
        {/* Image Gallery Carousel */}
        <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-900"></div>
          {/* Image Counter Badge */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
            1/5
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pt-6 pb-4">
          {/* Store Name */}
          <button className="flex items-center gap-1 mb-2 group">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">Urban Outfitters</span>
            <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-0.5 transition-transform">
              chevron_right
            </span>
          </button>

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white mb-3">
            Men&apos;s Minimalist Bomber Jacket
          </h1>

          {/* Price Block */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">$89.00</span>
            <span className="text-base text-slate-400 line-through mb-1">$120.00</span>
            <span className="px-2.5 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full mb-1">
              -25%
            </span>
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6"></div>

          {/* Selection Area */}
          <div className="space-y-6">
            {/* Colors */}
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-3 block">Select Color</span>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedColor('black')}
                  aria-label="Select Black"
                  className={`w-8 h-8 rounded-full bg-[#1e293b] ${
                    selectedColor === 'black'
                      ? 'ring-2 ring-offset-2 ring-primary ring-offset-white dark:ring-offset-background-dark'
                      : 'ring-1 ring-slate-200 dark:ring-slate-700'
                  }`}
                ></button>
                <button
                  onClick={() => setSelectedColor('olive')}
                  aria-label="Select Olive"
                  className={`w-8 h-8 rounded-full bg-[#3f6212] ${
                    selectedColor === 'olive'
                      ? 'ring-2 ring-offset-2 ring-primary ring-offset-white dark:ring-offset-background-dark'
                      : 'ring-1 ring-slate-200 dark:ring-slate-700'
                  }`}
                ></button>
                <button
                  onClick={() => setSelectedColor('grey')}
                  aria-label="Select Grey"
                  className={`w-8 h-8 rounded-full bg-[#94a3b8] ${
                    selectedColor === 'grey'
                      ? 'ring-2 ring-offset-2 ring-primary ring-offset-white dark:ring-offset-background-dark'
                      : 'ring-1 ring-slate-200 dark:ring-slate-700'
                  }`}
                ></button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Select Size</span>
                <button className="text-xs font-medium text-slate-500 underline decoration-slate-300">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => size !== 'XL' && setSelectedSize(size)}
                    className={`h-10 w-12 flex items-center justify-center rounded-lg text-sm font-medium ${
                      size === 'XL'
                        ? 'border border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-50 relative overflow-hidden'
                        : selectedSize === size
                        ? 'bg-primary text-white font-bold shadow-md shadow-primary/20'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                    disabled={size === 'XL'}
                  >
                    {size}
                    {size === 'XL' && (
                      <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/50 -rotate-45 transform origin-center w-[150%] h-[1px] bg-slate-300 top-1/2 left-[-25%]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-3 block">Quantity</span>
              <div className="inline-flex items-center h-11 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-full flex items-center justify-center rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-600 dark:text-white hover:bg-slate-50 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <span className="w-10 text-center text-sm font-semibold text-slate-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-full flex items-center justify-center rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-600 dark:text-white hover:bg-slate-50 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-6"></div>

          {/* Accordions */}
          <div className="space-y-4">
            <details className="group [&_summary::-webkit-details-marker]:hidden" open>
              <summary className="flex cursor-pointer items-center justify-between text-slate-900 dark:text-white">
                <h2 className="text-base font-semibold">Description</h2>
                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <p>Crafted for the modern urbanite, this minimalist bomber jacket features a water-resistant shell, ribbed cuffs, and a sleek silhouette. 100% Cotton lining ensures breathability.</p>
              </div>
            </details>
            <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between text-slate-900 dark:text-white">
                <h2 className="text-base font-semibold">Size Guide</h2>
                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <p>Our jackets fit true to size. For a more relaxed fit, we recommend sizing up.</p>
              </div>
            </details>
            <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between text-slate-900 dark:text-white">
                <h2 className="text-base font-semibold">Store Policy</h2>
                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <p>Free returns within 30 days. Items must be unworn with original tags attached.</p>
              </div>
            </details>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="bg-background-light dark:bg-slate-900 py-8 px-5 mt-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">You May Also Like</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 hide-scrollbar snap-x snap-mandatory">
            {[
              { name: 'Structured Cargo Pants', price: '$54.00' },
              { name: 'Basic Cotton Tee', price: '$24.00' },
              { name: 'Urban Snapback', price: '$32.00' },
            ].map((product) => (
              <div key={product.name} className="min-w-[160px] snap-start">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-900">
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </button>
                </div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{product.name}</h4>
                <p className="text-sm font-semibold text-slate-500">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 p-4 pb-8">
        <div className="max-w-md mx-auto flex gap-3 items-center">
          {/* Wishlist Button */}
          <button className="flex-shrink-0 w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95 group">
            <span className="material-symbols-outlined text-2xl group-hover:text-red-500 transition-colors">favorite</span>
          </button>
          {/* Add to Cart Button */}
          <button className="flex-1 h-14 bg-primary rounded-xl flex items-center justify-center gap-2 text-white font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined">shopping_cart</span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
