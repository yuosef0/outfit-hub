'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export function BottomNavigation() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark px-6 py-3 flex justify-between items-center">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-400 hover:text-primary'
          }`}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0" }}
        >
          home
        </span>
        <span className="text-[10px] font-bold">Home</span>
      </Link>

      <Link
        href="/mall"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/mall') ? 'text-primary' : 'text-slate-400 hover:text-primary'
          }`}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: isActive('/mall') ? "'FILL' 1" : "'FILL' 0" }}
        >
          explore
        </span>
        <span className="text-[10px] font-bold">Mall</span>
      </Link>

      <Link
        href="/saved"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/saved') ? 'text-primary' : 'text-slate-400 hover:text-primary'
          }`}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: isActive('/saved') ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
        <span className="text-[10px] font-bold">Saved</span>
      </Link>

      <Link
        href="/cart"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/cart') ? 'text-primary' : 'text-slate-400 hover:text-primary'
          }`}
      >
        <div className="relative">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: isActive('/cart') ? "'FILL' 1" : "'FILL' 0" }}
          >
            shopping_bag
          </span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold">Cart</span>
      </Link>

      <Link
        href="/profile"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-primary' : 'text-slate-400 hover:text-primary'
          }`}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: isActive('/profile') ? "'FILL' 1" : "'FILL' 0" }}
        >
          person
        </span>
        <span className="text-[10px] font-bold">Profile</span>
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
        className={`flex flex-col items-center gap-1 ${isActive('/merchant/dashboard')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
          }`}
      >
        <span
          className={`material-symbols-outlined ${isActive('/merchant/dashboard') ? 'filled' : ''
            }`}
        >
          dashboard
        </span>
        <span className="text-xs font-bold">Dashboard</span>
      </Link>

      <Link
        href="/merchant/products"
        className={`flex flex-col items-center gap-1 ${isActive('/merchant/products')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
          }`}
      >
        <span
          className={`material-symbols-outlined ${isActive('/merchant/products') ? 'filled' : ''
            }`}
        >
          inventory_2
        </span>
        <span className="text-xs">Products</span>
      </Link>

      <Link
        href="/merchant/orders"
        className={`flex flex-col items-center gap-1 ${isActive('/merchant/orders')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
          }`}
      >
        <span
          className={`material-symbols-outlined ${isActive('/merchant/orders') ? 'filled' : ''
            }`}
        >
          receipt_long
        </span>
        <span className="text-xs">Orders</span>
      </Link>

      <Link
        href="/merchant/analytics"
        className={`flex flex-col items-center gap-1 ${isActive('/merchant/analytics')
            ? 'text-primary'
            : 'text-text-light-secondary dark:text-text-dark-secondary'
          }`}
      >
        <span
          className={`material-symbols-outlined ${isActive('/merchant/analytics') ? 'filled' : ''
            }`}
        >
          analytics
        </span>
        <span className="text-xs">Analytics</span>
      </Link>
    </nav>
  );
}
