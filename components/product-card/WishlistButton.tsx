// WishlistButton.tsx
import React, { use, useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import AccessDeniedModal from "@/components/access-denied-modal/AccessDeniedModal";
import { useWishlistContext } from "@/context/WishListContext";
import NavBarSpinner from "../Spinner/NavBarSpinner";
import { set } from "date-fns";
import { useVerifySession } from "@/hooks/useVerifySession";
import { verify } from "crypto";

interface WishlistButtonProps {
  gameId: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ gameId }) => {
  const { addToWishlist, removeFromWishlist, wishListGameIds } =
    useWishlistContext();
  const wishList = wishListGameIds.includes(gameId);
  const [isWishlisted, setIsWishlisted] = useState(wishList);
  const [accessDeniedPopupOpen, setAccessDeniedPopupOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  //   const verify = useVerifySession();

  const handleWishlist = async () => {
    console.log("handleWishlist", await useVerifySession());
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
      <div onClick={handleWishlist} className="cursor-pointer">
        {isWishlisted ? (
          <IoHeartSharp className="text-[1em] text-white hover:scale-105" />
        ) : (
          <IoHeartOutline className="text-[1em] text-white hover:scale-105" />
        )}
      </div>

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
