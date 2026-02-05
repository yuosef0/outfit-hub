'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import MerchantNav from '@/components/merchant/MerchantNav';
import StatsCard from '@/components/merchant/StatsCard';
import { Order, Product } from '@/lib/types';

export default function MerchantDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [storeName, setStoreName] = useState('');

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    avgRating: 0,
    salesChange: '+0%',
    ordersChange: '+0%',
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    checkMerchantAndStore();
  }, []);

  const checkMerchantAndStore = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/merchant/login');
        return;
      }

      // Get merchant's store
      const { data: store, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('merchant_id', user.id)
        .single();

      if (storeError || !store) {
        router.push('/merchant/setup');
        return;
      }

      if (!store.is_active) {
        router.push('/merchant/pending');
        return;
      }

      setStoreId(store.id);
      setStoreName(store.name);

      // Fetch dashboard data
      await Promise.all([
        fetchStats(store.id),
        fetchRecentOrders(store.id),
        fetchTopProducts(store.id),
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (storeId: string) => {
    // Fetch total sales and orders
    const { data: orders } = await supabase
      .from('orders')
      .select('total_amount, status, created_at')
      .eq('store_id', storeId);

    if (orders) {
      const completedOrders = orders.filter(o => o.status === 'completed');
      const totalSales = completedOrders.reduce((sum, o) => sum + o.total_amount, 0);

      setStats(prev => ({
        ...prev,
        totalSales,
        totalOrders: orders.length,
      }));
    }

    // Fetch total products
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', storeId);

    if (productsCount !== null) {
      setStats(prev => ({ ...prev, totalProducts: productsCount }));
    }

    // Fetch store rating
    const { data: store } = await supabase
      .from('stores')
      .select('rating')
      .eq('id', storeId)
      .single();

    if (store) {
      setStats(prev => ({ ...prev, avgRating: store.rating || 0 }));
    }
  };

  const fetchRecentOrders = async (storeId: string) => {
    const { data: orders } = await supabase
      .from('orders')
      .select(`
                *,
                customer:customer_id (
                    full_name,
                    phone
                )
            `)
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (orders) {
      setRecentOrders(orders as any);
    }
  };

  const fetchTopProducts = async (storeId: string) => {
    const { data: products } = await supabase
      .from('products')
      .select('id, name, image_urls, price')
      .eq('store_id', storeId)
      .eq('is_active', true)
      .limit(3);

    if (products) {
      setTopProducts(products);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      reserved: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'جديد' },
      confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'مؤكد' },
      ready: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'جاهز' },
      completed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'مكتمل' },
      cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'ملغي' },
      expired: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', label: 'منتهي' },
    };

    const badge = badges[status as keyof typeof badges] || badges.reserved;
    return (
      <span className={`px-3 py-1 ${badge.bg} ${badge.text} text-xs font-medium rounded-full`}>
        {badge.label}
      </span>
    );
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
      <MerchantNav />

      <main className="lg:mr-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🏪 {storeName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            مرحباً! 👋 إليك نظرة عامة على متجرك
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="المبيعات"
            value={`${stats.totalSales.toFixed(2)} ج.م`}
            change={stats.salesChange}
            changeType="increase"
            icon="payments"
          />
          <StatsCard
            title="الطلبات"
            value={stats.totalOrders}
            change={stats.ordersChange}
            changeType="increase"
            icon="shopping_bag"
          />
          <StatsCard
            title="المنتجات"
            value={stats.totalProducts}
            icon="inventory_2"
          />
          <StatsCard
            title="التقييم"
            value={stats.avgRating.toFixed(1)}
            icon="star"
            iconBg="bg-yellow-100 dark:bg-yellow-900/30"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ إجراءات سريعة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/merchant/products/new"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl text-primary">add_circle</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">أضف منتج</span>
            </Link>
            <Link
              href="/merchant/orders"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl text-primary">shopping_bag</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">الطلبات</span>
            </Link>
            <Link
              href="/merchant/coupons"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl text-primary">local_offer</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">كوبون</span>
            </Link>
            <Link
              href="/merchant/analytics"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl text-primary">analytics</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">التحليلات</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                📦 آخر الطلبات
              </h2>
              <Link
                href="/merchant/orders"
                className="text-primary hover:underline text-sm font-medium"
              >
                عرض الكل →
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        طلب #{order.pickup_code}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.total_amount.toFixed(2)} ج.م
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                لا توجد طلبات بعد
              </p>
            )}
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🏆 منتجاتك
            </h2>

            {topProducts.length > 0 ? (
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-2xl font-bold text-gray-400">
                      {index + 1}
                    </span>
                    <img
                      src={product.image_urls?.[0] || 'https://via.placeholder.com/100'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {product.price.toFixed(2)} ج.م
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  لم تضف أي منتجات بعد
                </p>
                <Link
                  href="/merchant/products/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                  أضف منتجك الأول
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
