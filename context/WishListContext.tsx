"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext"; // Assuming AuthContext provides user login status

// Define the WishlistItem type
type WishlistItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  price: number;
  productType: string;
};

// Define the context properties interface
interface WishlistContextProps {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  viewWishlist: () => WishlistItem[];
  isUserLoggedIn: () => boolean;
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

// Create the WishlistContext with a default undefined value
const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

// Custom hook to use the WishlistContext
export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used within a WishlistProvider");
  }
  return context;
};

// WishlistProvider component to wrap around your application or components
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });
  const { user } = useAuthContext(); // Access the user data from AuthContext
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isUserLoggedIn = () => !!user;

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const addToWishlist = (item: WishlistItem) => {
    if (!isUserLoggedIn()) {
      openPopup(); // Trigger popup if the user is not logged in
      return;
    }
    
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((wishlistItem) => wishlistItem.id === item.id);
      if (!existingItem) {
        return [...prevWishlist, item];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const viewWishlist = () => wishlist;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        viewWishlist,
        isUserLoggedIn,
        isPopupOpen,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
