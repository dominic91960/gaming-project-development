import React, { ChangeEvent, useState } from "react";

import { AllProductsNew } from "./columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";

import ProductCategories from "../add-product/side-components/ProductCategories";
import BrandCategories from "../add-product/side-components/BrandCategories";
import TagsCategories from "../add-product/side-components/TagsCategories";
import PlatformCategories from "../add-product/side-components/PlatformCategories";
import ProductImages from "../add-product/side-components/ProductImages";
import SystemRequirements from "./System-Requirement";

const iconOptions = [
  { icon: <FaWindows />, label: "WINDOWS" },
  { icon: <FaXbox />, label: "XBOX" },
  { icon: <FaPlaystation />, label: "PLAYSTATION" },
];

const languageOptions = [
  { value: "English", label: "English" },
  {
    value: "Spanish (Spain)",
    label: "Spanish (Spain)",
  },
  {
    value: "Spanish (Latin America)",
    label: "Spanish (Latin America)",
  },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Italian", label: "Italian" },
  {
    value: "Portuguese (Portugal)",
    label: "Portuguese (Portugal)",
  },
  {
    value: "Portuguese (Brazilian)",
    label: "Portuguese (Brazilian)",
  },
  { value: "Russian", label: "Russian" },
  {
    value: "Chinese (Simplified)",
    label: "Chinese (Simplified)",
  },
  {
    value: "Chinese (Traditional)",
    label: "Chinese (Traditional)",
  },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
  { value: "Dutch", label: "Dutch" },
  { value: "Polish", label: "Polish" },
  { value: "Turkish", label: "Turkish" },
  { value: "Arabic", label: "Arabic" },
  { value: "Swedish", label: "Swedish" },
  { value: "Danish", label: "Danish" },
  { value: "Finnish", label: "Finnish" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Czech", label: "Czech" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Thai", label: "Thai" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Greek", label: "Greek" },
];

interface EditAllProductsPopupProps {
  product: AllProductsNew | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: AllProductsNew) => void;
  readOnly?: boolean; // New prop to control read-only mode
}

