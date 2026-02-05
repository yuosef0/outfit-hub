'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import MerchantNav from '@/components/merchant/MerchantNav';
import Toast from '@/components/Toast';
import { StoreReview } from '@/lib/types';

export default function ReviewsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [storeId, setStoreId] = useState<string | null>(null);
    const [reviews, setReviews] = useState<StoreReview[]>([]);
    const [selectedReview, setSelectedReview] = useState<StoreReview | null>(null);
    const [replyText, setReplyText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        checkStoreAndFetchReviews();
    }, []);

    const checkStoreAndFetchReviews = async () => {
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
            await fetchReviews(store.id);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async (storeId: string) => {
        const { data, error } = await supabase
            .from('store_reviews')
            .select('*')
            .eq('store_id', storeId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching reviews:', error);
            return;
        }

        setReviews(data || []);
    };

    const handleReply = async () => {
        if (!selectedReview || !replyText.trim()) {
            setToast({ message: 'برجاء كتابة رد', type: 'error' });
            return;
        }

        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('store_reviews')
                .update({
                    merchant_reply: replyText.trim(),
                    replied_at: new Date().toISOString(),
                })
                .eq('id', selectedReview.id);

            if (error) throw error;

            setToast({ message: '✅ تم إرسال الرد بنجاح', type: 'success' });

            // Update local state
            setReviews(reviews.map(r =>
                r.id === selectedReview.id
                    ? { ...r, merchant_reply: replyText.trim(), replied_at: new Date().toISOString() }
                    : r
            ));

            setSelectedReview(null);
            setReplyText('');
        } catch (err: any) {
            console.error('Error replying to review:', err);
            setToast({ message: 'حدث خطأ أثناء إرسال الرد', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const getRatingStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`material-symbols-outlined text-xl ${i < rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                    }`}
            >
                star
            </span>
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

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
                        ⭐ التقييمات
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        تقييمات العملاء لمتجرك ({reviews.length} تقييم)
                    </p>
                </div>

                {/* Rating Summary */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white mb-8">
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-6xl font-bold">{avgRating}</p>
                            <div className="flex gap-1 mt-2">
                                {getRatingStars(Math.round(parseFloat(avgRating)))}
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-white/90 text-lg mb-2">متوسط التقييم</p>
                            <p className="text-white/80">بناءً على {reviews.length} تقييم</p>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                                {/* Review Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex gap-1 mb-2">
                                            {getRatingStars(review.rating)}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {formatDate(review.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* Review Content */}
                                {review.comment && (
                                    <p className="text-gray-900 dark:text-white mb-4">
                                        {review.comment}
                                    </p>
                                )}

                                {/* Merchant Reply */}
                                {review.merchant_reply ? (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-r-4 border-blue-500">
                                        <p className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">
                                            رد التاجر
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {review.merchant_reply}
                                        </p>
                                        {review.replied_at && (
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                                {formatDate(review.replied_at)}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setSelectedReview(review);
                                            setReplyText('');
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-base">reply</span>
                                        الرد على التقييم
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-400">star</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            لا توجد تقييمات بعد
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            سيظهر هنا تقييمات العملاء لمتجرك
                        </p>
                    </div>
                )}
            </main>

            {/* Reply Modal */}
            {selectedReview && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedReview(null)}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                الرد على التقييم
                            </h2>
                            <button
                                onClick={() => setSelectedReview(null)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Original Review */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                            <div className="flex gap-1 mb-2">
                                {getRatingStars(selectedReview.rating)}
                            </div>
                            {selectedReview.comment && (
                                <p className="text-gray-900 dark:text-white">
                                    {selectedReview.comment}
                                </p>
                            )}
                        </div>

                        {/* Reply Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                ردك
                            </label>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={4}
                                placeholder="اكتب ردك هنا..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedReview(null)}
                                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={handleReply}
                                disabled={submitting || !replyText.trim()}
                                className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'جاري الإرسال...' : '✅ إرسال الرد'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
