'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function CallbackHandler() {
    const router = useRouter();

    const supabase = useMemo(
        () =>
            createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            ),
        []
    );

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get current user
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (userError || !user) {
                    console.error('No authenticated user found:', userError);
                    router.push('/login');
                    return;
                }

                // Get pending role from session storage
                const pendingRole = typeof window !== 'undefined'
                    ? sessionStorage.getItem('pending_role') as 'customer' | 'merchant' | null
                    : null;

                if (pendingRole) {
                    // Check if user exists first
                    const { data: existingUser } = await supabase
                        .from('users')
                        .select('id')
                        .eq('id', user.id)
                        .maybeSingle();

                    if (existingUser) {
                        // Update existing user
                        const { error: updateError } = await supabase
                            .from('users')
                            .update({
                                role: pendingRole,
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', user.id);

                        if (updateError) {
                            console.error('Error updating user role:', updateError.message || updateError);
                        }
                    } else {
                        // Insert new user
                        const { error: insertError } = await supabase
                            .from('users')
                            .insert({
                                id: user.id,
                                email: user.email,
                                full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
                                avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
                                role: pendingRole,
                            });

                        if (insertError) {
                            console.error('Error creating user:', insertError.message || insertError);
                        }
                    }

                    // Clear pending role
                    if (typeof window !== 'undefined') {
                        sessionStorage.removeItem('pending_role');
                    }

                    // Redirect based on role
                    if (pendingRole === 'merchant') {
                        router.push('/merchant/dashboard');
                    } else {
                        router.push('/');
                    }
                } else {
                    // No pending role, get from database or default to customer
                    const { data: userData } = await supabase
                        .from('users')
                        .select('role')
                        .eq('id', user.id)
                        .maybeSingle();

                    const role = userData?.role || 'customer';

                    if (role === 'merchant') {
                        router.push('/merchant/dashboard');
                    } else {
                        router.push('/');
                    }
                }
            } catch (error) {
                console.error('Callback error:', error);
                router.push('/login');
            }
        };

        handleCallback();
    }, [router, supabase]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-[#000000]">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Signing you in...</p>
            </div>
        </div>
    );
}