const EditAllProductsPopup: React.FC<EditAllProductsPopupProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  readOnly = false, // Default is false (editable)
}) => {
  const [editedProduct, setEditedProduct] = useState<AllProductsNew | null>(
    product
  );

  React.useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  if (!isOpen || !editedProduct) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const getLanguages = () => {
    const languages = editedProduct.language.split(", ");
    return languages;
  };

  const setLanguages = (languages: string[]) => {
    const languageString = languages.join(", ");
    setEditedProduct({
      ...editedProduct,
      language: languageString,
    });
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
    }
  };

  return (
    <form className="text-[9px] text-white px-[36px] grid lg:grid-cols-12 lg:gap-[3em] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
      {/* Main form area */}
      <div className="lg:col-span-8">
        {/* General data form*/}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">General Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          {/* Product name and display name */}
          <div className="grid grid-cols-2 gap-x-[2em] mb-[1.5em]">
            {/* Product name */}
            <div>
              <label className="block mb-[0.5em]">Product Name</label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                disabled={readOnly} // Makes field read-only if true
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
              />
            </div>
            {/* Display name */}
            <div>
              <label className="block mb-[0.5em]">Display Name</label>
              <input
                type="text"
                value={editedProduct.displayName}
                onChange={(e) => {
                  setEditedProduct({
                    ...editedProduct,
                    displayName: e.target.value,
                  });
                }}
                disabled={readOnly} // Makes field read-only if true
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
              />
            </div>
          </div>

          {/* About this game */}
          <div className="mb-[1.5em]">
            <label className="block mb-[0.5em]">About This Game</label>
            <textarea
              className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
              value={editedProduct.about}
              onChange={(e) => {
                setEditedProduct({
                  ...editedProduct,
                  about: e.target.value,
                });
              }}
              rows={4}
              disabled={readOnly} // Makes field read-only if true
            />
          </div>

          {/* Card description */}
          <div className="mb-[1.5em]">
            <label className="block mb-[0.5em]">Card Description</label>
            <input
              type="text"
              value={editedProduct.cardDescription}
              onChange={(e) => {
                setEditedProduct({
                  ...editedProduct,
                  cardDescription: e.target.value,
                });
              }}
              disabled={readOnly} // Makes field read-only if true
              className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            />
          </div>

          {/* Icon, language and release date */}
          <div className="grid 2xl:grid-cols-3 gap-[1.5em] mb-[1.5em]">
            <div>
              <label className="block mb-[0.5em]">Select Icon</label>
              <Select
                value={editedProduct.icon}
                onValueChange={(value: string) => {
                  setEditedProduct({
                    ...editedProduct,
                    icon: value,
                  });
                }}
                required
                disabled={readOnly} // Makes field read-only if true
              >
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Icon" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 border border-[#606060] text-white backdrop-blur-sm">
                  {iconOptions.map(({ icon, label }) => (
                    <SelectItem
                      key={label}
                      value={label}
                      className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                    >
                      <div className="flex items-center gap-x-[0.4em] lowercase">
                        {icon} <p className="capitalize">{label}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Release date */}
            <div>
              <label className="block mb-[0.5em]">Release Date</label>
              <input
                type="date"
                name="date"
                value={editedProduct.date}
                onChange={handleInputChange}
                disabled={readOnly} // Makes field read-only if true
                className="relative w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm z-10 after:content-[''] after:w-[5ch] after:h-full after:bg-[#00FFA1]/20 after:absolute after:top-0 after:right-0 after:-z-10"
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block mb-[0.5em]">Select Language</label>
            <MultiSelect
              options={languageOptions}
              onValueChange={setLanguages}
              defaultValue={getLanguages()}
              placeholder="Select Languages"
              variant="ghost"
              animation={1}
              maxCount={1}
              disabled={readOnly} // Makes field read-only if true
            />
          </div>
        </div>

        {/* Pricing data form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">Pricing Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          {/* Regular pice and selling price */}
          <div className="grid grid-cols-2 gap-x-[2em] mb-[1.5em]">
            {/* Regular price */}
            <div>
              <label className="block mb-[0.5em]">Regular Price ($)</label>
              <input
                type="text"
                name="regular_price"
                value={editedProduct.regular_price}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
                required
                disabled={readOnly} // Makes field read-only if true
              />
            </div>

            {/* Selling price */}
            <div>
              <label className="block mb-[0.5em]">Selling Price ($)</label>
              <input
                type="text"
                name="selling_price"
                value={editedProduct.selling_price}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
                required
                disabled={readOnly} // Makes field read-only if true
              />
            </div>
          </div>

          {/* Sale quantity and SKU */}
          <div className="grid grid-cols-2 gap-x-[2em] mb-[1.5em]">
            {/* Sale quantity */}
            <div>
              <label className="block mb-[0.5em]">Sale Quantity</label>
              <input
                type="text"
                value={editedProduct.saleQuantity}
                onChange={(e) => {
                  setEditedProduct({
                    ...editedProduct,
                    saleQuantity: Number(e.target.value),
                  });
                }}
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
                required
                disabled={readOnly} // Makes field read-only if true
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block mb-[0.5em]">SKU</label>
              <input
                type="text"
                name="sku"
                value={editedProduct.sku}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
                required
                disabled={readOnly} // Makes field read-only if true
              />
            </div>
          </div>

          {/* Stock status */}
          <div>
            <label className="block mb-[0.5em]">Stock status</label>
            <Select
              value={editedProduct.stockStatus}
              onValueChange={(value: string) => {
                setEditedProduct({
                  ...editedProduct,
                  stockStatus: value,
                });
              }}
              required
              disabled={readOnly} // Makes field read-only if true
            >
              <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-black/80 border border-[#606060] text-white backdrop-blur-sm">
                {["In Stock", "Out Of Stock", "On Backorder"].map(
                  (option, index) => (
                    <SelectItem
                      key={index}
                      value={
                        option === "In Stock"
                          ? "IN_STOCK"
                          : option === "Out Of Stock"
                          ? "OUT_OF_STOCK"
                          : "ON_BACKORDER"
                      }
                      className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                    >
                      {option}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product images form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">Product Images</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          <ProductImages
            coverImage={editedProduct.coverImage}
            setCoverImage={(url) => {
              setEditedProduct({
                ...editedProduct,
                coverImage: url,
              });
            }}
            videoUrl={editedProduct.videoUrl}
            setVideoUrl={(url) => {
              setEditedProduct({
                ...editedProduct,
                videoUrl: url,
              });
            }}
            galleryImages={editedProduct.galleryImages}
            setGalleryImages={(
              images: string[] | ((prevUrls: string[]) => string[])
            ) => {
              const updatedImages =
                typeof images === "function"
                  ? images(editedProduct.galleryImages)
                  : images;
              setEditedProduct({
                ...editedProduct,
                galleryImages: updatedImages,
              });
            }}
            latestImage={editedProduct.latestImage}
            setLatestImage={(url) => {
              setEditedProduct({
                ...editedProduct,
                latestImage: url,
              });
            }}
            cardImage={editedProduct.cardImage}
            setCardImage={(url) => {
              setEditedProduct({
                ...editedProduct,
                cardImage: url,
              });
            }}
            addToLatestGame={editedProduct.addToLatestGame}
            setAddToLatestGame={(value) => {
              setEditedProduct({
                ...editedProduct,
                addToLatestGame: value,
              });
            }}
            carousel={editedProduct.carousel}
            setCarousel={(value) => {
              setEditedProduct({
                ...editedProduct,
                carousel: value,
              });
            }}
            displayLatestGame={editedProduct.displayLatestGame}
            setDisplayLatestGame={(value) => {
              setEditedProduct({
                ...editedProduct,
                displayLatestGame: value,
              });
            }}
          />
        </div>

        {/* System requirements form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">
          System Requirements
        </h2>
        <div className="bg-black/40 px-[2.2em] pt-[1.8em] pb-[1em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md lg:pt-[1.5em] xl:mb-0">
          <SystemRequirements
            minimumOS={editedProduct.minimumOS}
            setMinimumOS={(value) => {
              setEditedProduct({
                ...editedProduct,
                minimumOS: value,
              });
            }}
            minimumCPU={editedProduct.minimumCPU}
            setMinimumCPU={(value) => {
              setEditedProduct({
                ...editedProduct,
                minimumCPU: value,
              });
            }}
            minimumRAM={editedProduct.minimumRAM}
            setMinimumRAM={(value) => {
              setEditedProduct({
                ...editedProduct,
                minimumRAM: value,
              });
            }}
            minimumStorage={editedProduct.minimumStorage}
            setMinimumStorage={(value) => {
              setEditedProduct({
                ...editedProduct,
                minimumStorage: value,
              });
            }}
            minimumGPU={editedProduct.minimumGPU}
            setMinimumGPU={(value) => {
              setEditedProduct({
                ...editedProduct,
                minimumGPU: value,
              });
            }}
            recommendedOS={editedProduct.recommendedOS}
            setRecommendedOS={(value) => {
              setEditedProduct({
                ...editedProduct,
                recommendedOS: value,
              });
            }}
            recommendedCPU={editedProduct.recommendedCPU}
            setRecommendedCPU={(value) => {
              setEditedProduct({
                ...editedProduct,
                recommendedCPU: value,
              });
            }}
            recommendedRAM={editedProduct.recommendedRAM}
            setRecommendedRAM={(value) => {
              setEditedProduct({
                ...editedProduct,
                recommendedRAM: value,
              });
            }}
            recommendedStorage={editedProduct.recommendedStorage}
            setRecommendedStorage={(value) => {
              setEditedProduct({
                ...editedProduct,
                recommendedStorage: value,
              });
            }}
            recommendedGPU={editedProduct.recommendedGPU}
            setRecommendedGPU={(value) => {
              setEditedProduct({
                ...editedProduct,
                recommendedGPU: value,
              });
            }}
          />
        </div>
      </div>

      {/* Dropdown area */}
      <div className="lg:col-span-4 lg:pt-[3.4em]">
        {/* Publish status */}
        <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          <label className="block mb-1">Status</label>
          <hr className="border-t-[#606060] mb-[0.6em]" />

          <Select
            name="status"
            value={editedProduct.status}
            onValueChange={(value: string) =>
              setEditedProduct((prev) => {
                if (!prev) return null;
                return { ...prev, status: value };
              })
            }
            required
            disabled={readOnly} // Makes field read-only if true
          >
            <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-black/80 border border-[#606060] text-white backdrop-blur-sm rounded-sm">
              {["Public", "Private", "Archived"].map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="mb-10">
            <ProductCategories
              categories={editedProduct.categories}
              setCategories={(categories) => {
                setEditedProduct({
                  ...editedProduct,
                  categories,
                });
              }}
              selectedCategories={editedProduct.categories}
              readOnly={readOnly} // Pass the readOnly prop
            />
          </div>

          <div className="mb-10">
            <BrandCategories
              brand={editedProduct.brand}
              setBrand={(brand) => {
                setEditedProduct({
                  ...editedProduct,
                  brand,
                });
              }}
              disabled={readOnly} // Pass the readOnly state here
            />
          </div>

          <div className="mb-10">
            <TagsCategories
              tagIds={editedProduct.tags}
              setTagIds={(tags) => {
                setEditedProduct({
                  ...editedProduct,
                  tags,
                });
              }}
              readOnly={readOnly} // Pass the readOnly prop
            />
          </div>

          <div className="mb-10">
            <PlatformCategories
              platform={editedProduct.platform}
              setPlatform={(platform) => {
                setEditedProduct({
                  ...editedProduct,
                  platform,
                });
              }}
              readOnly={readOnly} // Pass the readOnly prop here
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex flex-col gap-[1em]">
          <button
            type="button"
            className="w-full bg-[#00FFA1] font-semibold text-black text-[calc(1em+1px)] uppercase px-[2.4em] py-[0.5em] rounded-sm hover:opacity-90 transition-opacity duration-100"
            onClick={handleSave}
          >
            OK
          </button>
          <button
            type="button"
            className="w-full bg-[#EF4444] font-semibold text-white text-[calc(1em+1px)] uppercase px-[2.4em] py-[0.5em] rounded-sm hover:opacity-90 transition-opacity duration-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditAllProductsPopup;
