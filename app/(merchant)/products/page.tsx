'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import MerchantNav from '@/components/merchant/MerchantNav';
import Toast from '@/components/Toast';
import { Product } from '@/lib/types';

export default function ProductsListPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    checkStoreAndFetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const checkStoreAndFetchProducts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/merchant/login');
        return;
      }

      const { data: store } = await supabase
        .from('stores')
        .select('id')
        .eq('merchant_id', user.id)
        .single();

      if (!store) {
        router.push('/merchant/setup');
        return;
      }

      setStoreId(store.id);
      await fetchProducts(store.id);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (storeId: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    setProducts(data || []);
    setFilteredProducts(data || []);
  };

  const toggleProductStatus = async (productId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !currentStatus })
      .eq('id', productId);

    if (error) {
      setToast({ message: 'حدث خطأ أثناء تحديث حالة المنتج', type: 'error' });
      return;
    }

    setToast({ message: 'تم تحديث حالة المنتج بنجاح', type: 'success' });

    // Update local state
    setProducts(products.map(p =>
      p.id === productId ? { ...p, is_active: !currentStatus } : p
    ));
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      return;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      setToast({ message: 'حدث خطأ أثناء حذف المنتج', type: 'error' });
      return;
    }

    setToast({ message: 'تم حذف المنتج بنجاح', type: 'success' });
    setProducts(products.filter(p => p.id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <MerchantNav />

      <main className="lg:mr-64 p-4 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📦 المنتجات
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة منتجات متجرك ({products.length} منتج)
            </p>
          </div>
          <Link
            href="/merchant/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            إضافة منتج
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <img
                    src={product.image_urls?.[0] || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.is_active && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        غير نشط
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-primary mb-2">
                    {product.price.toFixed(2)} ج.م
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="material-symbols-outlined text-base">inventory</span>
                    <span>الكمية: {product.stock_quantity}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleProductStatus(product.id, product.is_active)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${product.is_active
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
                        }`}
                    >
                      {product.is_active ? 'إيقاف' : 'تفعيل'}
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">inventory_2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'لا توجد نتائج' : 'لا توجد منتجات'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery ? 'جرب البحث بكلمات أخرى' : 'ابدأ بإضافة منتجك الأول'}
            </p>
            {!searchQuery && (
              <Link
                href="/merchant/products/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                إضافة منتج
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
