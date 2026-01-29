'use client';

import { SimpleHeader } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';

export default function MerchantDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <SimpleHeader title="Dashboard" showBack={false} />

      <main className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-green-700 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.full_name}!</h2>
          <p className="text-white/90">Here's your business overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Total Sales
              </p>
            </div>
            <p className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              $12,450
            </p>
            <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
          </div>

          <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Orders
              </p>
            </div>
            <p className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              156
            </p>
            <p className="text-xs text-green-500 mt-1">+8 new today</p>
          </div>

          <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Products
              </p>
            </div>
            <p className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              89
            </p>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
              Active listings
            </p>
          </div>

          <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">star</span>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Rating
              </p>
            </div>
            <p className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              4.8
            </p>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
              From 124 reviews
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card-light dark:bg-card-dark rounded-2xl p-4 shadow-soft">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-text-light-primary dark:text-text-dark-primary">
              Recent Orders
            </h3>
            <a href="/merchant/orders" className="text-primary text-sm font-semibold">
              View All
            </a>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-background-light dark:bg-background-dark rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">shopping_bag</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">
                      Order #{1000 + i}
                    </p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      2 items • $45.00
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold rounded">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/merchant/products"
            className="flex flex-col items-center gap-2 p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined text-primary text-3xl">add_box</span>
            <p className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              Add Product
            </p>
          </a>

          <a
            href="/merchant/analytics"
            className="flex flex-col items-center gap-2 p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
            <p className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              View Analytics
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
