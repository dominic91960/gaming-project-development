import React from "react";
import Image, { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";

import StarRating from "@/app/(home)/_components/star-rating";

interface ReviewCardProps {
  avatar: StaticImageData;
  username: string;
  fullname: string;
  title: string;
  content: string;
  date: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatar,
  username,
  fullname,
  title,
  content,
  date,
  rating,
}) => {
  return (
    <article className="w-full bg-black border lg:w-[25em] p-[3em] text-[1.2em] sm:text-[0.8em] lg:text-[0.7em] xl:text-[0.8em] mb-[2em]">
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

      {/* Review title */}
      <h5 className="my-[1.25em] font-semibold capitalize">{title}</h5>

      {/* Review content */}
      <p className="mb-[1.25em] text-justify">&#8220;{content}&#8221;</p>

      {/* Review date and rating*/}
      <div className="flex justify-between">
        {/* Review date */}
        <p className="mb-[1.25em]">{date}</p>

        {/* Rating */}
        <p className="text-[#f29d38] mb-[1.25em]">
          <StarRating rating={rating} />
        </p>
      </div>

      {/* Button group */}
      <div className="flex items-center justify-between gap-x-[0.9em]">
        <p>Is this helpful to you &#63;</p>
        <div className="flex gap-x-[1em]">
          <Button
            variant="outline"
            className="h-fit rounded-none text-[1em] px-[0.5em] py-[0.1em]"
          >
            Yes
          </Button>
          <Button
            variant="outline"
            className="h-fit rounded-none text-[1em] px-[0.5em] py-[0.1em]"
          >
            No
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
