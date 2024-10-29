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
import { useDebounce } from "@/hooks/useDebounce";
import { count } from "console";
import { set } from "date-fns";

type Genres = {
  id: string;
  name: string;
  count: number;
};

type Platforms = {
  id: string;
  name: string;
  count: number;
};

type Brands = {
  id: string;
  name: string;
  count: number;
};

type FilterParams = {
  rating: number;
  price: number;
  genres: string[];
  platforms: string[];
  brands: string[];
  operatingSystems: string[];
};

interface SidebarProps {
  setFilters: (params: FilterParams) => void;
  setClearFilters: (clear: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({setFilters, setClearFilters}) => {
  const initialFilterParams = {
    rating: 0,
    price: 0,
    genres: [],
    platforms: [],
    brands: [],
    operatingSystems: [],
  };

  const [value, setValue] = useState([33]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [platforms, setPlatforms] = useState<Platforms[]>([]);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [filterParams, setFilterParams] = useState<FilterParams>(initialFilterParams);
  const [checkedGenres, setCheckedGenres] = useState<{ [key: string]: boolean }>({});
  const [checkedPlatforms, setCheckedPlatforms] = useState<{ [key: string]: boolean }>({});
  const [checkedBrands, setCheckedBrands] = useState<{ [key: string]: boolean }>({});
  const [checkedOs, setCheckedOs] = useState<{ [key: string]: boolean }>({});
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [osMap, setOsMap] = useState<{ [key: string]: string }>({});

  // add debounce to the filterParams
  const debouncedFilterParams = useDebounce(filterParams, 500);

  const getData = async () => {
    const resTags = await axiosInstance.get(`/tags`);
    const mappedGenres = resTags.data.map((g: any) => ({
      id: g.id,
      name: g.name,
      count: g.count,
    }));
    setGenres(mappedGenres);

    const resPlatforms = await axiosInstance.get(`/platforms`);
    const mappedPlatforms = resPlatforms.data.map((p: any) => ({
      id: p.id,
      name: p.name,
      count: p.gameCount,
    }));
    setPlatforms(mappedPlatforms);

    const resBrands = await axiosInstance.get(`/brands`);
    const mappedBrands = resBrands.data.map((b: any) => ({
      id: b.id,
      name: b.name,
      count: b.gameCount,
    }));
    setBrands(mappedBrands);

    const maxPriceRes = await axiosInstance.get(`/games/max-price`);
    // setValue([maxPriceRes.data.maxPrice]);
    setMaxPrice(maxPriceRes.data.maxPrice);

    const systemRes = await axiosInstance.get(`/games/count-by-system`);
    setOsMap({
      XBOX: systemRes.data.XBOX,
      WINDOWS: systemRes.data.WINDOWS,
      PLAYSTATION: systemRes.data.PLAYSTATION,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRating = (rating: number) => {
    setFilterParams((prevParams) => ({ ...prevParams, rating }));
  };

  const handleGenreChange = (id: string, isChecked: boolean) => {
    setCheckedGenres((prev) => ({ ...prev, [id]: isChecked }));
    setFilterParams((prevParams) => {
      const updatedGenres = isChecked
        ? [...prevParams.genres, id]
        : prevParams.genres.filter((genreId) => genreId !== id);
      return { ...prevParams, genres: updatedGenres };
    });
  };

  const handlePlatformChange = (id: string, isChecked: boolean) => {
    setCheckedPlatforms((prev) => ({ ...prev, [id]: isChecked }));
    setFilterParams((prevParams) => {
      const updatedPlatforms = isChecked
        ? [...prevParams.platforms, id]
        : prevParams.platforms.filter((platformId) => platformId !== id);
      return { ...prevParams, platforms: updatedPlatforms };
    });
  };

  const handleBrandChange = (id: string, isChecked: boolean) => {
    setCheckedBrands((prev) => ({ ...prev, [id]: isChecked }));
    setFilterParams((prevParams) => {
      const updatedBrands = isChecked
        ? [...prevParams.brands, id]
        : prevParams.brands.filter((brandId) => brandId !== id);
      return { ...prevParams, brands: updatedBrands };
    });
  };

  const handleOsChange = (osName: string, isChecked: boolean) => {
    const osMap: { [key: string]: string } = {
      Xbox: "XBOX",
      Windows: "WINDOWS",
      Playstation: "PLAYSTATION",
    };
    setCheckedOs((prev) => ({ ...prev, [osName]: isChecked }));
    setFilterParams((prevParams) => {
      const updatedOperatingSystems = isChecked
        ? [...prevParams.operatingSystems, osMap[osName]]
        : prevParams.operatingSystems.filter((os) => os !== osMap[osName]);
      return { ...prevParams, operatingSystems: updatedOperatingSystems };
    });
  };

  const handleClearAll = () => {
    setFilterParams(initialFilterParams);
    setCheckedGenres({});
    setCheckedPlatforms({});
    setCheckedBrands({});
    setCheckedOs({});
    setValue([0]); // Reset slider to 0
    setClearFilters((prev: any) => !prev);
  };

  useEffect(() => {
    setFilters(debouncedFilterParams);
  }, [debouncedFilterParams]);

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
                        checked={checkedGenres[genre.id] || false}
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
                    <div className="text-[13px] font-primaryFont">{genre.count}</div>
                  </div>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Pricing starts here */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">Pricing</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-2 mt-2">
              <Slider
                value={value}
                onValueChange={(newValue) => {
                  setValue(newValue);
                  setFilterParams((prevParams) => ({
                    ...prevParams,
                    price: newValue[0],
                  }));
                }}
                max={maxPrice}
                step={1}
              />
              <div className="flex items-center mt-3 gap-2">
                <p className="text-[15px] font-normal font-primaryFont">Price :</p>
                <p className="text-[15px] text-[#0BDB45] font-normal font-primaryFont">
                  {`0 - ${value[0]}`} <span className="text-white">$</span>
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Rating starts here */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">Rating</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <StarRating onRate={handleRating} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Operating Systems starts here */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">Operating System</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <ul>
                <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="os-xbox"
                    className="border-white rounded-none"
                    checked={checkedOs["Xbox"] || false}
                    onCheckedChange={(isChecked: boolean) => handleOsChange("Xbox", isChecked)}
                  />
                  <label htmlFor="os-xbox" className="font-primaryFont font-medium text-[13px]">
                    Xbox
                  </label>
                  </div>
                  <div className="text-[13px] font-primaryFont">{osMap.XBOX}</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="os-windows"
                    className="border-white rounded-none"
                    checked={checkedOs["Windows"] || false}
                    onCheckedChange={(isChecked: boolean) => handleOsChange("Windows", isChecked)}
                  />
                  <label htmlFor="os-windows" className="font-primaryFont font-medium text-[13px]">
                    Windows
                  </label>
                  </div>
                  <div className="text-[13px] font-primaryFont">{osMap.WINDOWS}</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="os-playstation"
                    className="border-white rounded-none"
                    checked={checkedOs["Playstation"] || false}
                    onCheckedChange={(isChecked: boolean) =>
                      handleOsChange("Playstation", isChecked)
                    }
                  />
                  <label htmlFor="os-playstation" className="font-primaryFont font-medium text-[13px]">
                    Playstation
                  </label>
                  </div>
                  <div className="text-[13px] font-primaryFont">{osMap.PLAYSTATION} </div>
                </div>
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
                        id={`platform-${platform.id}`}
                        className="border-white rounded-none"
                        checked={checkedPlatforms[platform.id] || false}
                        onCheckedChange={(isChecked: boolean) =>
                          handlePlatformChange(platform.id, isChecked)
                        }
                      />
                      <label
                        htmlFor={`platform-${platform.id}`}
                        className="font-primaryFont font-medium text-[13px]"
                      >
                        {platform.name}
                      </label>
                    </div>
                    <div className="text-[13px] font-primaryFont">{platform.count}</div>
                  </div>
                ))}
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
                  <div className="flex items-center justify-between gap-2" key={brand.id}>
                    <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      className="border-white rounded-none"
                      checked={checkedBrands[brand.id] || false}
                      onCheckedChange={(isChecked: boolean) => handleBrandChange(brand.id, isChecked)}
                    />
                    <label htmlFor={`brand-${brand.id}`} className="font-primaryFont font-medium text-[13px]">
                      {brand.name}
                    </label>
                    </div>
                    <div className="text-[13px] font-primaryFont">{brand.count}</div>
                  </div>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="bg-[#BD0202] rounded-none px-6 mb-6 mr-2" onClick={handleClearAll}>
        Clear all
      </Button>
      <Button onClick={() => {
        setFilters(filterParams);
        console.log(filterParams);
      }} className="bg-[#BD0202] rounded-none px-6 mb-6">
        Filter
      </Button>
    </aside>
  );
};

export default Sidebar;

