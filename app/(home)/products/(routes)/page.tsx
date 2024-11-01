"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

import Footer from "@/components/footer/footer";
import bg from "@/public/images/products/bg.png";

const categories = [
  {
    categoryName: "Category 01",
    totalProducts: 100,
  },
  {
    categoryName: "Category 02",
    totalProducts: 120,
  },
  {
    categoryName: "Category 03",
    totalProducts: 134,
  },
  {
    categoryName: "Category 04",
    totalProducts: 176,
  },
  {
    categoryName: "Category 05",
    totalProducts: 231,
  },
  {
    categoryName: "Category 06",
    totalProducts: 212,
  },
  {
    categoryName: "Category 07",
    totalProducts: 341,
  },
];

const countries = [
  { iso3Value: "ALB", countryName: "Albania" },
  { iso3Value: "DZA", countryName: "Algeria" },
  { iso3Value: "ASM", countryName: "American Samoa" },
  { iso3Value: "AND", countryName: "Andorra" },
  { iso3Value: "AGO", countryName: "Angola" },
  { iso3Value: "AIA", countryName: "Anguilla" },
  { iso3Value: "ATG", countryName: "Antigua and Barbuda" },
  { iso3Value: "ARG", countryName: "Argentina" },
  { iso3Value: "ARM", countryName: "Armenia" },
];

const os = [
  { value: "xbox", placeholder: "Xbox", totalProducts: 100 },
  { value: "windows", placeholder: "Windows", totalProducts: 120 },
  { value: "playstation", placeholder: "Playstation", totalProducts: 134 },
];

const platform = [
  { value: "steam", placeholder: "Steam", totalProducts: 100 },
  { value: "xbox-live", placeholder: "Xbox Live", totalProducts: 120 },
  { value: "origin", placeholder: "Origin", totalProducts: 134 },
  { value: "gog", placeholder: "GOG.com", totalProducts: 100 },
  {
    value: "ubisfot-connect",
    placeholder: "Ubisoft Connect",
    totalProducts: 120,
  },
  { value: "epic-games", placeholder: "Epic Games", totalProducts: 134 },
];

const regions = [
  { value: "global", placeholder: "Global", totalProducts: 100 },
  { value: "europe", placeholder: "Europe", totalProducts: 120 },
  { value: "us", placeholder: "United States", totalProducts: 134 },
  { value: "arg", placeholder: "Argentina", totalProducts: 100 },
  { value: "turkey", placeholder: "Turkey", totalProducts: 120 },
  { value: "brazil", placeholder: "Brazil", totalProducts: 134 },
];

