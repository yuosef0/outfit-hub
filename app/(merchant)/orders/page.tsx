'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import MerchantNav from '@/components/merchant/MerchantNav';
import Toast from '@/components/Toast';
import { Order, OrderStatus } from '@/lib/types';

const STATUS_FILTERS: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'الكل' },
  { value: 'reserved', label: 'جديد' },
  { value: 'confirmed', label: 'مؤكد' },
  { value: 'ready', label: 'جاهز' },
  { value: 'completed', label: 'مكتمل' },
  { value: 'cancelled', label: 'ملغي' },
];

export default function OrdersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    checkStoreAndFetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(o => o.status === statusFilter));
    }
  }, [statusFilter, orders]);

  const checkStoreAndFetchOrders = async () => {
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
      await fetchOrders(store.id);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (storeId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return;
    }

    setOrders(data || []);
    setFilteredOrders(data || []);
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      setToast({ message: 'حدث خطأ أثناء تحديث حالة الطلب', type: 'error' });
      return;
    }

    setToast({ message: 'تم تحديث حالة الطلب بنجاح', type: 'success' });

    // Update local state
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const badges = {
      reserved: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'جديد' },
      confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'مؤكد' },
      ready: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'جاهز' },
      completed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'مكتمل' },
      cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'ملغي' },
      expired: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', label: 'منتهي' },
    };

    const badge = badges[status];
    return (
      <span className={`px-3 py-1 ${badge.bg} ${badge.text} text-xs font-medium rounded-full`}>
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📦 الطلبات
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة طلبات متجرك ({orders.length} طلب)
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${statusFilter === filter.value
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">كود الاستلام</p>
                    <p className="text-2xl font-bold text-primary">#{order.pickup_code}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* Order Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-gray-400 text-base">payments</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {order.total_amount.toFixed(2)} ج.م
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-gray-400 text-base">shopping_bag</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {order.items.length} منتج
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-gray-400 text-base">schedule</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {formatDate(order.created_at)}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                {order.status === 'reserved' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order.id, 'confirmed');
                    }}
                    className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    ✅ تأكيد الطلب
                  </button>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order.id, 'ready');
                    }}
                    className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    📦 جاهز للاستلام
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order.id, 'completed');
                    }}
                    className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    ✅ تم التسليم
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">shopping_bag</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              لا توجد طلبات
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {statusFilter !== 'all' ? 'لا توجد طلبات بهذه الحالة' : 'لم تستلم أي طلبات بعد'}
            </p>
          </div>
        )}
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                تفاصيل الطلب
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Pickup Code */}
            <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">كود الاستلام</p>
              <p className="text-4xl font-bold text-primary">#{selectedOrder.pickup_code}</p>
            </div>

            {/* Status */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">الحالة</p>
              {getStatusBadge(selectedOrder.status)}
            </div>

            {/* Products */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">المنتجات</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    {item.product_image && (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        الكمية: {item.quantity} × {item.price.toFixed(2)} ج.م
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">الإجمالي</span>
                <span className="text-primary">{selectedOrder.total_amount.toFixed(2)} ج.م</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {selectedOrder.status === 'reserved' && (
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'confirmed');
                    setSelectedOrder(null);
                  }}
                  className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                >
                  ✅ تأكيد الطلب
                </button>
              )}
              {selectedOrder.status === 'confirmed' && (
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'ready');
                    setSelectedOrder(null);
                  }}
                  className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium"
                >
                  📦 جاهز للاستلام
                </button>
              )}
              {selectedOrder.status === 'ready' && (
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'completed');
                    setSelectedOrder(null);
                  }}
                  className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                >
                  ✅ تم التسليم
                </button>
              )}
              {(selectedOrder.status === 'reserved' || selectedOrder.status === 'confirmed') && (
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'cancelled');
                    setSelectedOrder(null);
                  }}
                  className="w-full px-4 py-3 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 text-red-700 dark:text-red-400 rounded-lg transition-colors font-medium"
                >
                  ❌ إلغاء الطلب
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
