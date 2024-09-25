import { IoStar } from "react-icons/io5";

interface StarRatingProps {
  rating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-x-[0.2em]">
      {Array(rating)
        .fill(null)
        .map((_, index) => (
          <IoStar key={index} />
        ))}
    </div>
  );
};

export default StarRating;
