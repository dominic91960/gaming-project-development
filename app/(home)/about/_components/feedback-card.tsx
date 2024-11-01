import React from "react";
import Image, { StaticImageData } from "next/image";

import StarRating from "@/app/(home)/_components/star-rating";

interface FeedbackCardProps {
  avatar: StaticImageData;
  fullname: string;
  content: string;
  date: string;
  rating: number;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  avatar,
  fullname,
  content,
  date,
  rating,
}) => {
  return (
    <article className="w-full bg-black border mx-auto p-[3em] text-[8px] mb-[2em] sm:w-[25em] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px]">
      {/* Avatar and name */}
      <div className="flex items-center gap-x-[1.5em] pb-[1.25em] border-b">
        <div>
          <Image
            src={avatar}
            alt={fullname}
            className="size-[4.5em] rounded-full"
          />
        </div>
        <div>
          <h4 className="text-[1.25em] font-bold">{fullname}</h4>
        </div>
      </div>

      {/* Review content */}
      <p className="h-[8em] my-[1.25em] line-clamp-6 text-justify opacity-70">
        &#8220;{content}&#8221;
      </p>

      {/* Review date */}
      <p className="mb-[1.25em]">{date}</p>

      {/* Rating */}
      <p className="text-[#f29d38] mb-[1.25em]">
        <StarRating rating={rating} />
      </p>
    </article>
  );
};

export default FeedbackCard;
