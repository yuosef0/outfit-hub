'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Dummy Data
const PRODUCT_DATA = {
  id: '1',
  name: "Men's Minimalist Bomber Jacket",
  store: "Urban Outfitters",
  price: 89.00,
  originalPrice: 120.00,
  discount: 25,
  rating: 4.8,
  reviews: 124,
  description: "Crafted for the modern urbanite, this minimalist bomber jacket features a water-resistant shell, ribbed cuffs, and a sleek silhouette. 100% Cotton lining ensures breathability.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCHgM5V-0qtwfgpyYmW28WdG68q9rvGCuKgBvDpA_30rZAanTWHJ62yBsk5yjAgxpIN9_P1UPRJVsW3cuJnUs5slDBENc0RcNq_0bNF73OdEapjaiFTp7SEWT1EqEeA38QXFeptZ-6TsFj_wK2z-cQKC0IYMN4USB9eOfKCuNknMC1cEDoyXXRz1M5iLSqB6G43IYepSHB93OR2sRPJe2uoAxU9PDL5vglZmt-XoG4MDZ8Btc2HUJ-RQm7DOk7jqLtiMA_0zClXjdA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBiGfARD1psqfuExXsjipGD8ME1K-tr0kerrkC-sQhSE43hqqdW7s-lsZtgi0k72qAlu_LHWM5AZKXcYq9szKSPH8XOgq_eP8QaAqlRWLKGhvDLOnKFWhRgNsE72C0nwiOp14NWXi1M0yfI8SgWwIUaW3_WcVZa7fqUx9cfDzGZ6XUOTYMZrztqU9xQHq0xBgqFggkQgciIQ3uEHMQ1hf_dhN3tNRXtm1tSsnnx4RW42w8t2h3qw9hCkrh74uXzYTDK5TUwQCdGgVM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBmtHL3osMcBXDMw2NEJHodwWsNXRCJjLp_wBqzeicSncbvEb6amJ9EKRaMSoVLHJIpvt61bMxi8yq0E7Ssj-c3aNht6OoLutkPn5g7bgTXsAB3tsV5UPuBiz3rDscovmwmwHVlOHbe8cnkyiRagFHyZbYHNjGdmOhtPcojNBZvcAiMZaNJ3N4X-CtT8w6MsgwxH7bM89YAYBT2kKxce6w2BfR9mOG6MozAREYpGlrG1x47QBbCgyLpd9JvISHqz_wF0ObcoIn4W_Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCFeEWWGauIWqI6hKy6nkX-K9uNUxZLNzrwoXqlwcmXEpYDFOltzg_W2FwtA0RaI-MrnJZxyFjgNvSm9K1kVFPHNoS1p8eFBXpuFHX_EgMEHU4VStF9CZG_M8YNprJaY95FL1vKLh9sI_bJFKCxaeavI4ymZomPAE8l-ERofZ0T9FNhjDWJgDIJGR6a6y6fuOEwIqSm4TquWe-yqfXyAHoiqdTryHqhyFyopcITNtiunWAK3rp4syXNLLbbNU4XbH22Ed9KTgc63Kc"
  ],
  colors: [
    { name: 'Black', hex: '#1e293b' },
    { name: 'Olive', hex: '#3f6212' },
    { name: 'Grey', hex: '#94a3b8' }
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL']
};

