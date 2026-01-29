'use client';

import { useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      storeName: 'Zara Official Store',
      storeId: 'store1',
      name: 'Premium Slim Fit Linen Shirt',
      color: 'Navy',
      size: 'L',
      price: 45.00,
      quantity: 1,
    },
    {
      id: 2,
      storeName: 'Zara Official Store',
      storeId: 'store1',
      name: 'Classic Leather Chelsea Boots',
      color: 'Black',
      size: '42',
      price: 120.00,
      quantity: 1,
    },
    {
      id: 3,
      storeName: 'Nike Store',
      storeId: 'store2',
      name: 'Nike Air Max 270 React',
      color: 'Red',
      size: '10',
      price: 150.00,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.storeId]) {
      acc[item.storeId] = {
        storeName: item.storeName,
        items: [],
      };
    }
    acc[item.storeId].items.push(item);
    return acc;
  }, {} as Record<string, { storeName: string; items: typeof cartItems }>);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-200">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            aria-label="Go back"
            className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">My Cart</h1>
          <button className="h-10 px-2 flex items-center justify-center text-primary font-semibold text-sm hover:opacity-80 transition-opacity">
            Edit
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-40 px-4 pt-2">
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([storeId, { storeName, items }]) => (
              <section key={storeId} className="flex flex-col gap-3">
                {/* Store Header */}
                <div className="flex items-center gap-3 px-1 py-1">
                  <div className="size-8 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-primary text-base">store</span>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <h2 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{storeName}</h2>
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                  </div>
                </div>

                {/* Cart Items */}
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm flex gap-4 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-28 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-900 transition-transform duration-500 group-hover:scale-105"></div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start gap-3">
                          <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            className="text-slate-400 hover:text-red-500 transition-colors shrink-0 p-1 -mr-1 -mt-1"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">
                          Color: {item.color} • Size: {item.size}
                        </p>
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        <span className="font-bold text-base text-primary dark:text-blue-400">
                          ${item.price.toFixed(2)}
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 h-8 shadow-inner">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="size-6 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shadow-sm hover:scale-105 active:scale-95 transition-all"
                          >
                            <span className="material-symbols-outlined text-[16px] font-bold">remove</span>
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-slate-900 dark:text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
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
          <div className="flex flex-col items-center justify-center py-10 px-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm mt-8">
            <div className="w-48 h-48 mb-6 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
              <div className="relative z-10 p-6 bg-slate-50 dark:bg-slate-800 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[64px] text-primary/80">shopping_bag</span>
              </div>
              <div
                className="absolute top-10 right-10 p-2 bg-white dark:bg-slate-700 rounded-full shadow-md animate-bounce"
                style={{ animationDuration: '3s' }}
              >
                <span className="material-symbols-outlined text-xl text-yellow-400">star</span>
              </div>
              <div className="absolute bottom-10 left-8 p-1.5 bg-white dark:bg-slate-700 rounded-full shadow-md">
                <span className="material-symbols-outlined text-lg text-red-400">favorite</span>
              </div>
            </div>
            <div className="max-w-[280px] flex flex-col items-center gap-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Your cart is empty</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Looks like you haven&apos;t added anything to your cart yet. Explore our latest collections!
              </p>
            </div>
            <button className="mt-8 flex items-center justify-center px-8 h-11 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95">
              Start Shopping
            </button>
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar */}
      {cartItems.length > 0 && (
        <footer className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-4 pb-8 z-40 transition-colors">
          <div className="w-full max-w-md mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white h-12 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
              Proceed to Checkout
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
