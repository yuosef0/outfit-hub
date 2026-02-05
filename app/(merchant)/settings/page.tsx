'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import MerchantNav from '@/components/merchant/MerchantNav';
import Toast from '@/components/Toast';

const CATEGORIES = [
    'ملابس رجالي',
    'ملابس حريمي',
    'ملابس رجالي وحريمي',
    'ملابس أطفال',
    'أحذية',
    'شنط وحقائب',
    'إكسسوارات',
    'أخرى',
];

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [storeId, setStoreId] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        address: '',
        phone: '',
        maps_link: '',
        logo: null as File | null,
        banner: null as File | null,
    });

    const [currentImages, setCurrentImages] = useState({
        logo_url: '',
        banner_url: '',
    });

    const [imagePreviews, setImagePreviews] = useState({
        logo: '',
        banner: '',
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        checkStoreAndFetchSettings();
    }, []);

    const checkStoreAndFetchSettings = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/merchant/login');
                return;
            }

            const { data: store } = await supabase
                .from('stores')
                .select('*')
                .eq('merchant_id', user.id)
                .single();

            if (!store) {
                router.push('/merchant/setup');
                return;
            }

            setStoreId(store.id);
            setFormData({
                name: store.name || '',
                description: store.description || '',
                category: store.category || '',
                address: store.address || '',
                phone: store.phone || '',
                maps_link: store.maps_link || '',
                logo: null,
                banner: null,
            });

            setCurrentImages({
                logo_url: store.logo_url || '',
                banner_url: store.banner_url || '',
            });

            setImagePreviews({
                logo: store.logo_url || '',
                banner: store.banner_url || '',
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size
        if (file.size > 2 * 1024 * 1024) {
            setToast({ message: 'حجم الصورة يجب أن يكون أقل من 2 ميجابايت', type: 'error' });
            return;
        }

        setFormData({
            ...formData,
            [type]: file,
        });

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviews({
                ...imagePreviews,
                [type]: reader.result as string,
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeId) return;

        setSubmitting(true);

        try {
            let logoUrl = currentImages.logo_url;
            let bannerUrl = currentImages.banner_url;

            // Upload new logo if changed
            if (formData.logo) {
                const logoFileName = `${storeId}-logo-${Date.now()}.${formData.logo.name.split('.').pop()}`;
                const { error: logoError } = await supabase.storage
                    .from('stores')
                    .upload(logoFileName, formData.logo);

                if (logoError) throw logoError;

                const { data: { publicUrl } } = supabase.storage
                    .from('stores')
                    .getPublicUrl(logoFileName);

                logoUrl = publicUrl;
            }

            // Upload new banner if changed
            if (formData.banner) {
                const bannerFileName = `${storeId}-banner-${Date.now()}.${formData.banner.name.split('.').pop()}`;
                const { error: bannerError } = await supabase.storage
                    .from('stores')
                    .upload(bannerFileName, formData.banner);

                if (bannerError) throw bannerError;

                const { data: { publicUrl } } = supabase.storage
                    .from('stores')
                    .getPublicUrl(bannerFileName);

                bannerUrl = publicUrl;
            }

            // Update store
            const { error: updateError } = await supabase
                .from('stores')
                .update({
                    name: formData.name,
                    description: formData.description,
                    category: formData.category,
                    address: formData.address,
                    phone: formData.phone,
                    maps_link: formData.maps_link || null,
                    logo_url: logoUrl,
                    banner_url: bannerUrl,
                })
                .eq('id', storeId);

            if (updateError) throw updateError;

            setToast({ message: '✅ تم حفظ الإعدادات بنجاح', type: 'success' });

            // Update current images
            setCurrentImages({
                logo_url: logoUrl,
                banner_url: bannerUrl,
            });

            // Reset file inputs
            setFormData({
                ...formData,
                logo: null,
                banner: null,
            });
        } catch (err: any) {
            console.error('Error updating settings:', err);
            setToast({ message: err.message || 'حدث خطأ أثناء حفظ الإعدادات', type: 'error' });
        } finally {
            setSubmitting(false);
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
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <MerchantNav />

            <main className="lg:mr-64 p-4 lg:p-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            ⚙️ إعدادات المتجر
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            تحديث معلومات متجرك
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Store Images */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                صور المتجر
                            </h2>

                            {/* Logo */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    الشعار (Logo)
                                </label>
                                <div className="flex items-center gap-4">
                                    {imagePreviews.logo && (
                                        <img
                                            src={imagePreviews.logo}
                                            alt="Logo"
                                            className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                                        />
                                    )}
                                    <label className="flex-1 cursor-pointer">
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-primary transition-colors text-center">
                                            <span className="material-symbols-outlined text-3xl text-gray-400">upload</span>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                اضغط لتغيير الشعار
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'logo')}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Banner */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    الغلاف (Banner)
                                </label>
                                <div className="space-y-4">
                                    {imagePreviews.banner && (
                                        <img
                                            src={imagePreviews.banner}
                                            alt="Banner"
                                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                                        />
                                    )}
                                    <label className="block cursor-pointer">
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-primary transition-colors text-center">
                                            <span className="material-symbols-outlined text-3xl text-gray-400">upload</span>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                اضغط لتغيير الغلاف
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'banner')}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Store Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                معلومات المتجر
                            </h2>

                            {/* Store Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    اسم المتجر *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    الوصف
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    الفئة *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">اختر الفئة</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                معلومات الاتصال
                            </h2>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    العنوان *
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    رقم الهاتف *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Maps Link */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    رابط الموقع (Google Maps)
                                </label>
                                <input
                                    type="url"
                                    name="maps_link"
                                    value={formData.maps_link}
                                    onChange={handleChange}
                                    placeholder="https://maps.google.com/..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => router.push('/merchant/dashboard')}
                                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-lg transition-colors"
                            >
                                إلغاء
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'جاري الحفظ...' : '✅ حفظ التغييرات'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
