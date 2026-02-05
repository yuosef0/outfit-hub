'use client';

import { useCartUI } from '@/context/CartUIContext';
import CartDrawer from './CartDrawer';

export default function CartManager() {
    const { isCartOpen, closeCart } = useCartUI();

    return <CartDrawer isOpen={isCartOpen} onClose={closeCart} />;
}
