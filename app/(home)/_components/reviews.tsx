import { IoStar } from "react-icons/io5";
import { useState } from "react";

interface StarRatingProps {
  rating?: number;
  setRate: React.Dispatch<React.SetStateAction<number>>; 
}

const addRate = (rate: number) => {
};

const reviews: React.FC<StarRatingProps> = ({ rating = 5, setRate }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelectedRating(index + 1); 
    addRate(index + 1);
    setRate(index+1);
  };

  return (
    <div className="flex items-center gap-x-[0.2em]">
      {Array(rating)
        .fill(null)
        .map((_, index) => (
          <IoStar
            onClick={() => handleClick(index)}
            key={index}
            className={index < selectedRating ? "text-[#f29d38]" : "text-gray-400"}
          />
        ))}
    </div>
  );
};

export default reviews;
