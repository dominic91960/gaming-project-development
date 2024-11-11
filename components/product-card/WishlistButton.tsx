// WishlistButton.tsx
import React, { useEffect, useState } from "react";

import { useVerifySession } from "@/hooks/useVerifySession";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Button } from "../ui/button";

import { useWishlistContext } from "@/context/WishListContext";
import NavBarSpinner from "../Spinner/NavBarSpinner";
import AccessDeniedModal from "@/components/access-denied-modal/AccessDeniedModal";

interface WishlistButtonProps {
  gameId: string;
  showText: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  gameId,
  showText,
}) => {
  const { addToWishlist, removeFromWishlist, wishListGameIds } =
    useWishlistContext();
  const wishList = wishListGameIds.includes(gameId);
  const [isWishlisted, setIsWishlisted] = useState(wishList);
  const [accessDeniedPopupOpen, setAccessDeniedPopupOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  //   const verify = useVerifySession();

  const handleWishlist = async () => {
    console.log("handleWishlist");
    // setLoading(true);
    if (!(await useVerifySession())) {
      setAccessDeniedPopupOpen(true);
      return;
    }
    setLoading(true);
    if (isWishlisted) {
      await removeFromWishlist(gameId);
      setIsWishlisted(false);
    } else {
      const res = await addToWishlist(gameId);
      setIsWishlisted(res);
    }
  };

  useEffect(() => {
    setIsWishlisted(wishListGameIds.includes(gameId));
    setLoading(false);
  }, [wishListGameIds]);

  if (loading) {
    return <NavBarSpinner loading={loading} />;
  }

  return (
    <>
      {showText ? (
        <Button
          variant="outline"
          className="w-[70%] h-[2em] text-[0.9em] px-[1em] py-0 font-medium border-[#0BDB45] rounded-none hover:bg-[#0BDB45]"
          onClick={handleWishlist}
        >
          {isWishlisted ? (
            <>
              <IoHeartSharp className="text-[1.2em] me-[0.1em]" />
              Wishlisted!
            </>
          ) : (
            <>
              <IoHeartOutline className="text-[1.2em] me-[0.1em]" />
              Add to Wishlist
            </>
          )}
        </Button>
      ) : (
        <div onClick={handleWishlist} className="cursor-pointer">
          {isWishlisted ? (
            <IoHeartSharp className="text-[1em] text-white hover:scale-105" />
          ) : (
            <IoHeartOutline className="text-[1em] text-white hover:scale-105" />
          )}
        </div>
      )}

      {accessDeniedPopupOpen && (
        <AccessDeniedModal
          open={accessDeniedPopupOpen}
          setIsOpen={setAccessDeniedPopupOpen}
        />
      )}
    </>
  );
};

export default WishlistButton;
