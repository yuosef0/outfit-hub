'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { MerchantNavigation } from '@/components/Navigation';
import { LoadingScreen } from '@/components/LoadingSpinner';

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isMerchant, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/merchant/dashboard');
    } else if (!loading && !isMerchant) {
      router.push('/');
    }
  }, [isAuthenticated, isMerchant, loading, router]);

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  if (!isAuthenticated || !isMerchant) {
    return null;
  }

  return (
    <>
      {children}
      <MerchantNavigation />
    </>
  );
}
