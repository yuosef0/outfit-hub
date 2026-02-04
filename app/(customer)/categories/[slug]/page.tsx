'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { productSchema } from '@/lib/validators';
import { z } from 'zod';

// Extend the Zod schema for UI-specific fields that might exist in DB or need defaults
interface Product extends z.infer<typeof productSchema> {
    id: string;
    image_url: string;
    brand?: string;
    discount_price?: number;
    is_bestseller?: boolean;
}

// Dummy products for demonstration
const dummyProducts: Product[] = [
    {
        id: 'dummy-1',
        name: 'Cotton Crew Neck T-Shirt',
        price: 14.90,
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
        brand: 'Uniqlo',
        category: 'T-Shirts',
        description: 'Classic white crew neck t-shirt',
        stock_quantity: 50,
        gender_filter: 'male',
        is_bestseller: false
    },
    {
        id: 'dummy-2',
        name: 'Original Trucker Jacket',
        price: 89.00,
        image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
        brand: "Levi's",
        category: 'Jackets',
        description: 'Blue denim trucker jacket',
        stock_quantity: 30,
        gender_filter: 'male',
        is_bestseller: false
    },
    {
        id: 'dummy-3',
        name: 'Air Zoom Pegasus 39',
        price: 120.00,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
        brand: 'Nike',
        category: 'Shoes',
        description: 'Red Nike running shoes',
        stock_quantity: 25,
        gender_filter: 'unisex',
        is_bestseller: true
    },
    {
        id: 'dummy-4',
        name: '10" Vintage Shorts',
        price: 45.00,
        image_url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=600&fit=crop',
        brand: 'Gap',
        category: 'Pants & Shorts',
        description: 'Khaki shorts folded neatly',
        stock_quantity: 40,
        gender_filter: 'male',
        is_bestseller: false
    },
    {
        id: 'dummy-5',
        name: 'The Performance Chino',
        price: 72.00,
        image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=600&fit=crop',
        brand: 'Everlane',
        category: 'Pants & Shorts',
        description: 'Minimalist olive green chino pants',
        stock_quantity: 35,
        gender_filter: 'male',
        is_bestseller: false
    },
    {
        id: 'dummy-6',
        name: 'Old Skool Canvas',
        price: 65.00,
        discount_price: 75.00,
        image_url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=600&fit=crop',
        brand: 'Vans',
        category: 'Shoes',
        description: 'Pair of casual canvas sneakers',
        stock_quantity: 45,
        gender_filter: 'unisex',
        is_bestseller: false
    },
    {
        id: 'dummy-7',
        name: 'Classic Polo Shirt',
        price: 39.90,
        image_url: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=600&fit=crop',
        brand: 'Ralph Lauren',
        category: 'T-Shirts',
        description: 'Navy blue polo shirt',
        stock_quantity: 60,
        gender_filter: 'male',
        is_bestseller: false
    },
    {
        id: 'dummy-8',
        name: 'Slim Fit Jeans',
        price: 79.00,
        image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
        brand: "Levi's",
        category: 'Pants & Shorts',
        description: 'Dark wash slim fit jeans',
        stock_quantity: 55,
        gender_filter: 'male',
        is_bestseller: true
    }
];

