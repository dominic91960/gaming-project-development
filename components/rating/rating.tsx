import React from "react";

import { IoStar } from "react-icons/io5";

interface RatingProps {
  rating: number;
}
const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <span className="flex items-center gap-x-[0.2em]">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <IoStar
            key={index}
            className={rating > index ? "text-[#f29d38]" : "text-white/20"}
          />
        ))}
    </span>
  );
};

export default Rating;
