import React from "react";

import { Button } from "@/components/ui/button";

import StarRating from "@/app/(home)/_components/star-rating";

interface AddReviewButtonProps {
  handleClick: () => void;
  overallRating: number;
}

const AddReviewButton: React.FC<AddReviewButtonProps> = ({
  handleClick,
  overallRating,
}) => {
  return (
    <div className="flex items-center mb-[1.5em] text-[1.4em] sm:text-[1em] md:text-[0.8em] *:flex-grow">
      <div>
        <StarRating rating={5} />
        <Button
          variant="outline"
          className="h-fit text-white text-[1em] py-[0.5em] px-[1em] mt-[0.8em] rounded-none"
          onClick={handleClick}
        >
          &#43; Add your review
        </Button>
      </div>
      {overallRating > 0 && (
        <div>
          <p className="flex leading-tight">
            <span className="text-[#f29d38]">
              <StarRating rating={1} />
            </span>
            &nbsp;{overallRating}/5
          </p>
          <p>Overall Rating</p>
        </div>
      )}
    </div>
  );
};

export default AddReviewButton;
