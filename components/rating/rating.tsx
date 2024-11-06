import React from "react";

import { IoStar } from "react-icons/io5";

interface RatingProps {
  rating: number;
  activeColor: string;
  inactiveColor: string;
}
const Rating: React.FC<RatingProps> = ({
  rating,
  activeColor,
  inactiveColor,
}) => {
  return (
    <span className="flex items-center gap-x-[0.2em]">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <IoStar
            key={index}
            className={
              rating > index ? `text-${activeColor}` : `text-${inactiveColor}`
            }
          />
        ))}
    </span>
  );
};

export default Rating;
