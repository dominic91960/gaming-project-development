"use client"; // This ensures the component is treated as a Client Component

import axiosInstance from "@/axios/axiosInstance";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

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

type Discount = {
  code: string;
  discount: number;
  id: string;
  type: string;
};

// Define the context properties interface
interface CartContextProps {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  setDiscount: (discount: Discount) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  totalDiscount: number;
  viewCart: () => CartItem[];
  createOrder: (discountCode?: string) => Promise<void>;
  proceedCheckout: (discountCode?: string) => Promise<void>;
  discountData: Discount; // Expose discount data for other components
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
  const router = useRouter();


  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [discountData, setDiscountData] = useState<Discount>(() => {
    if (typeof window !== "undefined") {
      const storedDiscount = localStorage.getItem("discountData");
      return storedDiscount ? JSON.parse(storedDiscount) : { code: "", discount: 0, id: "", type: "" };
    }
    return { code: "", discount: 0, id: "", type: "" };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("discountData", JSON.stringify(discountData));
  }, [discountData]);

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

  const totalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const totalPrice = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return Math.max(subtotal, 0);
  };

  const setDiscount = (discount: Discount) => {
    setDiscountData(discount);
    localStorage.setItem("discountData", JSON.stringify(discount));
  };

  const calculateDiscount = (total: number) => {
    let discount = 0;
    if (discountData.type === "FIXED") {
      discount = discountData.discount;
    } else if (discountData.type === "PERCENTAGE") {
      discount = (total * discountData.discount) / 100;
    }
    return Math.max(discount, 0);
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const viewCart = () => {
    return cart;
  };

  const createOrder = async (discountCode?: string) => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (!user || !user.id) {
      console.error("User ID not found");
      return;
    }

    const products = cart.map((item) => ({
      gameId: item.id,
      quantity: item.quantity,
    }));

    const coupons = discountCode ? [discountCode] : [];

    try {
      const response = await axiosInstance.post(`orders/${user.id}`, {
        userId: user.id,
        products: products,
        coupons: coupons,
      });

      // Clear the cart and discount data after a successful order
      clearCart();
      setDiscount({ code: "", discount: 0, id: "", type: "" }); // Reset discount
      localStorage.removeItem("discountData"); // Clear discount data from localStorage

      console.log("Order created successfully:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const proceedCheckout = async () => {
    router.push("/payment");
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        setDiscount,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems: totalItems(),
        totalPrice: totalPrice(),
        totalDiscount: calculateDiscount(totalPrice()),
        viewCart,
        createOrder,
        discountData, // Expose discount data
        proceedCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
