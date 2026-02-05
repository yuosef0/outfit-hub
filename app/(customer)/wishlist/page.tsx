'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import type { Product } from '@/lib/types';

export default function WishlistPage() {
    const router = useRouter();
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const supabase = useMemo(
        () =>
            createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            ),
        []
    );

    // Fetch wishlist items
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    router.push('/login');
                    return;
                }

                const { data, error } = await supabase
                    .from('wishlist')
                    .select('*, products(*)')
                    .eq('user_id', user.id);

                if (error) throw error;

                // Extract products from the joined query
                // Using any here because Supabase types might be tricky with joins
                const products = data
                    ?.map((item: any) => item.products)
                    .filter(Boolean) as Product[];

                setWishlistItems(products || []);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWishlist();
    }, [supabase, router]);

    const removeFromWishlist = async (productId: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('wishlist')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);

            if (error) throw error;

            // Update UI
            setWishlistItems(prev => prev.filter(item => item.id !== productId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-[#000000]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Loading wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-[#000000] shadow-2xl relative overflow-hidden flex flex-col transition-colors duration-200">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-[#000000]/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50 p-4 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Wishlist</h1>
                <div className="flex-1"></div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {wishlistItems.length} items
                </div>
            </div>

            {/* Content */}
            <main className="flex-1 p-4 pb-24">
                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-slate-400">favorite_border</span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
                            Explore products and save your favorites to view them here later.
                        </p>
                        <Link
                            href="/stores"
                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors active:scale-95"
                        >
                            Explore Store
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {wishlistItems.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="group flex flex-col bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer relative"
                            >
                                <div className="aspect-[3/4] w-full relative bg-gray-100 dark:bg-gray-700">
                                    {product.image_urls && product.image_urls.length > 0 ? (
                                        <img
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            src={product.image_urls[0]}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">image</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeFromWishlist(product.id);
                                        }}
                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-red-500 hover:bg-white dark:hover:bg-black transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px] fill-current">favorite</span>
                                    </button>
                                </div>
                                <div className="p-3 flex flex-col gap-1 flex-1">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
                                        {product.name}
                                    </h3>
                                    <div className="mt-auto pt-2 flex items-center justify-between">
                                        <span className="text-base font-bold text-gray-900 dark:text-white">
                                            EGP {product.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
