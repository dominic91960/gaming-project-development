"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext"; // Assuming AuthContext provides user login status
import axios from "axios";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

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
  addToWishlist: (itemId: string) => Promise<boolean>;
  removeFromWishlist: (itemId: string) => Promise<boolean>;
  clearWishlist: () => void;
  viewWishlist: () => WishlistItem[];
  isUserLoggedIn: () => Promise<boolean>;
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  wishListGameIds: string[];
  setReloadWishlist: React.Dispatch<React.SetStateAction<boolean>>; 
  updateWishListIds: () => Promise<void>;
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
  const [wishListGameIds, setWishListGameIds] = useState<string[]>([]);
  const [reloadWishlist, setReloadWishlist] = useState(false);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isUserLoggedIn = async() => {
    // setLoading(true);
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 200) {
        // 
        return true;
      } else {
        throw new Error("Session expired");
      }
    } catch (error) {
      console.log("Error verifying session: ", error);
      return false;
    }
  }

  const getWishlistIds = async() => {
    try {
      const res = await axiosInstance.get(`/wishlists/${user.id}`);
      if (res.status === 200) {
        // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", res.data.items.map((item: { gameId: string }) => item.gameId))
        return res.data.items.map((item: { gameId: string }) => item.gameId);
      } else{
        throw new Error("User not have a wishlist");
      }
    } catch (error) {
      // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      return [];
    }
  }

  useEffect(() => {
    const getData = async () => {
      if (await isUserLoggedIn()) {
        const res = await getWishlistIds();
        console.log("Wishlist game idssssssssssssssssssssssssssssssss: ", res);
        setWishListGameIds(res);
      }else{
        setWishListGameIds([]);
      }
    }
    getData();
  },[user, reloadWishlist]);

  const isUserHaveWishlist = async() => {
    try {
      const res = await axiosInstance.get(`/wishlists/${user.id}`);
      if (res.status === 200) {
        return true;
      } else{
        throw new Error("User not have a wishlist");
      }
    } catch (error) {
      return false;
    }
  }



  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const addToWishlist = async (itemId: string) => {
    console.log("Add to wishlist: ", itemId);
    if (!await isUserLoggedIn()) {
      console.log("User is not logged in");
      toast.error("Please login to add to wishlist");
      return false;
    } else {
      console.log("User is logged in");

      if (await isUserHaveWishlist()) {
        console.log("User has a wishlist");
        const existingItems = await getWishlistIds();
        console.log("Existing items: ", existingItems);

        // Check for duplicates
        if (existingItems.includes(itemId)) {
          // toast.error("Item is already in the wishlist");
          return true;
        }

        const resUpdate = await axiosInstance.patch(`/wishlists/${user.id}`, {
          items: [...existingItems, itemId]
        });

        if (resUpdate.status === 200) {
          console.log("Added to wishlist: ", resUpdate.data);
          toast.success("Added to wishlist");
          setReloadWishlist(prev => !prev);
          return true;
        } else {
          throw new Error("Error adding to wishlist");
        }

      } else {
        console.log("User does not have a wishlist");

        try {
          const res = await axiosInstance.post(`/wishlists`, {
            userId: user.id,
            items: [itemId]
          });

          if (res.status === 201) {
            console.log("Added to wishlist: ", res.data);
            toast.success("Added to wishlist");
            setReloadWishlist(prev => !prev);
            return true;
          } else {
            throw new Error("Error adding to wishlist");
          }
        } catch (error) {
          console.log("Error adding to wishlist: ", error);
          toast.error("Error adding to wishlist");
          return false;
        }
      }
    }
  };

  const updateWishListIds = async() => {
      if (await isUserLoggedIn()) {
        const res = await getWishlistIds();
        console.log("Wishlist game idssssssssssssssssssssssssssssssss: ", res);
        setWishListGameIds(res);
      }else{
        setWishListGameIds([]);
      }
  }


  const removeFromWishlist = async (itemId: string) => {
    if (!await isUserLoggedIn()) {
      toast.error("Please login to remove from wishlist");
      return false;
    } else {
      try {
        const existingItems = await getWishlistIds();
  
        // Check if the item exists in the wishlist
        if (!existingItems.includes(itemId)) {
          toast.error("Item is not in the wishlist");
          return false;
        }
  
        const updatedItems = existingItems.filter((id: string) => id !== itemId);
        
        const resUpdate = await axiosInstance.patch(`/wishlists/${user.id}`, {
          items: updatedItems
        });
  
        if (resUpdate.status === 200) {
          toast.success("Removed from wishlist");
          setReloadWishlist(prev => !prev); // Trigger reload of wishlist game IDs
          return true;
        } else {
          throw new Error("Error removing from wishlist");
        }
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        toast.error("Error removing from wishlist");
        return false;
      }
    }
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
        setReloadWishlist,
        wishListGameIds,
        updateWishListIds,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
