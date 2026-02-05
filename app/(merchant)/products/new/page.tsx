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

const GENDER_FILTERS = ['رجالي', 'حريمي', 'يونيسكس', 'أطفال'];

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [storeId, setStoreId] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        gender_filter: '',
        stock_quantity: '',
        images: [] as File[],
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        checkStore();
    }, []);

    const checkStore = async () => {
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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        // Validate max 5 images
        if (formData.images.length + files.length > 5) {
            setToast({ message: 'يمكنك رفع 5 صور كحد أقصى', type: 'error' });
            return;
        }

        // Validate file sizes
        const invalidFiles = files.filter(f => f.size > 2 * 1024 * 1024);
        if (invalidFiles.length > 0) {
            setToast({ message: 'حجم الصورة يجب أن يكون أقل من 2 ميجابايت', type: 'error' });
            return;
        }

        setFormData({
            ...formData,
            images: [...formData.images, ...files],
        });

        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index),
        });
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeId) {
            setToast({ message: 'حدث خطأ، برجاء المحاولة مرة أخرى', type: 'error' });
            return;
        }

        if (formData.images.length === 0) {
            setToast({ message: 'برجاء رفع صورة واحدة على الأقل', type: 'error' });
            return;
        }

        setLoading(true);

        try {
            // Upload images
            const imageUrls: string[] = [];

            for (const image of formData.images) {
                const fileName = `${storeId}-${Date.now()}-${Math.random().toString(36).substring(7)}.${image.name.split('.').pop()}`;
                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(fileName, image);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(fileName);

                imageUrls.push(publicUrl);
            }

            // Create product
            const { error: productError } = await supabase
                .from('products')
                .insert({
                    store_id: storeId,
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    gender_filter: formData.gender_filter,
                    stock_quantity: parseInt(formData.stock_quantity),
                    image_urls: imageUrls,
                    is_active: true,
                });

            if (productError) throw productError;

            setToast({ message: '✅ تم إضافة المنتج بنجاح!', type: 'success' });

            setTimeout(() => {
                router.push('/merchant/products');
            }, 1500);
        } catch (err: any) {
            console.error('Error creating product:', err);
            setToast({ message: err.message || 'حدث خطأ أثناء إضافة المنتج', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <MerchantNav />

            <main className="lg:mr-64 p-4 lg:p-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            رجوع
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            ➕ إضافة منتج جديد
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            أضف منتج جديد لمتجرك
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
                        {/* Product Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                صور المنتج * (حد أقصى 5 صور)
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ))}

                                {formData.images.length < 5 && (
                                    <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                                        <span className="material-symbols-outlined text-3xl text-gray-400">add_photo_alternate</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">رفع صورة</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                اسم المنتج *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="تيشرت قطن رجالي"
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
                                placeholder="وصف تفصيلي للمنتج..."
                            />
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    السعر (ج.م) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="299.99"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    الكمية المتاحة *
                                </label>
                                <input
                                    type="number"
                                    name="stock_quantity"
                                    value={formData.stock_quantity}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="50"
                                />
                            </div>
                        </div>

                        {/* Category & Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    النوع
                                </label>
                                <select
                                    name="gender_filter"
                                    value={formData.gender_filter}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">اختر النوع</option>
                                    {GENDER_FILTERS.map((gender) => (
                                        <option key={gender} value={gender}>
                                            {gender}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-lg transition-colors"
                            >
                                إلغاء
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'جاري الحفظ...' : '✅ حفظ المنتج'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
