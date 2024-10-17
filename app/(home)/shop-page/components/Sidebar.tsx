"use client";
import React from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { IoIosStar } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StarRating from "./StarRating";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRating = (rating: number) => {
    console.log(`User rated: ${rating} stars`);
    // You can add logic to save the rating to a database or state here.
  };
  return (
    <aside className="w-1/4 bg-gray-800 text-white p-4 font-semibold">
      {/* Genres starts here */}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">
              Genres
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Single Player
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Action
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Role-playing
                    </label>
                  </div>
                  <p className="font-primaryFont font-normal text-[13px] leading-none">
                    134
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="terms"
                      className="border-white rounded-none"
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Adventure
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Multiplayer
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sports
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

      {/* Ratingstarts here */}

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
            <h2 className="text-[20px] font-semibold font-primaryFont">
              Platforms
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Steam
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Xbox Live
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Origin
                    </label>
                  </div>
                  <p className="font-primaryFont font-normal text-[13px] leading-none">
                    134
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="terms"
                      className="border-white rounded-none"
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      GOG.com
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ubisoft Connect
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Epic Games
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

      {/* Brands starts here */}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-[20px] font-semibold font-primaryFont">
              Brand
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nintendo
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ubisoft
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Electronic Arts
                    </label>
                  </div>
                  <p className="font-primaryFont font-normal text-[13px] leading-none">
                    134
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="terms"
                      className="border-white rounded-none"
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Microsoft
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sony
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
                    />
                    <label
                      htmlFor="terms"
                      className="font-primaryFont font-medium text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      2K
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
    </aside>
  );
};

export default Sidebar;