const RELATED_PRODUCTS = [
  {
    id: '101',
    name: "Structured Cargo Pants",
    price: 54.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJp1wnE0n14hG6MPUmrSt3t7P3SFzeUjStZQEhfO4jSbtgp_UaNb058NYoT7CJwkQLd3QXPCOoRQVaY8epGty9NslLFy9e7kJiRXINxkQQjtGJJ8-q-xFncQczpQaeBsMmCuwOlf0VIwvVgIWHr65Msr_Pld4DHeTBNj7jZcjdfJsDDojyUr-PpO1LK843Zi6ftmKy1F63MQArqkh_KChIS6pPWYzSURWYeBiE_YcdsnbvPVkTPC2V65-dxhsDGQ8-cqno5d2ZM-Y"
  },
  {
    id: '102',
    name: "Basic Cotton Tee",
    price: 24.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy0NKlhQ-khoCeA6O6FWy8sn1P6w4tNfcnhczrTX9qx-UTGy3FF-4nnLUg3_ZhElT-7zHgfyaY_SWSecFTvjRwFC06FnucE8UJU2mcOrwja0oipbiHN-95_6uRMkAemmO69mM-cu7wegFAN5isiVYVpugH6vixt7EC4s3Dp9JukytOTftPI8KpczgGE4SMklgytrPKob1wY63j0t8a-wPz4uC5u8MvL13GS5XXPAs2abnY0vDd9Z8GjO2x1PNOF9ji4XNh6v80qzI"
  },
  {
    id: '103',
    name: "Urban Snapback",
    price: 32.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnMCXx_Dw5hRabgVwf9BpnFOs3-2wwTSURhDW96V-hj2QkY5reQ7Y14F3EqtqooMszJPwaA_TkLCX8XMs5NmO6Elozyf9PbPvY9nQUcVssozN9a6BCArOgmHlDgNL761ZnBxTmgNZpO-WIeNsFeiojEJWQFrcqYINhb2YTvGQoY-5l88MM0jQnuvR5MIT64BXebZyloTe6Y6koxgjI-BEA2oO48weKQ02FwPvOZKzA8sYr4mz4I6SdoXlQggXRs0jlUDB1je69754"
  }
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DATA.colors[0].name);
  const [selectedSize, setSelectedSize] = useState('M');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_DATA.images.length);
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white dark:bg-[#000000] shadow-2xl overflow-hidden">
      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-[#000000]/90 backdrop-blur-md border-b border-transparent dark:border-slate-800/50">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-800 dark:text-white">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-800 dark:text-white">share</span>
          </button>
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-800 dark:text-white">shopping_bag</span>
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#000000]">2</span>
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-32 hide-scrollbar">
        {/* Image Gallery Carousel */}
        <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800" onClick={nextImage}>
          <img
            key={currentImageIndex}
            alt={PRODUCT_DATA.name}
            className="w-full h-full object-cover transition-opacity duration-300"
            src={PRODUCT_DATA.images[currentImageIndex]}
          />
          {/* Image Counter Badge */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {currentImageIndex + 1}/{PRODUCT_DATA.images.length}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pt-6 pb-4">
          {/* Store Name */}
          <button className="flex items-center gap-1 mb-2 group">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">{PRODUCT_DATA.store}</span>
            <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-0.5 transition-transform">chevron_right</span>
          </button>

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white mb-3">
            {PRODUCT_DATA.name}
          </h1>

          {/* Price Block */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">${PRODUCT_DATA.price.toFixed(2)}</span>
            <span className="text-base text-slate-400 line-through mb-1">${PRODUCT_DATA.originalPrice.toFixed(2)}</span>
            <span className="px-2.5 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full mb-1">
              -{PRODUCT_DATA.discount}%
            </span>
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6"></div>

          {/* Selection Area */}
          <div className="space-y-6">
            {/* Colors */}
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-3 block">Select Color: <span className="text-slate-500 font-normal">{selectedColor}</span></span>
              <div className="flex gap-4">
                {PRODUCT_DATA.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select ${color.name}`}
                    className={`w-8 h-8 rounded-full ring-offset-2 ring-offset-white dark:ring-offset-[#000000] focus:outline-none transition-all ${selectedColor === color.name ? 'ring-2 ring-primary' : 'ring-1 ring-slate-200 dark:ring-slate-700'}`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Select Size</span>
                <button className="text-xs font-medium text-slate-500 underline decoration-slate-300">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {PRODUCT_DATA.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-12 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${(selectedSize === size) ? 'bg-primary text-white shadow-md shadow-primary/20 font-bold' : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'}`}
                  >
                    {size}
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

            {/* Actions (Add to Cart) - Moved here from sticky footer */}
            <div className="flex gap-3 pt-2">
              <button className="flex-shrink-0 w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95 group">
                <span className="material-symbols-outlined text-2xl group-hover:text-red-500 transition-colors">favorite</span>
              </button>
              <button className="flex-1 h-14 bg-primary rounded-xl flex items-center justify-center gap-2 text-white font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all">
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </button>
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
                <p>{PRODUCT_DATA.description}</p>
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
        <div className="bg-background-light dark:bg-[#0a0a0a] py-8 px-5 mt-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">You May Also Like</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 hide-scrollbar snap-x snap-mandatory">
            {RELATED_PRODUCTS.map((product) => (
              <div key={product.id} className="min-w-[160px] snap-start cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-white dark:bg-slate-800">
                  <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </button>
                </div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{product.name}</h4>
                <p className="text-sm font-semibold text-slate-500">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
