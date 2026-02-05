'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import type { Product } from '@/lib/types';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');

  const supabase = useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ),
    []
  );

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            stores:store_id (
              id,
              name,
              logo_url,
              address
            )
          `)
          .eq('id', productId)
          .single();

        if (error) throw error;
        if (data) {
          setProduct(data);

          // Fetch related products from the same store
          const { data: relatedData } = await supabase
            .from('products')
            .select('*')
            .eq('store_id', data.store_id)
            .eq('is_active', true)
            .neq('id', productId)
            .limit(6);

          if (relatedData) {
            setRelatedProducts(relatedData);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, supabase]);

  const nextImage = () => {
    if (product?.image_urls && product.image_urls.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.image_urls.length);
    }
  };

  const currentImage = product?.image_urls && product.image_urls.length > 0
    ? product.image_urls[currentImageIndex]
    : 'https://via.placeholder.com/400x600';

  const imageCount = product?.image_urls?.length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#000000]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#000000]">
        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">inventory_2</span>
        <p className="text-slate-600 dark:text-slate-400">Product not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white dark:bg-[#000000] shadow-2xl overflow-hidden">
      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-[#000000]/90 backdrop-blur-md border-b border-transparent dark:border-slate-800/50">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-800 dark:text-white">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-800 dark:text-white">share</span>
          </button>
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-800 dark:text-white">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-32 hide-scrollbar">
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        {/* Image Gallery Carousel */}
        <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800" onClick={nextImage}>
          <img
            key={currentImageIndex}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-300"
            src={currentImage}
          />
          {/* Image Counter Badge */}
          {product.image_urls && product.image_urls.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {currentImageIndex + 1}/{product.image_urls.length}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-5 pt-6 pb-4">
          {/* Store Name */}
          {product.stores && (
            <Link
              href={`/stores/${product.stores.id}`}
              className="flex items-center gap-1 mb-2 group"
            >
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                {product.stores.name}
              </span>
              <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </Link>
          )}

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white mb-3">
            {product.name}
          </h1>

          {/* Price Block */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.category && (
              <span className="px-2.5 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold rounded-full mb-1">
                {product.category}
              </span>
            )}
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6"></div>

          {/* Selection Area */}
          <div className="space-y-6">
            {/* Stock Info */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-slate-500">inventory</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {product.stock_quantity > 0 ? (
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {product.stock_quantity} in stock
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 font-medium">Out of stock</span>
                )}
              </span>
            </div>

            {/* Gender Filter */}
            {product.gender_filter && (
              <div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-3 block">
                  Gender: <span className="text-slate-500 font-normal capitalize">{product.gender_filter}</span>
                </span>
              </div>
            )}

            {/* Quantity */}
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-3 block">Quantity</span>
              <div className="inline-flex items-center h-11 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-full flex items-center justify-center rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-600 dark:text-white hover:bg-slate-50 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <span className="w-10 text-center text-sm font-semibold text-slate-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  disabled={quantity >= product.stock_quantity}
                  className="w-9 h-full flex items-center justify-center rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-600 dark:text-white hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
            </div>

            {/* Actions (Add to Cart) */}
            <div className="flex gap-3 pt-2">
              <button className="flex-shrink-0 w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95 group">
                <span className="material-symbols-outlined text-2xl group-hover:text-red-500 transition-colors">favorite</span>
              </button>
              <button
                disabled={product.stock_quantity === 0}
                className="flex-1 h-14 bg-primary rounded-xl flex items-center justify-center gap-2 text-white font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-6"></div>

          {/* Accordions */}
          <div className="space-y-4">
            {product.description && (
              <>
                <details className="group [&_summary::-webkit-details-marker]:hidden" open>
                  <summary className="flex cursor-pointer items-center justify-between text-slate-900 dark:text-white">
                    <h2 className="text-base font-semibold">Description</h2>
                    <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
                  </summary>
                  <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    <p>{product.description}</p>
                  </div>
                </details>
                <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>
              </>
            )}

            {product.stores?.address && (
              <>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between text-slate-900 dark:text-white">
                    <h2 className="text-base font-semibold">Store Location</h2>
                    <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
                  </summary>
                  <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    <p>{product.stores.address}</p>
                  </div>
                </details>
                <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>
              </>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-background-light dark:bg-[#0a0a0a] py-8 px-5 mt-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">More from this store</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 hide-scrollbar snap-x snap-mandatory">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="min-w-[160px] snap-start cursor-pointer"
                  onClick={() => router.push(`/products/${relatedProduct.id}`)}
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-white dark:bg-slate-800">
                    <img
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                      src={relatedProduct.image_urls?.[0] || 'https://via.placeholder.com/300x400'}
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{relatedProduct.name}</h4>
                  <p className="text-sm font-semibold text-slate-500">${relatedProduct.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
