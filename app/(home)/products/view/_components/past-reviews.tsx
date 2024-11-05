import React from "react";

import { Button } from "@/components/ui/button";
import { LiaAngleRightSolid } from "react-icons/lia";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";

import ReviewCard from "./review-card";

const PastReviews: React.FC<{ reviews: any[] }> = ({ reviews }) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-between">
        {reviews.length > 0 ? (
          reviews.map(
            ({ avatar, username, fullname, title, content, date, rating }) => (
              <ReviewCard
                key={username}
                avatar={avatar}
                username={username}
                fullname={fullname}
                title={title}
                content={content}
                date={date}
                rating={rating}
              />
            )
          )
        ) : (
          <div className="w-full h-[20em] col-span-3 bg-white/5 flex flex-col items-center justify-center text-[8px] pb-[1em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
            <MdOutlineSpeakerNotesOff className="text-[4em] opacity-80 animate-pulse" />
            <p className="mt-[0.5em]">
              No feedback available. You could be the first to write a review!
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end pt-[1em]">
        <Button
          variant="gaming"
          className="text-[1em] px-[1em] py-[0.5em] h-fit"
        >
          See More <LiaAngleRightSolid />
        </Button>
      </div>
    </>
  );
};

export default PastReviews;
