"use client"; // This ensures the component is treated as a Client Component

import axiosInstance from "@/axios/axiosInstance";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the CartItem type
type CartItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  quantity: number;
  price: number;
  productType: string;
};

// Define the context properties interface
interface CartContextProps {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  viewCart: () => CartItem[];
  createOrder: () => void;
}

// Create the CartContext with a default undefined value
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Custom hook to use the CartContext
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

// CartProvider component to wrap around your application or components
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load the cart from localStorage (or initialize as an empty array)
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Persist the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add an item to the cart
  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  // Function to remove an item from the cart by id
  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to view all cart items
  const viewCart = () => {
    return cart;
  };

  // Function to create Order
  const createOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (!user || !user.id) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await axiosInstance.post(`orders/${user?.id}`, {
        userId: user.id,
        products: cart.map((item) => ({
          gameId: item.id,
          quantity: item.quantity,
        })),
      });

      console.log("Order created successfully:", response.data);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        viewCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
