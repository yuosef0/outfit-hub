'use client';

import { SimpleHeader } from '@/components/Header';

export default function MerchantAnalytics() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <SimpleHeader title="Analytics" showBack={false} />

      <main className="p-4 space-y-6">
        {/* Time Period Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Today', 'Week', 'Month', 'Year'].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
                period === 'Month'
                  ? 'bg-primary text-white'
                  : 'bg-card-light dark:bg-card-dark text-text-light-primary dark:text-text-dark-primary'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
          <h3 className="font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
            Revenue Overview
          </h3>
          <div className="h-48 flex items-end justify-around gap-2">
            {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-primary/20 rounded-t"
                  style={{ height: `${height}%` }}
                >
                  <div
                    className="w-full bg-primary rounded-t"
                    style={{ height: '70%' }}
                  ></div>
                </div>
                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
          <h3 className="font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Premium T-Shirt', sales: 45, revenue: '$1,125' },
              { name: 'Classic Jeans', sales: 38, revenue: '$1,900' },
              { name: 'Leather Boots', sales: 32, revenue: '$3,200' },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                  <div>
                    <p className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary">
                      {product.name}
                    </p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      {product.sales} sold
                    </p>
                  </div>
                </div>
                <p className="font-bold text-primary">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
              Avg Order Value
            </p>
            <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
              $79.85
            </p>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-soft">
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
              Conversion Rate
            </p>
            <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
              3.2%
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
