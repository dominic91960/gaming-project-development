import VerticalCarouselCard from "./vertical-carousel-card";
import one from "@/public/images/home/vertical-carousel/one.png";
import two from "@/public/images/home/vertical-carousel/two.png";
import three from "@/public/images/home/vertical-carousel/three.png";
import four from "@/public/images/product/bg.png";
import five from "@/public/images/home/vertical-carousel/five.png";
import "./verticle-carousel.css";

const data = [
  {
    poster: one.src,
    name: "Worshippers of Cthulu",
    price: 2992,
    rating: 0,
  },
  {
    poster: two.src,
    name: "Warhammer 40,000: Space Marine 2",
    price: 2992,
    rating: 5,
  },
  {
    poster: three.src,
    name: "Assassin's Creed Shadows",
    price: 2991,
    rating: 5,
  },
  {
    poster: four.src,
    name: "Star Wars Outlaws",
    price: 2993,
    rating: 5,
  },
  {
    poster: five.src,
    name: "Skull and Bones",
    price: 2994,
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
            <VerticalCarouselCard
              key={i}
              poster={poster}
              name={name}
              price={price}
              rating={rating}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalCarousel;
