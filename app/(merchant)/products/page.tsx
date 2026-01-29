'use client';

import { SimpleHeader } from '@/components/Header';

export default function MerchantProducts() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <SimpleHeader title="Products" showBack={false} />

      <main className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">
            My Products
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold">
            <span className="material-symbols-outlined text-xl">add</span>
            Add Product
          </button>
        </div>

        <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4 block">
            inventory_2
          </span>
          <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
            No products yet
          </h3>
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Start adding products to your store
          </p>
        </div>
      </main>
    </div>
  );
}
