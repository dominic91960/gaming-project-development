import StarRating from "./star-rating";
import one from "@/public/images/home/vertical-carousel/one.png";
import two from "@/public/images/home/vertical-carousel/two.png";
import three from "@/public/images/home/vertical-carousel/three.png";
import four from "@/public/images/product/bg.png";
import five from "@/public/images/home/vertical-carousel/five.png";
import "./verticle-carousel.css";

const data = [
  {
    poster: one,
    name: "Worshippers of Cthulu",
    price: 299,
    rating: 5,
  },
  {
    poster: two,
    name: "Warhammer 40,000: Space Marine 2",
    price: 299,
    rating: 5,
  },
  {
    poster: three,
    name: "Assassin's Creed Shadows",
    price: 299,
    rating: 5,
  },
  {
    poster: four,
    name: "Star Wars Outlaws",
    price: 299,
    rating: 5,
  },
  {
    poster: five,
    name: "Skull and Bones",
    price: 299,
    rating: 5,
  },
];

const VerticalCarousel = () => {
  return (
    <section className="relative bg-gradient-to-b from-black from-20% via-[#063C28] via-80% to-black font-primaryFont text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-1/12 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-1/12 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

      <div className="container mx-auto sm:px-[36px] py-[60px] sm:py-[90px] md:py-[120px] lg:py-[150px] xl:py-[175px] 2xl:py-[200px]">
        {/* Title */}
        <div className="text-[18px] uppercase font-medium w-fit mx-auto mb-[2.3em] text-center flex-shrink-0 sm:text-[22px] md:text-[26px] lg:text-[29px] xl:text-[31px] 2xl:text-[33px]">
          <p className="text-[#0BDB45] translate-y-[55%]">Top much</p>
          <p
            className="font-bold text-[1.2em] border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em]"
            style={{
              clipPath:
                "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
            }}
          >
            Latest games
          </p>
        </div>

        {/* Carousel */}
        <div className="vertical-carousel-container">
          {data.map(({ poster, name, price, rating }, i) => (
            <div
              key={name}
              className={`vertical-carousel-box vertical-carousel-box-${i} ${
                i === 3
                  ? "hidden min-[550px]:block"
                  : i === 4
                  ? "hidden sm:block"
                  : ""
              }`}
              style={{ backgroundImage: `url(${poster.src})` }}
            >
              <div className="vertical-carousel-box-content w-full h-full bg-gradient-to-b from-black via-transparent to-black flex flex-col items-end justify-end text-right p-[1em]">
                <h3 className="font-bold text-[#75F94C] uppercase w-[8ch] overflow-hidden text-ellipsis">
                  {name}
                </h3>
                <p className="font-semibold text-[2em] uppercase leading-none">
                  ${price}
                </p>
                <p className="text-[0.5em] text-[#f29d38]">
                  <StarRating rating={rating} />
                </p>
                <p className="font-medium text-[7px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
                  Rating
                </p>
                <hr className="w-full mt-[0.2em]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    // <div className="bg-[#000000] pt-[100px]">
    //   <div className=" ">
    //     <div className="flex items-center justify-center relative">
    //       <div className="border-[3px] border-[#0BDB45] w-max px-14 py-5">
    //         <p className="text-white font-primaryFont font-bold text-[50px] text-center">
    //           LATEST GAMES
    //         </p>
    //       </div>

    //       <div className="absolute flex top-[-20px] justify-center">
    //         <p className="font-primaryFont font-medium text-[40px] text-[#45F882] text-center w-max inline bg-black px-8">
    //           TOP MUCH
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="vertical-carousel-container pt-10">
    //     <div>
    //       <div className="vertical-carousel-content">
    //         <div className="flex flex-col items-center justify-end">
    //           <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
    //             VOLORANT
    //           </h2>
    //           <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
    //             $299
    //           </p>
    //           <div className="flex items-center text-[#f29d38] mb-2">
    //             <StarRating rating={4} />
    //           </div>
    //           <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
    //             Rating
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="vertical-carousel-content">
    //         <div className="flex flex-col items-center justify-end">
    //           <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
    //             VOLORANT
    //           </h2>
    //           <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
    //             $299
    //           </p>
    //           <div className="flex items-center text-[#f29d38] mb-2">
    //             <StarRating rating={5} />
    //           </div>
    //           <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
    //             Rating
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="vertical-carousel-content">
    //         <div className="flex flex-col items-center justify-end">
    //           <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
    //             VOLORANT
    //           </h2>
    //           <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
    //             $299
    //           </p>
    //           <div className="flex items-center text-[#f29d38] mb-2">
    //             <StarRating rating={3} />
    //           </div>
    //           <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
    //             Rating
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="vertical-carousel-content">
    //         <div className="flex flex-col items-center justify-end">
    //           <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
    //             VOLORANT
    //           </h2>
    //           <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
    //             $299
    //           </p>
    //           <div className="flex items-center text-[#f29d38] mb-2">
    //             <StarRating rating={2} />
    //           </div>
    //           <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
    //             Rating
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="vertical-carousel-content">
    //         <div className="flex flex-col items-center justify-end">
    //           <h2 className="font-primaryFont font-bold text-[45px] text-[#75F94C] mb-4">
    //             VOLORANT
    //           </h2>
    //           <p className="font-secondaryFont font-light text-[65px] text-[#fff] leading-none mb-2">
    //             $299
    //           </p>
    //           <div className="flex items-center text-[#f29d38] mb-2">
    //             <StarRating rating={5} />
    //           </div>
    //           <p className="font-secondaryFont font-light text-[16px] text-[#fff]">
    //             Rating
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default VerticalCarousel;
