'use client';

import { SimpleHeader } from '@/components/Header';

export default function MerchantOrders() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <SimpleHeader title="Orders" showBack={false} />

      <main className="p-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Pending', 'Confirmed', 'Completed'].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
                status === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-card-light dark:bg-card-dark text-text-light-primary dark:text-text-dark-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-text-light-primary dark:text-text-dark-primary">
                    Order #{1000 + i}
                  </p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    2 hours ago
                  </p>
                </div>
                <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold rounded">
                  Pending
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
                    Customer Name
                  </p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    2 items
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border-light dark:border-border-dark">
                <p className="font-bold text-primary">$45.00</p>
                <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
