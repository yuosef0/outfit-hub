'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function MerchantNav() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/merchant/dashboard', icon: 'dashboard' },
        { name: 'المنتجات', path: '/merchant/products', icon: 'inventory_2' },
        { name: 'الطلبات', path: '/merchant/orders', icon: 'shopping_bag' },
        { name: 'التحليلات', path: '/merchant/analytics', icon: 'analytics' },
        { name: 'التقييمات', path: '/merchant/reviews', icon: 'star' },
        { name: 'الكوبونات', path: '/merchant/coupons', icon: 'local_offer' },
        { name: 'الإعدادات', path: '/merchant/settings', icon: 'settings' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                {/* Logo */}
                <div className="flex items-center gap-2 h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl">store</span>
                    </div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">Outfit Hub</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                    ? 'bg-primary text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">person</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">التاجر</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">عرض الملف الشخصي</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between h-16 px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">store</span>
                        </div>
                        <span className="font-bold text-lg text-gray-900 dark:text-white">Outfit Hub</span>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <span className="material-symbols-outlined text-gray-900 dark:text-white">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="px-4 py-4 space-y-1 border-t border-gray-200 dark:border-gray-700">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            {/* Mobile Spacer */}
            <div className="lg:hidden h-16"></div>
        </>
    );
}
