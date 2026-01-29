'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export function BottomNavigation() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark flex justify-around items-center px-4 pb-4 z-40">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 ${
          isActive('/') ? 'text-primary' : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/') ? 'filled' : ''}`}>home</span>
        <span className="text-xs font-bold">Home</span>
      </Link>

      <Link
        href="/categories"
        className={`flex flex-col items-center gap-1 ${
          isActive('/categories')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/categories') ? 'filled' : ''}`}>
          widgets
        </span>
        <span className="text-xs">Categories</span>
      </Link>

      <Link
        href="/cart"
        className={`flex flex-col items-center gap-1 relative ${
          isActive('/cart') ? 'text-primary' : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/cart') ? 'filled' : ''}`}>
          shopping_cart
        </span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
        <span className="text-xs">Cart</span>
      </Link>

      <Link
        href="/profile"
        className={`flex flex-col items-center gap-1 ${
          isActive('/profile')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/profile') ? 'filled' : ''}`}>
          person
        </span>
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
}

// Merchant navigation
export function MerchantNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark flex justify-around items-center px-4 pb-4 z-40">
      <Link
        href="/merchant/dashboard"
        className={`flex flex-col items-center gap-1 ${
          isActive('/merchant/dashboard')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/merchant/dashboard') ? 'filled' : ''}`}>
          dashboard
        </span>
        <span className="text-xs font-bold">Dashboard</span>
      </Link>

      <Link
        href="/merchant/products"
        className={`flex flex-col items-center gap-1 ${
          isActive('/merchant/products')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/merchant/products') ? 'filled' : ''}`}>
          inventory_2
        </span>
        <span className="text-xs">Products</span>
      </Link>

      <Link
        href="/merchant/orders"
        className={`flex flex-col items-center gap-1 ${
          isActive('/merchant/orders')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/merchant/orders') ? 'filled' : ''}`}>
          receipt_long
        </span>
        <span className="text-xs">Orders</span>
      </Link>

      <Link
        href="/merchant/analytics"
        className={`flex flex-col items-center gap-1 ${
          isActive('/merchant/analytics')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
        }`}
      >
        <span className={`material-symbols-outlined ${isActive('/merchant/analytics') ? 'filled' : ''}`}>
          analytics
        </span>
        <span className="text-xs">Analytics</span>
      </Link>
    </nav>
  );
}
