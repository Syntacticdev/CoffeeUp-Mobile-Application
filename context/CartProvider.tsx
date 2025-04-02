import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { cartItem } from '@/types/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface CartContextType {
    addToCart: (cartItem: cartItem) => void;
    removeFromCart: (i: number) => void;
    increaseItemQuantity: (i: number) => void;
    decreaseItemQuantity: (i: number) => void;
    clearCarts: () => void;
    cart: cartItem[];  // cart items with their quantities
    subTotal: number;
    totalCartItems: number;
}

const CartContext = createContext<CartContextType | null>(null)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<cartItem[]>([])
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        const updateCarts = async () => {
            const itemsFoundInCart = await AsyncStorage.getItem("carts")
            if (itemsFoundInCart) {
                const parsedCarts = JSON.parse(itemsFoundInCart)
                setCart(parsedCarts)
            }
        }
        updateCarts()
    }, [])

    useEffect(() => {
        const updateCarts = async () => {
            await AsyncStorage.setItem("carts", JSON.stringify(cart))
        }
        updateCarts()

    }, [cart])

    const addToCart = (data: cartItem) => {

        const itemIndex = cart.findIndex(cartItem => cartItem._id === data._id && cartItem.size === data.size);

        if (itemIndex !== -1) {
            const newCart = [...cart];
            newCart[itemIndex] = data;
            setCart(newCart);
        } else {
            setCart([...cart, data]);
        }
    }

    const removeFromCart = (i: number) => {
        const newCart = [...cart]
        newCart.splice(i, 1)
        setCart(newCart);
    }

    const increaseItemQuantity = (i: number) => {
        const newCart = [...cart];
        newCart[i].quantity++;
        setCart(newCart);
    }

    const decreaseItemQuantity = (i: number) => {
        const newCart = [...cart];
        if (newCart[i].quantity > 1) {
            newCart[i].quantity--;
            setCart(newCart);
        }
    }

    const clearCarts = async () => {
        setCart([]);
        setSubTotal(0);
        await AsyncStorage.removeItem("carts");
    }

    const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0)

    useEffect(() => {
        let subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
        setSubTotal(subtotal)
    }, [cart, subTotal, addToCart, removeFromCart])

    const value: CartContextType = {
        addToCart,
        removeFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        cart,
        subTotal,
        totalCartItems,
        clearCarts
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartProvider


