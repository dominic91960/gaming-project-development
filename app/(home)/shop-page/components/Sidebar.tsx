"use client";
import React, { use, useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { Slider } from "@/components/ui/slider";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/axios/axiosInstance";

type Genres = {
  id: string;
  name: string;
};

type Platforms = {
  id: string;
  name: string;
};

type Brands = {
  id: string;
  name: string;
};

type FilterParams = {
  rating: number;
  price: number;
  genres: string[];
  platforms: string[];
  brands: string[];
  operatingSystems: string[];
};

const Sidebar: React.FC = () => {
  const [value, setValue] = useState([33]);

  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [platforms, setPlatforms] = useState<Platforms[]>([]);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    rating: 0,
    price: 0,
    genres: [],
    platforms: [],
    brands: [],
    operatingSystems: [],
  });

  const getData = async () => {
    const resTags = await axiosInstance.get(`/tags`);
    console.log(resTags.data);
    const mappedGenres = resTags.data.map((g:any) => {
      return {
        id: g.id,
        name: g.name,
      };
    });
    console.log("MG",mappedGenres);
    setGenres(mappedGenres);
    const resPlatforms = await axiosInstance.get(`/platforms`);
    console.log(resPlatforms.data);
    const mappedPlatforms = resPlatforms.data.map((p:any) => {
      return {
        id: p.id,
        name: p.name,
      };
    });
    console.log("MP",mappedPlatforms);
    setPlatforms(mappedPlatforms);

    const resBrands = await axiosInstance.get(`/brands`);
    console.log(resBrands.data);
    const mappedBrands = resBrands.data.map((b:any) => {
      return {
        id: b.id,
        name: b.name,
      };
    });
    console.log("MB",mappedBrands);
    setBrands(mappedBrands);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRating = (rating: number) => {
    console.log(`User rated: ${rating} stars`);
    // You can add logic to save the rating to a database or state here.
    setFilterParams((prevParams) => {
      return { ...prevParams, rating };
    });
  };

  const handleGenreChange = (id: string, isChecked: boolean) => {
    setFilterParams((prevParams) => {
      const updatedGenres = isChecked
        ? [...prevParams.genres, id.toString()]
        : prevParams.genres.filter((genreId) => genreId !== id.toString());

      return { ...prevParams, genres: updatedGenres };
    });
    console.log("FP",filterParams);
  };

  const handlePlatformChange = (id: string, isChecked: boolean) => {
    setFilterParams((prevParams) => {
      const updatedPlatforms = isChecked
        ? [...prevParams.platforms, id.toString()]
        : prevParams.platforms.filter(
            (platformId) => platformId !== id.toString()
          );

      return { ...prevParams, platforms: updatedPlatforms };
    });
    console.log("FP",filterParams);
  };

  const handleBrandChange = (id: string, isChecked: boolean) => {
    setFilterParams((prevParams) => {
      const updatedBrands = isChecked
        ? [...prevParams.brands, id.toString()]
        : prevParams.brands.filter((brandId) => brandId !== id.toString());

      return { ...prevParams, brands: updatedBrands };
    });
    console.log("FP",filterParams);
  }

  const handleOsChange = (osName: string, isChecked: boolean) => {
    const osMap: { [key: string]: string } = {
      Xbox: "XBOX",
      Windows: "WINDOWS",
      Playstation: "PLAYSTATION",
    };

    setFilterParams((prevParams) => {
      const updatedOperatingSystems = isChecked
        ? [...prevParams.operatingSystems, osMap[osName]]
        : prevParams.operatingSystems.filter((os) => os !== osMap[osName]);

      return { ...prevParams, operatingSystems: updatedOperatingSystems };
    });
  };
  return (
    <aside className="w-full text-white px-4 font-semibold border border-[#fff]">
      {/* Genres starts here */}

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>
      <h2 className="text-[20px] font-semibold font-primaryFont">Genres</h2>
    </AccordionTrigger>
    <AccordionContent>
      <div className="mb-4">
        <ul>
          {genres.map((genre) => (
            <div className="flex items-center justify-between" key={genre.id}>
              <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                        id={`genre-${genre.id}`}
                        className="border-white rounded-none"
                        onCheckedChange={(isChecked: boolean) =>
                          handleGenreChange(genre.id, isChecked)
                        }
                      />
                <label
                  htmlFor={`genre-${genre.id}`}
                  className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {genre.name}
                </label>
              </div>
              <p className="font-primaryFont font-normal text-[13px] leading-none">
                {/* Replace 100 with a dynamic value if you have one */}
                100
              </p>
            </div>
          ))}
          <li>
            <a href="#" className="font-primaryFont text-[12px] text-[#75F94C]">
              See more...
            </a>
          </li>
        </ul>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>


      {/* Pricing starts here */}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">
              Pricing
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <div className="mt-3">
                <Slider
                  value={value}
                  onValueChange={(newValue) =>{
                    setValue(newValue);
                    setFilterParams((prevParams) => {
                      return { ...prevParams, price: newValue[0] };
                    });
                  }
                  } // Update state when the slider is moved
                  max={100}
                  step={1}
                />

                <div className="flex items-center mt-3 gap-2">
                  <p className="text-[15px] font-normal font-primaryFont">
                    Price :
                  </p>

                  <p className="text-[15px] text-[#0BDB45] font-normal font-primaryFont">
                    {`0 - ${value[0]}`} <span className="text-white">$</span>
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Rating starts here */}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">
              Rating
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <StarRating onRate={handleRating} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Operating Systems starts here */}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">
              Operating System
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <ul>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="terms"
                      className="border-white rounded-none"
                      onCheckedChange={(isChecked: boolean) =>
                        handleOsChange("Xbox", isChecked)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Xbox
                    </label>
                  </div>
                  <p className="font-primaryFont font-normal text-[13px] leading-none">
                    100
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="terms"
                      className="border-white rounded-none"
                      onCheckedChange={(isChecked: boolean) =>
                        handleOsChange("Windows", isChecked)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Windows
                    </label>
                  </div>
                  <p className="font-primaryFont font-normal text-[13px] leading-none">
                    120
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="terms"
                      className="border-white rounded-none"
                      onCheckedChange={(isChecked: boolean) =>
                        handleOsChange("Playstation", isChecked)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Playstation
                    </label>
                  </div>
                  <p className="font-primaryFont font-normal text-[13px] leading-none">
                    134
                  </p>
                </div>

                <li>
                  <a
                    href="#"
                    className="font-primaryFont text-[12px] text-[#75F94C]"
                  >
                    See more...
                  </a>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Platforms starts here */}

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>
      <h2 className="text-[20px] font-semibold font-primaryFont">Platforms</h2>
    </AccordionTrigger>
    <AccordionContent>
      <div className="mb-4">
        <ul>
          {platforms.map((platform) => (
            <div className="flex items-center justify-between" key={platform.id}>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                onCheckedChange={(isChecked: boolean) =>
                  handlePlatformChange(platform.id, isChecked)
                }
                id={`platform-${platform.id}`} className="border-white rounded-none" />
                <label
                  htmlFor={`platform-${platform.id}`}
                  className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {platform.name}
                </label>
              </div>
              <p className="font-primaryFont font-normal text-[13px] leading-none">
                {/* Replace 100 with a dynamic value if available */}
                100
              </p>
            </div>
          ))}
          <li>
            <a href="#" className="font-primaryFont text-[12px] text-[#75F94C]">
              See more...
            </a>
          </li>
        </ul>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>


      {/* Brands starts here */}

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>
      <h2 className="text-[20px] font-semibold font-primaryFont">Brands</h2>
    </AccordionTrigger>
    <AccordionContent>
      <div className="mb-4">
        <ul>
          {brands.map((brand) => (
            <div className="flex items-center justify-between" key={brand.id}>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                onCheckedChange={(isChecked: boolean) =>
                  handleBrandChange(brand.id, isChecked)
                }
                id={`brand-${brand.id}`} className="border-white rounded-none" />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand.name}
                </label>
              </div>
              <p className="font-primaryFont font-normal text-[13px] leading-none">
                {/* Replace 100 with a dynamic value if available */}
                100
              </p>
            </div>
          ))}
          <li>
            <a href="#" className="font-primaryFont text-[12px] text-[#75F94C]">
              See more...
            </a>
          </li>
        </ul>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>


      <Button className="bg-[#BD0202] rounded-none px-6 mb-6 mr-2">Clear all</Button>
      <Button 
      onClick={() => console.log(filterParams)}
      className="bg-[#BD0202] rounded-none px-6 mb-6">Filter</Button>
    </aside>
  );
};

export default Sidebar;

