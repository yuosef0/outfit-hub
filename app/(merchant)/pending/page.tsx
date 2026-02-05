export default function MerchantPendingPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-5xl text-yellow-600 dark:text-yellow-400">
                        schedule
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    متجرك قيد المراجعة ⏳
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    شكراً لتسجيلك في Outfit Hub! سيتم مراجعة متجرك وتفعيله خلال 24 ساعة.
                </p>

                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-primary dark:text-primary font-medium">
                        📱 سنتواصل معك على WhatsApp فور تفعيل متجرك
                    </p>
                </div>

                <div className="space-y-3 text-right">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-1">
                            check_circle
                        </span>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">تم استلام طلبك</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                تم إرسال بياناتك بنجاح
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-gray-400 mt-1">
                            pending
                        </span>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">المراجعة</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                فريقنا يراجع بيانات متجرك
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-gray-400 mt-1">
                            notifications_active
                        </span>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">التفعيل</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                سنرسل لك رسالة عند التفعيل
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
