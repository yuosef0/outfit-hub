'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import MerchantNav from '@/components/merchant/MerchantNav';
import StatsCard from '@/components/merchant/StatsCard';

export default function AnalyticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storeId, setStoreId] = useState<string | null>(null);

  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    avgOrderValue: 0,
    totalCommission: 0,
  });

  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [recentSales, setRecentSales] = useState<any[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    checkStoreAndFetchAnalytics();
  }, []);

  const checkStoreAndFetchAnalytics = async () => {
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
      await fetchAnalytics(store.id);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (storeId: string) => {
    // Fetch orders data
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('store_id', storeId);

    if (orders) {
      const completed = orders.filter(o => o.status === 'completed');
      const cancelled = orders.filter(o => o.status === 'cancelled');
      const totalRevenue = completed.reduce((sum, o) => sum + o.total_amount, 0);
      const totalCommission = completed.reduce((sum, o) => sum + o.commission_amount, 0);
      const avgOrderValue = completed.length > 0 ? totalRevenue / completed.length : 0;

      setAnalytics({
        totalRevenue,
        totalOrders: orders.length,
        completedOrders: completed.length,
        cancelledOrders: cancelled.length,
        avgOrderValue,
        totalCommission,
      });

      // Get recent completed sales
      setRecentSales(completed.slice(0, 10));
    }

    // Fetch product sales stats
    const { data: products } = await supabase
      .from('products')
      .select('id, name, image_urls, price')
      .eq('store_id', storeId)
      .eq('is_active', true)
      .limit(5);

    if (products) {
      setTopProducts(products);
    }
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
            📊 التحليلات
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تحليل أداء متجرك ومبيعاتك
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="إجمالي المبيعات"
            value={`${analytics.totalRevenue.toFixed(2)} ج.م`}
            icon="payments"
          />
          <StatsCard
            title="الطلبات المكتملة"
            value={analytics.completedOrders}
            icon="check_circle"
            iconBg="bg-green-100 dark:bg-green-900/30"
          />
          <StatsCard
            title="متوسط قيمة الطلب"
            value={`${analytics.avgOrderValue.toFixed(2)} ج.م`}
            icon="trending_up"
          />
          <StatsCard
            title="إجمالي الطلبات"
            value={analytics.totalOrders}
            icon="shopping_bag"
          />
          <StatsCard
            title="الطلبات الملغاة"
            value={analytics.cancelledOrders}
            icon="cancel"
            iconBg="bg-red-100 dark:bg-red-900/30"
          />
          <StatsCard
            title="العمولة المدفوعة"
            value={`${analytics.totalCommission.toFixed(2)} ج.م`}
            icon="account_balance"
            iconBg="bg-yellow-100 dark:bg-yellow-900/30"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🏆 أفضل المنتجات
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
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                لا توجد بيانات
              </p>
            )}
          </div>

          {/* Recent Sales */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              💰 آخر المبيعات
            </h2>

            {recentSales.length > 0 ? (
              <div className="space-y-3">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        طلب #{sale.pickup_code}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(sale.created_at).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      {sale.total_amount.toFixed(2)} ج.م
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                لا توجد مبيعات بعد
              </p>
            )}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-gradient-to-r from-primary to-green-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">📈 ملخص الأداء</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">معدل إتمام الطلبات</p>
              <p className="text-3xl font-bold">
                {analytics.totalOrders > 0
                  ? ((analytics.completedOrders / analytics.totalOrders) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">معدل الإلغاء</p>
              <p className="text-3xl font-bold">
                {analytics.totalOrders > 0
                  ? ((analytics.cancelledOrders / analytics.totalOrders) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">صافي الربح (بعد العمولة)</p>
              <p className="text-3xl font-bold">
                {(analytics.totalRevenue - analytics.totalCommission).toFixed(2)} ج.م
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