const genres = [
  { value: "single-player", placeholder: "Single Player", totalProducts: 100 },
  { value: "action", placeholder: "Action", totalProducts: 120 },
  { value: "indie", placeholder: "Indie", totalProducts: 134 },
  { value: "adventure", placeholder: "Adventure", totalProducts: 100 },
  { value: "multiplayer", placeholder: "Multiplayer", totalProducts: 120 },
  { value: "simulation", placeholder: "Simulation", totalProducts: 134 },
];

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState(20);
  const [minRating, setMinRating] = useState(1);

  return (
    <div className="bg-[#051301] font-primaryFont">
      <section className="relative">
        <Image src={bg} alt="Product header background" className="w-full" />
        <div className="text-[40px] uppercase font-medium absolute w-fit left-0 right-0 mx-auto bottom-[20.7%] text-center">
          <p className="text-[20px] text-[#0BDB45] translate-y-[55%]">
            Home / Product
          </p>
          <p
            className="font-bold border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em]"
            style={{
              clipPath:
                "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
            }}
          >
            Product page
          </p>
        </div>
      </section>
      <section className="bg-gradient-to-b from-black via-transparent to-black  pb-[136px]">
        <div className="container mx-auto bg-white/5 flex p-[46px] gap-[58px]">
          <Accordion
            type="multiple"
            className="bg-white/5 border pt-[19px] pb-[31px] px-[18px] w-[268px]"
          >
            {/* Filter by Category */}
            <AccordionItem value="categories" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Categories
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                {categories.map(({ categoryName, totalProducts }) => (
                  <button
                    key={categoryName}
                    className="flex justify-between mb-[0.6em] w-full"
                    onClick={() => console.log(categoryName)}
                  >
                    <span>{categoryName}</span>
                    <span>{totalProducts}</span>
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
            {/* Filter by Price */}
            <AccordionItem value="price" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Price
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="my-[27px] cursor-pointer"
                  onValueChange={(value: number[]) => setPriceRange(value[0])}
                />
                <p className="pb-[0.9em]">
                  Price :
                  <span className="text-[#0BDB45]"> 0 - {priceRange}</span> $
                </p>
              </AccordionContent>
            </AccordionItem>
            {/* Filter by rating */}
            <AccordionItem value="rating" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Rating
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                <div className="py-[17px] flex gap-[0.5em]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      className={`text-[2em] ${
                        minRating > i ? "text-[#E7A600]" : "text-[#8C8C8C]"
                      }`}
                      onClick={() => setMinRating(i + 1)}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* Filter by country */}
            <AccordionItem value="country" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Country
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                <Select
                  defaultValue={countries[0].iso3Value}
                  onValueChange={(value: string) => console.log(value)}
                >
                  <SelectTrigger className="bg-[#1D201C] border-[#666666] text-white/50">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1D201C] border-[#666666] text-white/50">
                    {countries.map(({ iso3Value, countryName }) => (
                      <SelectItem key={iso3Value} value={iso3Value}>
                        {countryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            {/* Filter by OS */}
            <AccordionItem value="os" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Operating System
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                {os.map(({ value, placeholder, totalProducts }) => (
                  <div
                    key={value}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-[0.9em] py-[0.5em] items-center">
                      <Checkbox
                        id={value}
                        className="border-[#D9D9D9] rounded-none"
                        onCheckedChange={(checked: boolean | "indeterminate") =>
                          console.log(value, checked)
                        }
                      />
                      <label
                        htmlFor={value}
                        className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {placeholder}
                      </label>
                    </div>
                    <p>{totalProducts}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            {/* Filter by Platform */}
            <AccordionItem value="platforms" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Platforms
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                {platform.map(({ value, placeholder, totalProducts }) => (
                  <div
                    key={value}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-[0.9em] py-[0.5em] items-center">
                      <Checkbox
                        id={value}
                        className="border-[#D9D9D9] rounded-none"
                        onCheckedChange={(checked: boolean | "indeterminate") =>
                          console.log(value, checked)
                        }
                      />
                      <label
                        htmlFor={value}
                        className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {placeholder}
                      </label>
                    </div>
                    <p>{totalProducts}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            {/* Filter by Region */}
            <AccordionItem value="regions" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Regions
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                {regions.map(({ value, placeholder, totalProducts }) => (
                  <div
                    key={value}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-[0.9em] py-[0.5em] items-center">
                      <Checkbox
                        id={value}
                        className="border-[#D9D9D9] rounded-none"
                        onCheckedChange={(checked: boolean | "indeterminate") =>
                          console.log(value, checked)
                        }
                      />
                      <label
                        htmlFor={value}
                        className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {placeholder}
                      </label>
                    </div>
                    <p>{totalProducts}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            {/* Filter by Genre */}
            <AccordionItem value="genres" className="border-b-[#8C8C8C]">
              <AccordionTrigger className="text-[20px] font-semibold py-[0.6em] leading-none">
                Genres
              </AccordionTrigger>
              <AccordionContent className="text-[13px] font-medium py-[0.6em] border-t-[#8C8C8C] border-t">
                {genres.map(({ value, placeholder, totalProducts }) => (
                  <div
                    key={value}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-[0.9em] py-[0.5em] items-center">
                      <Checkbox
                        id={value}
                        className="border-[#D9D9D9] rounded-none"
                        onCheckedChange={(checked: boolean | "indeterminate") =>
                          console.log(value, checked)
                        }
                      />
                      <label
                        htmlFor={value}
                        className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {placeholder}
                      </label>
                    </div>
                    <p>{totalProducts}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div>Products</div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
