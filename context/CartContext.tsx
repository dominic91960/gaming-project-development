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

type BillingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  message: string;
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
  createOrder: (billingData: BillingData) => Promise<void>;
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
      return storedDiscount
        ? JSON.parse(storedDiscount)
        : { code: "", discount: 0, id: "", type: "" };
    }
    return { code: "", discount: 0, id: "", type: "" };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length == 0) {
      setDiscount({
        code: "",
        discount: 0,
        id: "",
        type: "",
      });
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("discountData", JSON.stringify(discountData));
  }, [discountData]);

  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      const updatedCart = existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        : [...prevCart, item];

      // Recalculate the discount based on the new cart total
      setDiscountData((prevDiscount) => ({
        ...prevDiscount,
        discount: calculateDiscount(totalPrice(updatedCart)), // Pass updated cart total
      }));

      return updatedCart;
    });
  };

  const totalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const totalPrice = (cartItems: CartItem[] = cart) => {
    const subtotal = cartItems.reduce(
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
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);

      // Check if the cart is now empty and reset discount if it is
      if (newCart.length === 0) {
        setDiscount({ code: "", discount: 0, id: "", type: "" }); // Reset discount
      }

      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setDiscount({ code: "", discount: 0, id: "", type: "" }); // Reset discount when clearing cart
  };

  const viewCart = () => {
    return cart;
  };

  const createOrder = async (billingData: BillingData) => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    const products = cart.map((item) => ({
      gameId: item.id,
      quantity: item.quantity,
    }));

    const couponCode = discountData ? discountData.code : null;

    try {
      const response = await axiosInstance.post(`/orders`, {
        userId: user?.id || null,
        products: products,
        coupon: couponCode,
        discount: calculateDiscount(totalPrice()) || 0,
        billingData: billingData,
      });

      // Assuming `orderId` is returned in the response data
      const orderId = response.data.id;

      // Clear the cart and discount data after a successful order
      clearCart();
      localStorage.removeItem("discountData");


      // Redirect to success page with the orderId
      router.push(`/success?orderId=${orderId}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const proceedCheckout = async () => {
    router.push("/payment");
  };

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
