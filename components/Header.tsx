'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { ThemeToggleCompact } from './ThemeToggle';

export function Header() {
  const { isAuthenticated, user } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="flex flex-col gap-2 p-4 pb-2 bg-background-light dark:bg-background-dark sticky top-0 z-10">
      <div className="flex items-center h-12 justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-light-primary dark:text-text-dark-primary text-2xl">
            location_on
          </span>
          <p className="text-text-light-primary dark:text-text-dark-primary tracking-light text-base font-bold leading-tight">
            Cairo, Egypt
          </p>
          <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-xl">
            expand_more
          </span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/notifications"
            className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-text-light-primary dark:text-text-dark-primary"
          >
            <span className="material-symbols-outlined text-2xl relative">
              notifications
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background-light dark:ring-background-dark"></span>
            </span>
          </Link>
          <ThemeToggleCompact />
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-primary text-sm font-bold"
            >
              {user?.full_name?.charAt(0).toUpperCase() || 'U'}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center rounded-full h-10 w-10 text-text-light-primary dark:text-text-dark-primary text-sm font-bold bg-border-light dark:bg-card-dark"
            >
              EN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// Simple header for internal pages
export function SimpleHeader({ title, showBack = true }: { title: string; showBack?: boolean }) {
  return (
    <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
      <div className="flex items-center justify-between px-4 h-14">
        {showBack ? (
          <Link
            href="/"
            className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </Link>
        ) : (
          <div className="w-10"></div>
        )}
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        <div className="w-10"></div>
      </div>
    </header>
  );
}
