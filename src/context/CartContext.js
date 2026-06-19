import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth } from "./AuthContext";

import {
  loadCart,
  saveCart,
  clearUserCart,
} from "../firebase/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  // const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("guestCart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  }, [cart, user?.uid]);

  /**
   * Load cart whenever the authenticated user changes.
   */
  useEffect(() => {
    async function fetchCart() {
      if (!user?.uid) {
        // User is logged out → clear the in-memory cart
        setCart([]);
        setLoadingCart(false);
        return;
      }
      // if (!user?.uid) {
      //   const guestCart = JSON.parse(
      //     localStorage.getItem("guestCart") || "[]"
      //   );

      //   setCart(guestCart);
      //   setLoadingCart(false);
      //   return;
      // }

      setLoadingCart(true);

      try {
        const guestCart = JSON.parse(
          localStorage.getItem("guestCart") || "[]"
        );

        const firebaseCart = await loadCart(user.uid);

        if (guestCart.length > 0 && firebaseCart.length === 0) {
          await saveCart(user.uid, guestCart);
          setCart(guestCart);

          // Clear the temporary guest cart after merging
          localStorage.removeItem("guestCart");
        } else {
          // Always use the user's own Firebase cart
          setCart(firebaseCart || []);

          // Prevent another user from inheriting a stale guest cart
          localStorage.removeItem("guestCart");
        }
        // if (guestCart.length > 0 && firebaseCart.length === 0) {
        //   await saveCart(user.uid, guestCart);
        //   setCart(guestCart);
        //   localStorage.removeItem("guestCart");
        // } else {
        //   setCart(firebaseCart || []);
        // }
      } catch (error) {
        console.error("Failed to load cart:", error);
        setCart([]);
      } finally {
        setLoadingCart(false);
      }
    }

    fetchCart();
  }, [user?.uid]);

  /**
   * Persist cart to Firestore.
   */
  const syncCart = async (newCart) => {
    setCart(newCart);

    if (user?.uid) {
      try {
        await saveCart(user.uid, newCart);
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    }
  };

  const addToCart = async (product) => {
    const exists = cart.find(
      (item) => item.id === product.id
    );

    let newCart;

    if (exists) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      newCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    await syncCart(newCart);
  };

  const decreaseQty = async (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    await syncCart(newCart);
  };

  const removeFromCart = async (id) => {
    const newCart = cart.filter(
      (item) => item.id !== id
    );

    await syncCart(newCart);
  };

  const resetCart = () => {
    setCart([]);
    setLoadingCart(false);
  };

  const clearCart = async () => {
    setCart([]);

    if (user?.uid) {
      try {
        await clearUserCart(user.uid);
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loadingCart,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

