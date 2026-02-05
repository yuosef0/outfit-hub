'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import type { Store, Product } from '@/lib/types';

export default function StoreProfilePage() {
    const router = useRouter();
    const params = useParams();
    const storeId = params.id as string;

    const [activeTab, setActiveTab] = useState('Products');
    const [store, setStore] = useState<Store | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeGender, setActiveGender] = useState('All');

    const supabase = useMemo(
        () =>
            createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            ),
        []
    );

    // Fetch store data
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const { data, error } = await supabase
                    .from('stores')
                    .select('*')
                    .eq('id', storeId)
                    .single();

                if (error) throw error;
                setStore(data);
            } catch (error) {
                console.error('Error fetching store:', error);
            }
        };

        if (storeId) {
            fetchStore();
        }
    }, [storeId, supabase]);

    // Fetch products for this store
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('store_id', storeId)
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setProducts(data || []);
                setFilteredProducts(data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (storeId) {
            fetchProducts();
        }
    }, [storeId, supabase]);

    // Filter products
    useEffect(() => {
        let filtered = [...products];

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by gender
        if (activeGender !== 'All') {
            filtered = filtered.filter(product => product.gender_filter === activeGender.toLowerCase());
        }

        setFilteredProducts(filtered);
    }, [searchQuery, activeGender, products]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-[#000000]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Loading store...</p>
                </div>
            </div>
        );
    }

    if (!store) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-[#000000]">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">store</span>
                    <p className="text-slate-600 dark:text-slate-400">Store not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-[#000000] shadow-xl overflow-hidden transition-colors duration-200">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-[#000000]/95 backdrop-blur-md p-4 justify-between border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => router.back()}
                    className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center truncate px-2">{store.name}</h2>
                <div className="flex w-10 items-center justify-end">
                    <button className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">more_vert</span>
                    </button>
                </div>
            </div>

            {/* Store Header Area */}
            <div className="flex flex-col w-full relative">
                {/* Cover Image */}
                <div className="w-full h-40 bg-gray-300 relative overflow-hidden">
                    {store.banner_url ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${store.banner_url}')` }}
                        ></div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Profile Info & Logo */}
                <div className="px-4 relative pb-4">
                    <div className="flex justify-between items-end -mt-10 mb-3">
                        {/* Logo */}
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-[4px] border-background-light dark:border-[#000000] bg-white overflow-hidden shadow-sm">
                                {store.logo_url ? (
                                    <img alt="Store Logo" className="w-full h-full object-cover" src={store.logo_url} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                        <span className="material-symbols-outlined text-4xl text-gray-400">store</span>
                                    </div>
                                )}
                            </div>
                            {/* Verified Badge */}
                            <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-0.5 border-2 border-background-light dark:border-[#000000] flex items-center justify-center" title="Verified Merchant">
                                <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                            </div>
                        </div>
                        {/* Follow Button */}
                        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-sm transition-transform active:scale-95 h-10 mb-2">
                            <span>Follow</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{store.name}</h1>
                        <div className="flex items-center gap-2 text-sm">
                            {store.category && (
                                <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium text-xs border border-gray-200 dark:border-gray-700">{store.category}</span>
                            )}
                            <div className="flex items-center gap-1 text-amber-500">
                                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                <span className="font-bold text-gray-900 dark:text-white">4.8</span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal">(1.2k Reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Bar (Actions) */}
            <div className="px-4 py-2">
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    <style jsx>{`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .no-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
                    {store.address && (
                        <div className="flex items-center gap-2 pl-1 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">{store.address}</span>
                                <span className="text-[10px] text-gray-500">View on map</span>
                            </div>
                        </div>
                    )}
                    {store.phone && (
                        <div className="flex items-center gap-2 pl-1 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined text-[18px]">call</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-gray-900 dark:text-white">Call Now</span>
                                <span className="text-[10px] text-gray-500">{store.phone}</span>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2 pl-1 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">Open</span>
                            <span className="text-[10px] text-gray-500">Until 9 PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-[73px] z-40 bg-background-light dark:bg-[#000000] border-b border-gray-200 dark:border-gray-800">
                <div className="flex px-4">
                    <button
                        onClick={() => setActiveTab('Products')}
                        className={`flex-1 pb-3 pt-3 border-b-[3px] font-bold text-sm text-center relative transition-colors ${activeTab === 'Products' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        Products ({products.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('About')}
                        className={`flex-1 pb-3 pt-3 border-b-[3px] font-medium text-sm text-center transition-colors ${activeTab === 'About' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => setActiveTab('Reviews')}
                        className={`flex-1 pb-3 pt-3 border-b-[3px] font-medium text-sm text-center transition-colors ${activeTab === 'Reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        Reviews
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col p-4 gap-5 min-h-[500px]">
                {activeTab === 'Products' && (
                    <>
                        {/* Search & Filter Controls */}
                        <div className="flex flex-col gap-4">
                            {/* Search Bar */}
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">search</span>
                                </div>
                                <input
                                    className="block w-full rounded-xl border-none bg-white dark:bg-gray-800 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary shadow-sm"
                                    placeholder={`Search in ${store.name}...`}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Gender Segmented Control */}
                            <div className="w-full bg-gray-200 dark:bg-gray-800 p-1 rounded-lg flex text-sm font-medium">
                                <button
                                    onClick={() => setActiveGender('All')}
                                    className={`flex-1 py-1.5 rounded-md transition-all ${activeGender === 'All' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setActiveGender('Men')}
                                    className={`flex-1 py-1.5 rounded-md transition-all ${activeGender === 'Men' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    Men
                                </button>
                                <button
                                    onClick={() => setActiveGender('Women')}
                                    className={`flex-1 py-1.5 rounded-md transition-all ${activeGender === 'Women' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    Women
                                </button>
                                <button
                                    onClick={() => setActiveGender('Kids')}
                                    className={`flex-1 py-1.5 rounded-md transition-all ${activeGender === 'Kids' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    Kids
                                </button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">inventory_2</span>
                                <p className="text-slate-600 dark:text-slate-400">No products found</p>
                                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 pb-20">
                                {filteredProducts.map((product) => (
                                    <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col bg-white/50 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                                        <div className="aspect-[3/4] w-full relative bg-gray-100 dark:bg-gray-700">
                                            {product.image_urls && product.image_urls.length > 0 ? (
                                                <img alt={product.name} className="w-full h-full object-cover" src={product.image_urls[0]} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">image</span>
                                                </div>
                                            )}
                                            <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-gray-600 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">favorite</span>
                                            </button>
                                            {product.stock_quantity === 0 && (
                                                <div className="absolute bottom-2 left-2 bg-red-500 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                                                    SOLD OUT
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3 flex flex-col gap-1 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">{product.name}</h3>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                                            <div className="mt-auto pt-2 flex items-center justify-between">
                                                <span className="text-base font-bold text-gray-900 dark:text-white">EGP {product.price.toFixed(2)}</span>
                                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90">
                                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'About' && (
                    <div className="space-y-4 pb-20">
                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">About {store.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {store.description || 'No description available.'}
                            </p>
                        </div>
                        {store.address && (
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Location</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{store.address}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Reviews' && (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">rate_review</span>
                        <p className="text-slate-600 dark:text-slate-400">No reviews yet</p>
                    </div>
                )}
            </main>
        </div>
    );
}
