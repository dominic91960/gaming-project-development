// components/StarRating.tsx
import { IoStar } from "react-icons/io5";

interface StarRatingProps {
  rating?: number; // Optional prop with default value of 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 5 }) => {
  return (
    <div className="flex items-center">
      {Array(rating)
        .fill(null)
        .map((_, index) => (
          <IoStar key={index} />
        ))}
    </div>
  );
};

export default StarRating;
