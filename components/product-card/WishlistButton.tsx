// WishlistButton.tsx
import React, { useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import AccessDeniedModal from "@/components/access-denied-modal/AccessDeniedModal";
import { useWishlistContext } from "@/context/WishListContext";
import NavBarSpinner from "../Spinner/NavBarSpinner";
import { set } from "date-fns";

interface WishlistButtonProps {
  gameId: string;
  wishList: boolean;
  verifySession: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  gameId,
  wishList,
  verifySession,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(wishList);
  const [accessDeniedPopupOpen, setAccessDeniedPopupOpen] = useState(false);
  const { addToWishlist, removeFromWishlist, wishListGameIds } = useWishlistContext();
  const [loading, setLoading] = useState(false);

  const handleWishlist = async () => {
    // setLoading(true);
    if (!verifySession) {
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
  },[wishListGameIds]);

  if (loading) {
    return <NavBarSpinner loading={loading} />;
    }

  return (
    <>
      <div onClick={handleWishlist} className="cursor-pointer">
        {isWishlisted ? (
          <IoHeartSharp className="text-[1.5em] text-white hover:scale-105" />
        ) : (
          <IoHeartOutline className="text-[1.5em] text-white hover:scale-105" />
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
