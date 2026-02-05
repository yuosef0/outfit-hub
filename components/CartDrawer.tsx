'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import type { CartItem, Product } from '@/lib/types';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

interface GroupedCartItems {
    [storeId: string]: {
        storeName: string;
        storeLogo?: string;
        items: (CartItem & { products: Product })[];
    };
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [cartItems, setCartItems] = useState<(CartItem & { products: Product })[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const supabase = useMemo(
        () =>
            createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            ),
        []
    );

    // Handle animation state
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
            fetchCart();
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            document.body.style.overflow = '';
            setCartItems([]); // Clear items on close to refresh next time
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Close on route change
    useEffect(() => {
        onClose();
    }, [pathname]);

    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Step 1: Fetch Cart Items (No Join)
            const { data: cartData, error: cartError } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (cartError) {
                console.error('Error fetching cart items:', cartError.message || cartError);
                return;
            };

            if (!cartData || cartData.length === 0) {
                setCartItems([]);
                return;
            }

            // Step 2: Fetch Products
            const productIds = cartData.map(item => item.product_id);
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select(`
                    *,
                    stores:store_id (
                        id,
                        name,
                        logo_url
                    )
                `)
                .in('id', productIds);

            if (productsError) {
                console.error('Error fetching products:', productsError.message || productsError);
                return;
            }

            // Step 3: Merge
            const mergedItems = cartData.map((cartItem) => {
                const product = productsData?.find((p) => p.id === cartItem.product_id);
                return product ? { ...cartItem, products: product } : null;
            }).filter(item => item !== null) as (CartItem & { products: Product })[];

            setCartItems(mergedItems);

        } catch (error: any) {
            console.error('Error fetching cart in drawer:', error.message || error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        // Optimistic update
        setCartItems(prev =>
            prev.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );

        try {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
                .eq('id', itemId);

            if (error) {
                console.error("Error updating quantity", error);
                // Revert or re-fetch could be added here
                fetchCart();
            }
        } catch (error) {
            console.error("Error updating quantity", error);
        }
    };

    const removeItem = async (itemId: string) => {
        // Optimistic update
        const previousItems = [...cartItems];
        setCartItems(prev => prev.filter(item => item.id !== itemId));

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('id', itemId);

            if (error) {
                setCartItems(previousItems);
                console.error('Error removing item:', error);
            }
        } catch (error) {
            setCartItems(previousItems);
            console.error('Error removing item:', error);
        }
    };

    const groupedItems: GroupedCartItems = cartItems.reduce((acc, item) => {
        // Ensure product and store exist before grouping
        if (!item.products?.stores) return acc;

        const storeId = item.products.stores.id;
        if (!acc[storeId]) {
            acc[storeId] = {
                storeName: item.products.stores.name,
                storeLogo: item.products.stores.logo_url,
                items: [],
            };
        }
        acc[storeId].items.push(item);
        return acc;
    }, {} as GroupedCartItems);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.products?.price || 0) * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
                        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">My Cart ({totalItems})</h1>
                        <Link
                            href="/cart"
                            onClick={onClose}
                            className="h-10 px-2 flex items-center justify-center text-primary font-semibold text-sm hover:opacity-80 transition-opacity"
                        >
                            View All
                        </Link>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : cartItems.length > 0 ? (
                        <div className="space-y-6">
                            {Object.entries(groupedItems).map(([storeId, { storeName, storeLogo, items }]) => (
                                <section key={storeId} className="flex flex-col gap-3">
                                    {/* Store Header */}
                                    <div className="flex items-center gap-3 px-1 py-1">
                                        <div className="size-8 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                                            {storeLogo ? (
                                                <img alt={storeName} className="w-full h-full object-cover" src={storeLogo} />
                                            ) : (
                                                <span className="material-symbols-outlined text-primary text-base">store</span>
                                            )}
                                        </div>
                                        <div className="flex-1 flex items-center gap-1">
                                            <h2 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{storeName}</h2>
                                            <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                                        </div>
                                    </div>

                                    {items.map((item) => (
                                        <article key={item.id} className="bg-transparent dark:bg-transparent rounded-2xl p-3 shadow-none flex gap-4 transition-colors border border-slate-200 dark:border-slate-800/50">
                                            {/* Product Image */}
                                            <div className="w-24 h-28 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                                                <Link href={`/products/${item.products.id}`} onClick={onClose}>
                                                    <img
                                                        src={item.products.image_urls?.[0] || 'https://via.placeholder.com/300x400'}
                                                        alt={item.products.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </Link>
                                            </div>
                                            {/* Content */}
                                            <div className="flex flex-col flex-1 justify-between py-0.5">
                                                <div>
                                                    <div className="flex justify-between items-start gap-3">
                                                        <Link href={`/products/${item.products.id}`} onClick={onClose}>
                                                            <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2 hover:text-primary transition-colors">
                                                                {item.products.name}
                                                            </h3>
                                                        </Link>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            aria-label="Remove item"
                                                            className="text-slate-500 hover:text-red-500 transition-colors shrink-0 p-1 -mr-1 -mt-1"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </div>
                                                    {item.products.category && (
                                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">{item.products.category}</p>
                                                    )}
                                                </div>
                                                <div className="flex items-end justify-between mt-3">
                                                    <span className="font-bold text-base text-primary dark:text-blue-400">${item.products.price.toFixed(2)}</span>
                                                    {/* Quantity Stepper */}
                                                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 h-8 shadow-inner">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            aria-label="Decrease quantity"
                                                            className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all"
                                                        >
                                                            <span className="material-symbols-outlined text-[16px] font-bold">remove</span>
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-semibold text-slate-900 dark:text-white tabular-nums">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            aria-label="Increase quantity"
                                                            className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all"
                                                        >
                                                            <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </section>
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-10 px-6 h-full">
                            <div className="w-48 h-48 mb-6 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
                                <div className="relative z-10 p-6 bg-slate-50 dark:bg-slate-800 rounded-full shadow-sm">
                                    <span className="material-symbols-outlined text-[64px] text-primary/80">shopping_bag</span>
                                </div>
                            </div>
                            <div className="max-w-[280px] flex flex-col items-center gap-3">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Your cart is empty</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                                    Looks like you haven't added anything to your cart yet. Explore our latest collections!
                                </p>
                            </div>
                            <Link
                                href="/"
                                onClick={onClose}
                                className="mt-8 flex items-center justify-center px-8 h-11 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all shadow-glow hover:shadow-lg active:scale-95"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </main>

                {/* Footer (Actions) */}
                {cartItems.length > 0 && (
                    <div className="mt-auto border-t border-slate-200 dark:border-slate-800 p-4 pb-8 bg-background-light dark:bg-background-dark">
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Subtotal ({totalItems} items)</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    onClose();
                                    router.push('/cart');
                                }}
                                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white h-12 rounded-xl font-bold text-base transition-all shadow-glow hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Proceed to Checkout
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
