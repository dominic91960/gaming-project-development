import "../_components/verticle-carousel.css";

import StarRating from "./star-rating";

const VerticalCarousel = () => {
  return (
    <div className="bg-[#000000] pt-[100px]">
      <div className=" ">
        <div className="flex items-center justify-center relative">
          <div className="border-[3px] border-[#0BDB45] w-max px-14 py-5">
            <p className="text-white font-primaryFont font-bold text-[50px] text-center">
              LATEST GAMES
            </p>
          </div>

          <div className="absolute flex top-[-20px] justify-center">
            <p className="font-primaryFont font-medium text-[40px] text-[#45F882] text-center w-max inline bg-black px-8">
              TOP MUCH
            </p>
          </div>
        </div>
      </div>

      <div className="vertical-carousel-container pt-10">
        <div>
          <div className="vertical-carousel-content">
            <div className="flex flex-col items-center justify-end">
              <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
                VOLORANT
              </h2>
              <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
                $299
              </p>
              <div className="flex items-center text-[#f29d38] mb-2">
                <StarRating rating={4} />
              </div>
              <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
                Rating
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="vertical-carousel-content">
            <div className="flex flex-col items-center justify-end">
              <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
                VOLORANT
              </h2>
              <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
                $299
              </p>
              <div className="flex items-center text-[#f29d38] mb-2">
                <StarRating rating={5} />
              </div>
              <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
                Rating
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="vertical-carousel-content">
            <div className="flex flex-col items-center justify-end">
              <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
                VOLORANT
              </h2>
              <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
                $299
              </p>
              <div className="flex items-center text-[#f29d38] mb-2">
                <StarRating rating={3} />
              </div>
              <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
                Rating
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="vertical-carousel-content">
            <div className="flex flex-col items-center justify-end">
              <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
                VOLORANT
              </h2>
              <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
                $299
              </p>
              <div className="flex items-center text-[#f29d38] mb-2">
                <StarRating rating={2} />
              </div>
              <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
                Rating
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="vertical-carousel-content">
            <div className="flex flex-col items-center justify-end">
              <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
                VOLORANT
              </h2>
              <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
                $299
              </p>
              <div className="flex items-center text-[#f29d38] mb-2">
                <StarRating rating={5} />
              </div>
              <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
                Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;