export default function CategoryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';

    const [selectedGender, setSelectedGender] = useState('Men');
    const [selectedSubcategory, setSelectedSubcategory] = useState('All');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const subcategories = ['All', 'T-Shirts', 'Pants & Shorts', 'Shoes', 'Accessories'];
    const genders = ['Men', 'Women', 'Kids'];

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let query = supabase.from('products').select('*');

                const genderMap: Record<string, string> = {
                    'Men': 'male',
                    'Women': 'female',
                    'Kids': 'kids'
                };

                if (selectedGender && genderMap[selectedGender]) {
                    query = query.in('gender_filter', [genderMap[selectedGender], 'unisex']);
                }

                if (selectedSubcategory !== 'All') {
                    query = query.ilike('category', `%${selectedSubcategory}%`);
                } else if (slug) {
                    const cleanedSlug = slug.replace(/-/g, ' ');
                    query = query.or(`category.ilike.%${cleanedSlug}%,name.ilike.%${cleanedSlug}%`);
                }

                const { data, error } = await query;

                if (error) {
                    console.error('Error fetching products:', error);
                    // Use dummy products on error
                    setProducts(filterDummyProducts());
                } else if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    // Use dummy products when no results from database
                    setProducts(filterDummyProducts());
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                // Use dummy products on exception
                setProducts(filterDummyProducts());
            } finally {
                setIsLoading(false);
            }
        };

        // Filter dummy products based on selected gender and subcategory
        const filterDummyProducts = () => {
            let filtered = [...dummyProducts];

            // Filter by gender
            const genderMap: Record<string, string> = {
                'Men': 'male',
                'Women': 'female',
                'Kids': 'kids'
            };

            if (selectedGender && genderMap[selectedGender]) {
                filtered = filtered.filter(p =>
                    p.gender_filter === genderMap[selectedGender] || p.gender_filter === 'unisex'
                );
            }

            // Filter by subcategory
            if (selectedSubcategory !== 'All') {
                filtered = filtered.filter(p =>
                    p.category?.toLowerCase().includes(selectedSubcategory.toLowerCase())
                );
            }

            return filtered;
        };

        fetchProducts();
    }, [slug, selectedGender, selectedSubcategory]);

    const displayTitle = slug
        ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : "Category";

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white dark:bg-[#000000] border-x border-gray-200 dark:border-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#000000]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
                <div className="flex items-center justify-between p-4 h-14">
                    <button
                        onClick={() => router.back()}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center truncate px-2 text-slate-900 dark:text-white">{displayTitle}</h2>
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
                    </button>
                </div>

                {/* Subcategory Chips */}
                <div className="w-full overflow-x-auto no-scrollbar pb-3 px-4">
                    <style jsx>{`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .no-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
                    <div className="flex gap-3">
                        {subcategories.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => setSelectedSubcategory(sub)}
                                className={`flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all active:scale-95 ${selectedSubcategory === sub
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                                    }`}
                            >
                                <p className="text-sm font-medium whitespace-nowrap">{sub}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Filter & Sort Bar */}
            <div className="sticky top-[108px] z-40 bg-gray-50 dark:bg-[#0a0a0a] border-y border-gray-200 dark:border-gray-800 px-4 py-3 flex gap-3 items-center justify-between">
                {/* Gender Segmented Control */}
                <div className="flex h-10 flex-1 items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                    {genders.map((gender) => (
                        <label
                            key={gender}
                            className={`cursor-pointer relative flex-1 h-full flex items-center justify-center rounded-md transition-all ${selectedGender === gender
                                ? 'bg-white dark:bg-gray-700 shadow-sm'
                                : 'hover:bg-black/5 dark:hover:bg-white/5'
                                }`}
                        >
                            <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={selectedGender === gender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="sr-only"
                            />
                            <span className={`text-xs ${selectedGender === gender
                                ? 'font-semibold text-slate-900 dark:text-white'
                                : 'font-medium text-slate-600 dark:text-slate-400'
                                }`}>
                                {gender}
                            </span>
                        </label>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button className="flex items-center justify-center size-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 shadow-sm active:bg-gray-50 dark:active:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>swap_vert</span>
                    </button>
                    <button className="flex items-center justify-center size-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 shadow-sm active:bg-gray-50 dark:active:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>tune</span>
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <main className="flex-1 p-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 opacity-60">
                        <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Loading styles...</p>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group flex flex-col gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800/50 rounded-xl p-2 dark:p-3 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-300"
                                onClick={() => router.push(`/products/${product.id}`)}
                            >
                                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${product.image_url || 'https://via.placeholder.com/300x400'}')` }}
                                    />
                                    <button
                                        className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-slate-900 dark:text-white transition-transform active:scale-90"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Add to favorites logic
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>favorite_border</span>
                                    </button>
                                    {product.is_bestseller && (
                                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded-md">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Best Seller</span>
                                        </div>
                                    )}
                                </div>
                                <div className="px-1">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">{product.brand || 'Brand'}</p>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-500">${product.price.toFixed(2)}</p>
                                        {product.discount_price && (
                                            <p className="text-xs text-slate-400 line-through">${product.discount_price.toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">No products found for this category.</p>
                    </div>
                )}

                {/* Infinite Scroll Loading State */}
                {!isLoading && products.length > 0 && (
                    <div className="flex flex-col items-center justify-center py-8 gap-3 opacity-60">
                        <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Loading more styles...</p>
                    </div>
                )}
            </main>

            {/* Floating Cart Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:bg-primary/90 transition-colors active:scale-95"
                    onClick={() => router.push('/cart')}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
                    <span className="absolute top-3 right-3 size-2.5 bg-red-500 border-2 border-primary rounded-full"></span>
                </button>
            </div>
        </div>
    );
}
