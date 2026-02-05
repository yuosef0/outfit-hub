'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
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

const AREAS = [
    'مدينة المنيا',
    'المنيا الجديدة',
    'أبو قرقاص',
    'مغاغة',
    'بني مزار',
    'ملوي',
    'سمالوط',
    'العدوة',
    'دير مواس',
];

export default function MerchantSetupPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        description: '',
        category: '',
        // Step 2
        address: '',
        area: '',
        maps_link: '',
        phone: '',
        // Step 3
        logo: null as File | null,
        banner: null as File | null,
    });

    const [previews, setPreviews] = useState({
        logo: '',
        banner: '',
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/merchant/signup');
            return;
        }
        setUserId(user.id);

        // Check if user already has a store
        const { data: existingStore } = await supabase
            .from('stores')
            .select('id')
            .eq('merchant_id', user.id)
            .single();

        if (existingStore) {
            router.push('/merchant/dashboard');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 2MB)
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
                setPreviews({
                    ...previews,
                    [type]: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        // Validate current step
        if (currentStep === 1) {
            if (!formData.name || !formData.category) {
                setToast({ message: 'برجاء ملء جميع الحقول المطلوبة', type: 'error' });
                return;
            }
        } else if (currentStep === 2) {
            if (!formData.address || !formData.area || !formData.phone) {
                setToast({ message: 'برجاء ملء جميع الحقول المطلوبة', type: 'error' });
                return;
            }
        }

        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        if (!formData.logo) {
            setToast({ message: 'برجاء رفع لوجو المتجر', type: 'error' });
            return;
        }

        if (!userId) {
            setToast({ message: 'حدث خطأ، برجاء تسجيل الدخول مرة أخرى', type: 'error' });
            return;
        }

        setLoading(true);

        try {
            // Upload logo
            const logoFileName = `${userId}-logo-${Date.now()}.${formData.logo.name.split('.').pop()}`;
            const { data: logoData, error: logoError } = await supabase.storage
                .from('stores')
                .upload(logoFileName, formData.logo);

            if (logoError) throw logoError;

            const { data: { publicUrl: logoUrl } } = supabase.storage
                .from('stores')
                .getPublicUrl(logoFileName);

            // Upload banner if exists
            let bannerUrl = null;
            if (formData.banner) {
                const bannerFileName = `${userId}-banner-${Date.now()}.${formData.banner.name.split('.').pop()}`;
                const { data: bannerData, error: bannerError } = await supabase.storage
                    .from('stores')
                    .upload(bannerFileName, formData.banner);

                if (bannerError) throw bannerError;

                const { data: { publicUrl } } = supabase.storage
                    .from('stores')
                    .getPublicUrl(bannerFileName);
                bannerUrl = publicUrl;
            }

            // Create store
            const { data: storeData, error: storeError } = await supabase
                .from('stores')
                .insert({
                    merchant_id: userId,
                    name: formData.name,
                    description: formData.description,
                    category: formData.category,
                    address: formData.address,
                    phone: formData.phone,
                    maps_link: formData.maps_link || null,
                    logo_url: logoUrl,
                    banner_url: bannerUrl,
                    is_active: false, // Pending admin approval
                    subscription_plan: 'free',
                    points_balance: 0,
                })
                .select()
                .single();

            if (storeError) throw storeError;

            setToast({ message: 'تم إرسال طلبك بنجاح! سيتم مراجعته خلال 24 ساعة', type: 'success' });

            // Redirect to pending page after 2 seconds
            setTimeout(() => {
                router.push('/merchant/pending');
            }, 2000);
        } catch (err: any) {
            console.error('Error creating store:', err);
            setToast({ message: err.message || 'حدث خطأ أثناء إنشاء المتجر', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-4">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🏪 إعداد متجرك
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        خطوة {currentStep} من 3
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                            معلومات المتجر
                        </span>
                        <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                            الموقع والتواصل
                        </span>
                        <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                            الهوية البصرية
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    {/* Step 1: Store Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                معلومات المتجر
                            </h2>

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
                                    placeholder="ستايل هب"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    وصف المتجر
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="أحدث صيحات الموضة الرجالي والحريمي بأسعار مناسبة..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    الفئة الرئيسية *
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

                            <button
                                onClick={nextStep}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                التالي ←
                            </button>
                        </div>
                    )}

                    {/* Step 2: Location */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                الموقع والتواصل
                            </h2>

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
                                    placeholder="شارع طه حسين، مدينة المنيا"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    المنطقة *
                                </label>
                                <select
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">اختر المنطقة</option>
                                    {AREAS.map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    رابط Google Maps (اختياري)
                                </label>
                                <input
                                    type="url"
                                    name="maps_link"
                                    value={formData.maps_link}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="https://maps.google.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    رقم WhatsApp *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="01012345678"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition-colors"
                                >
                                    ← السابق
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors"
                                >
                                    التالي →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Branding */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                الهوية البصرية
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    لوجو المتجر *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                    {previews.logo ? (
                                        <div className="space-y-4">
                                            <img
                                                src={previews.logo}
                                                alt="Logo preview"
                                                className="w-32 h-32 object-cover rounded-lg mx-auto"
                                            />
                                            <button
                                                onClick={() => {
                                                    setFormData({ ...formData, logo: null });
                                                    setPreviews({ ...previews, logo: '' });
                                                }}
                                                className="text-red-500 hover:text-red-600 text-sm"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer">
                                            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                                                add_photo_alternate
                                            </span>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                اسحب الصورة هنا أو اضغط للرفع
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                PNG/JPG, حد أقصى 2MB
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'logo')}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    صورة الغلاف (اختياري)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                    {previews.banner ? (
                                        <div className="space-y-4">
                                            <img
                                                src={previews.banner}
                                                alt="Banner preview"
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                onClick={() => {
                                                    setFormData({ ...formData, banner: null });
                                                    setPreviews({ ...previews, banner: '' });
                                                }}
                                                className="text-red-500 hover:text-red-600 text-sm"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer">
                                            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                                                add_photo_alternate
                                            </span>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                اسحب الصورة هنا أو اضغط للرفع
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'banner')}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    سيتم مراجعة متجرك وتفعيله خلال 24 ساعة. سنتواصل معك على WhatsApp.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition-colors"
                                >
                                    ← السابق
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'جاري الإرسال...' : '✅ أرسل للمراجعة'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
