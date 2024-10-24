import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
interface StarRatingProps {
  maxStars?: number;
  onRate: (rating: number) => void;
  // clearRating?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, onRate }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleMouseEnter = (value: number) => {
    setSelectedRating(value);
  };

  const handleMouseLeave = () => {
    // Reset to the currently selected rating on mouse leave
    setSelectedRating(selectedRating);
  };

  const handleClick = (value: number) => {
    setSelectedRating(value);
    onRate(value);
  };

  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <div
            key={starValue}
            className={`cursor-pointer text-[25px] ${
              starValue <= selectedRating ? "text-[#f29d38]" : "text-gray-400"
            }`}
            // onMouseEnter={() => handleMouseEnter(starValue)}
            // onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          >
            <IoIosStar />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
