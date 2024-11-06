import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import Reviews from "@/app/(home)/_components/reviews";
import sampleUser from "@/public/images/sample-user.png";

interface AddReviewFormProps {
  isReviewFormVisible: boolean;
  profileImage: string;
  firstName: string;
  email: string;
  setRate: Dispatch<SetStateAction<number>>;
  setTitle: (value: SetStateAction<string>) => void;
  setComment: (value: SetStateAction<string>) => void;
  setIsReviewFormVisible: (value: SetStateAction<boolean>) => void;
  handleAddReview: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
  isReviewFormVisible,
  profileImage,
  firstName,
  email,
  setRate,
  setTitle,
  setComment,
  setIsReviewFormVisible,
  handleAddReview,
}) => {
  return (
    <div
      className={`md:w-fit bg-white/5 md:text-[0.8em] p-[4em] mt-[3em] mb-[3.5em] origin-top ${
        isReviewFormVisible
          ? "flex flex-col md:flex-row justify-around gap-x-[5em] animate-slide-down"
          : "hidden"
      }`}
    >
      {/* User profile preview */}
      <div>
        <div className="flex items-center gap-x-[1.5em]">
          <div className="relative size-[4.5em]">
            <Image
              src={profileImage ?? sampleUser}
              alt="username"
              className="size-full rounded-full"
              fill
            />
          </div>
          <div>
            <h4 className="text-[1.25em] font-bold">{firstName}</h4>
            <p className="text-[0.9em]">{email}</p>
          </div>
        </div>
        <hr className="my-[1em]" />
        <p>Your review must contain at least 150 characters.</p>
      </div>

      {/* Review form*/}
      <div>
        <h4 className="text-[1.5em] font-semibold mt-[2em] md:mt-0">
          Detailed Rating
        </h4>

        <p className="text-[1.4em] mt-[1em] mb-[0.3em]">Rating</p>
        <div className="text-[1.5em]">
          <Reviews rating={5} setRate={setRate} />
        </div>

        <p className="text-[1.4em] mt-[1em] mb-[0.3em]">Review Title</p>
        <input
          type="text"
          className="w-full md:w-[50ch] px-[1em] py-[0.5em] outline-none text-white bg-transparent text-[1.3em] border border-[#45F882]/40 sm:text-[1em]"
          onChange={(e) => setTitle(e.target.value)}
        />

        <p className="text-[1.4em] mt-[1em] mb-[0.3em]">Review Text</p>
        <textarea
          className="w-full md:w-[50ch] px-[1em] py-[0.5em] outline-none text-white bg-transparent text-[1.3em] border border-[#45F882]/40 sm:text-[1em]"
          rows={5}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="flex justify-end pt-[1.2em] gap-x-[1em] text-[1.2em] md:text-[1em]">
          <Button
            variant="destructive"
            className="text-[1em] h-fit px-[1em] py-[0.5em] rounded-none"
            onClick={() => setIsReviewFormVisible(false)}
          >
            Cancel
          </Button>
          <Button
            variant="gaming"
            className="text-[1em] h-fit px-[1em] py-[0.5em] hover:opacity-90"
            onClick={handleAddReview}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewForm;
