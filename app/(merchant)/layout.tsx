'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { MerchantNavigation } from '@/components/Navigation';
import { LoadingScreen } from '@/components/LoadingSpinner';

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isMerchant, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Allow setup and pending pages without strict merchant check
  const isSetupOrPending = pathname === '/merchant/setup' || pathname === '/merchant/pending';

  useEffect(() => {
    if (loading) return;

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      router.push('/login?redirect=/merchant/dashboard');
      return;
    }

    // For setup and pending pages, just check if authenticated
    if (isSetupOrPending) {
      return; // Allow access
    }

    // For other merchant pages, check if merchant
    if (!isMerchant) {
      console.log('Not a merchant, redirecting to home. User role:', user?.role);
      router.push('/');
    }
  }, [isAuthenticated, isMerchant, loading, router, isSetupOrPending, user]);

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <LoadingScreen message="Redirecting..." />;
  }

  // For setup and pending, just render content (no nav)
  if (isSetupOrPending) {
    return <>{children}</>;
  }

  // For other merchant pages, check if merchant
  if (!isMerchant) {
    return <LoadingScreen message="Redirecting..." />;
  }

  return (
    <>
      {children}
      <MerchantNavigation />
    </>
  );
}

