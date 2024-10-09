import React from "react";
import Image, { StaticImageData } from "next/image";

import StarRating from "@/app/(home)/_components/star-rating";

interface FeedbackCardProps {
  avatar: StaticImageData;
  username: string;
  fullname: string;
  content: string;
  date: string;
  rating: number;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  avatar,
  username,
  fullname,
  content,
  date,
  rating,
}) => {
  return (
    <article className="w-full bg-black border mx-auto p-[3em] text-[8px] mb-[2em] sm:w-[25em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
      {/* Avatar, username and name */}
      <div className="flex items-center gap-x-[1.5em] pb-[1.25em] border-b">
        <div>
          <Image
            src={avatar}
            alt={username}
            className="size-[4.5em] rounded-full"
          />
        </div>
        <div>
          <h4 className="text-[1.25em] font-bold">{username}</h4>
          <p className="text-[0.9em]">By {fullname}</p>
        </div>
      </div>

      {/* Review content */}
      <p className="my-[1.25em] text-justify">&#8220;{content}&#8221;</p>

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
