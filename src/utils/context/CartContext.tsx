"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Product } from '@/components/ui/products/types/products';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
    totalItems: number;
    totalPrice: number;
}

const transformProductForCart = (product: Product): CartItem => {
    return {
        ...product,
        quantity: 1
    };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'coffee-shop-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart items from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }
    }, []);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        const newCartItems = [...cartItems];
        const existingItemIndex = newCartItems.findIndex(item => item.id === product.id);

        if (existingItemIndex === -1) {
            const cartItem: CartItem = transformProductForCart(product);
            newCartItems.push(cartItem);
            toast.success('Item berhasil ditambahkan ke keranjang!', {
                duration: 2000,
                position: 'top-center',
                icon: '🛍️',
            });
        } else {
            newCartItems[existingItemIndex].quantity += 1;
            toast.success('Jumlah item berhasil ditambah!', {
                duration: 2000,
                position: 'top-center',
                icon: '🛍️',
            });
        }

        setCartItems(newCartItems);
    };

    const removeFromCart = (productId: string) => {
        const newCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(newCartItems);
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        const newCartItems = cartItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity };
            }
            return item;
        });

        setCartItems(newCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart harus digunakan dalam CartProvider');
    }
    return context;
}