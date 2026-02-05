'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import MerchantNav from '@/components/merchant/MerchantNav';
import Toast from '@/components/Toast';
import { Coupon } from '@/lib/types';

export default function CouponsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [storeId, setStoreId] = useState<string | null>(null);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const [formData, setFormData] = useState({
        code: '',
        discount_type: 'percentage' as 'percentage' | 'fixed',
        discount_value: '',
        min_purchase: '',
        max_uses: '',
        expires_at: '',
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        checkStoreAndFetchCoupons();
    }, []);

    const checkStoreAndFetchCoupons = async () => {
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
            await fetchCoupons(store.id);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCoupons = async (storeId: string) => {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('store_id', storeId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching coupons:', error);
            return;
        }

        setCoupons(data || []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeId) return;

        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('coupons')
                .insert({
                    store_id: storeId,
                    code: formData.code.toUpperCase(),
                    discount_type: formData.discount_type,
                    discount_value: parseFloat(formData.discount_value),
                    min_purchase: formData.min_purchase ? parseFloat(formData.min_purchase) : null,
                    max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
                    expires_at: formData.expires_at || null,
                    is_active: true,
                    uses_count: 0,
                });

            if (error) throw error;

            setToast({ message: '✅ تم إنشاء الكوبون بنجاح', type: 'success' });
            setShowCreateModal(false);
            setFormData({
                code: '',
                discount_type: 'percentage',
                discount_value: '',
                min_purchase: '',
                max_uses: '',
                expires_at: '',
            });

            // Refresh coupons
            if (storeId) await fetchCoupons(storeId);
        } catch (err: any) {
            console.error('Error creating coupon:', err);
            setToast({ message: err.message || 'حدث خطأ أثناء إنشاء الكوبون', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const toggleCouponStatus = async (couponId: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('coupons')
            .update({ is_active: !currentStatus })
            .eq('id', couponId);

        if (error) {
            setToast({ message: 'حدث خطأ أثناء تحديث حالة الكوبون', type: 'error' });
            return;
        }

        setToast({ message: 'تم تحديث حالة الكوبون بنجاح', type: 'success' });
        setCoupons(coupons.map(c =>
            c.id === couponId ? { ...c, is_active: !currentStatus } : c
        ));
    };

    const deleteCoupon = async (couponId: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا الكوبون؟')) {
            return;
        }

        const { error } = await supabase
            .from('coupons')
            .delete()
            .eq('id', couponId);

        if (error) {
            setToast({ message: 'حدث خطأ أثناء حذف الكوبون', type: 'error' });
            return;
        }

        setToast({ message: 'تم حذف الكوبون بنجاح', type: 'success' });
        setCoupons(coupons.filter(c => c.id !== couponId));
    };

    const isExpired = (expiresAt: string | null) => {
        if (!expiresAt) return false;
        return new Date(expiresAt) < new Date();
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
                            🎟️ الكوبونات
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            إدارة كوبونات الخصم ({coupons.length} كوبون)
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">add</span>
                        إنشاء كوبون
                    </button>
                </div>

                {/* Coupons List */}
                {coupons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {coupons.map((coupon) => (
                            <div
                                key={coupon.id}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                                {/* Coupon Code */}
                                <div className="bg-gradient-to-r from-primary to-green-600 rounded-lg p-4 mb-4 text-center">
                                    <p className="text-white/80 text-sm mb-1">كود الخصم</p>
                                    <p className="text-2xl font-bold text-white">{coupon.code}</p>
                                </div>

                                {/* Discount Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">الخصم</span>
                                        <span className="font-bold text-primary">
                                            {coupon.discount_type === 'percentage'
                                                ? `${coupon.discount_value}%`
                                                : `${coupon.discount_value} ج.م`}
                                        </span>
                                    </div>
                                    {coupon.min_purchase && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">الحد الأدنى</span>
                                            <span className="text-sm text-gray-900 dark:text-white">
                                                {coupon.min_purchase} ج.م
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">الاستخدامات</span>
                                        <span className="text-sm text-gray-900 dark:text-white">
                                            {coupon.uses_count} / {coupon.max_uses || '∞'}
                                        </span>
                                    </div>
                                    {coupon.expires_at && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">ينتهي في</span>
                                            <span className={`text-sm ${isExpired(coupon.expires_at)
                                                    ? 'text-red-500'
                                                    : 'text-gray-900 dark:text-white'
                                                }`}>
                                                {new Date(coupon.expires_at).toLocaleDateString('ar-EG')}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Status Badge */}
                                <div className="mb-4">
                                    {isExpired(coupon.expires_at) ? (
                                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                                            منتهي
                                        </span>
                                    ) : coupon.is_active ? (
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                                            نشط
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 text-xs font-medium rounded-full">
                                            غير نشط
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleCouponStatus(coupon.id, coupon.is_active)}
                                        disabled={isExpired(coupon.expires_at)}
                                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isExpired(coupon.expires_at)
                                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                                : coupon.is_active
                                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200'
                                                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
                                            }`}
                                    >
                                        {coupon.is_active ? 'إيقاف' : 'تفعيل'}
                                    </button>
                                    <button
                                        onClick={() => deleteCoupon(coupon.id)}
                                        className="flex items-center justify-center px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-base">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-400">local_offer</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            لا توجد كوبونات
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            أنشئ كوبون خصم لجذب المزيد من العملاء
                        </p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined">add</span>
                            إنشاء كوبون
                        </button>
                    </div>
                )}
            </main>

            {/* Create Coupon Modal */}
            {showCreateModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowCreateModal(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                إنشاء كوبون جديد
                            </h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    كود الكوبون *
                                </label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    required
                                    placeholder="SUMMER2024"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent uppercase"
                                />
                            </div>

                            {/* Discount Type & Value */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        نوع الخصم *
                                    </label>
                                    <select
                                        value={formData.discount_type}
                                        onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as 'percentage' | 'fixed' })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="percentage">نسبة مئوية</option>
                                        <option value="fixed">مبلغ ثابت</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        قيمة الخصم *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.discount_value}
                                        onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                                        required
                                        min="0"
                                        step="0.01"
                                        placeholder={formData.discount_type === 'percentage' ? '10' : '50'}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Min Purchase & Max Uses */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        الحد الأدنى للشراء (ج.م)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.min_purchase}
                                        onChange={(e) => setFormData({ ...formData, min_purchase: e.target.value })}
                                        min="0"
                                        step="0.01"
                                        placeholder="100"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        عدد الاستخدامات
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.max_uses}
                                        onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                                        min="1"
                                        placeholder="غير محدود"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    تاريخ الانتهاء
                                </label>
                                <input
                                    type="date"
                                    value={formData.expires_at}
                                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'جاري الإنشاء...' : '✅ إنشاء الكوبون'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
