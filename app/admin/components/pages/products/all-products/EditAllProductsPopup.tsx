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
import { IoLanguageOutline } from "react-icons/io5";

import ProductCategories from "../add-product/side-components/ProductCategories";
import BrandCategories from "../add-product/side-components/BrandCategories";
import TagsCategories from "../add-product/side-components/TagsCategories";
import PlatformCategories from "../add-product/side-components/PlatformCategories";
import ProductImages from "../add-product/side-components/ProductImages";
import SystemRequirements from "./System-Requirement";
import { set } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconOptions = [
  { icon: <FaWindows />, label: "Windows" },
  { icon: <FaXbox />, label: "Xbox" },
  { icon: <FaPlaystation />, label: "Playstation" },
];

const languageOptions = [
  { value: "English", label: "English", icon: IoLanguageOutline },
  {
    value: "Spanish (Spain)",
    label: "Spanish (Spain)",
    icon: IoLanguageOutline,
  },
  {
    value: "Spanish (Latin America)",
    label: "Spanish (Latin America)",
    icon: IoLanguageOutline,
  },
  { value: "French", label: "French", icon: IoLanguageOutline },
  { value: "German", label: "German", icon: IoLanguageOutline },
  { value: "Italian", label: "Italian", icon: IoLanguageOutline },
  {
    value: "Portuguese (Portugal)",
    label: "Portuguese (Portugal)",
    icon: IoLanguageOutline,
  },
  {
    value: "Portuguese (Brazilian)",
    label: "Portuguese (Brazilian)",
    icon: IoLanguageOutline,
  },
  { value: "Russian", label: "Russian", icon: IoLanguageOutline },
  {
    value: "Chinese (Simplified)",
    label: "Chinese (Simplified)",
    icon: IoLanguageOutline,
  },
  {
    value: "Chinese (Traditional)",
    label: "Chinese (Traditional)",
    icon: IoLanguageOutline,
  },
  { value: "Japanese", label: "Japanese", icon: IoLanguageOutline },
  { value: "Korean", label: "Korean", icon: IoLanguageOutline },
  { value: "Dutch", label: "Dutch", icon: IoLanguageOutline },
  { value: "Polish", label: "Polish", icon: IoLanguageOutline },
  { value: "Turkish", label: "Turkish", icon: IoLanguageOutline },
  { value: "Arabic", label: "Arabic", icon: IoLanguageOutline },
  { value: "Swedish", label: "Swedish", icon: IoLanguageOutline },
  { value: "Danish", label: "Danish", icon: IoLanguageOutline },
  { value: "Finnish", label: "Finnish", icon: IoLanguageOutline },
  { value: "Norwegian", label: "Norwegian", icon: IoLanguageOutline },
  { value: "Czech", label: "Czech", icon: IoLanguageOutline },
  { value: "Hungarian", label: "Hungarian", icon: IoLanguageOutline },
  { value: "Thai", label: "Thai", icon: IoLanguageOutline },
  { value: "Indonesian", label: "Indonesian", icon: IoLanguageOutline },
  { value: "Vietnamese", label: "Vietnamese", icon: IoLanguageOutline },
  { value: "Greek", label: "Greek", icon: IoLanguageOutline },
];

interface EditAllProductsPopupProps {
  product: AllProductsNew | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: AllProductsNew) => void;
}

const EditAllProductsPopup: React.FC<EditAllProductsPopupProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] =
    React.useState<AllProductsNew | null>(product);

    const languageOptions = [
      "English",
      "Spanish (Spain)",
      "Spanish (Latin America)",
      "French",
      "German",
      "Italian",
      "Portuguese (Portugal)",
      "Portuguese (Brazilian)",
      "Russian",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Japanese",
      "Korean",
      "Dutch",
      "Polish",
      "Turkish",
      "Arabic",
      "Swedish",
      "Danish",
      "Finnish",
      "Norwegian",
      "Czech",
      "Hungarian",
      "Thai",
      "Indonesian",
      "Vietnamese",
      "Greek",
    ];

  const [platform, setPlatform] = useState(product?.platform || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [categories, setCategories] = useState<string[]>(product?.categories || []);
  const [tags, setTags] = useState<string[]>(product?.tags || []);

  //image data inputs
  const [imageUrl, setImageUrl] = useState("");
  const [coverImage, setCoverImage] = useState(product?.coverImage || "");
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl || "");
  const [galleryImages, setGalleryImages] = useState<string[]>(product?.galleryImages || []);
  const [cardImage, setCardImage] = useState(product?.cardImage || "");
  const [latestImage, setLatestImage] = useState(product?.latestImage || "");
  const [addToLatestGame, setAddToLatestGame] = useState(product?.addToLatestGame || false);
  const [carousel, setCarousel] = useState(product?.carousel || false);
  const [displayLatestGame, setDisplayLatestGame] = useState(product?.displayLatestGame || false);

  // system requirements
  const [minimumOS, setMinimumOS] = useState(product?.minimumOS || "");
  const [minimumCPU, setMinimumCPU] = useState(product?.minimumCPU || "");
  const [minimumRAM, setMinimumRAM] = useState(product?.minimumRAM || "");
  const [minimumStorage, setMinimumStorage] = useState(product?.minimumStorage || "");
  const [minimumGPU, setMinimumGPU] = useState(product?.minimumGPU || "");
  const [recommendedOS, setRecommendedOS] = useState(product?.recommendedOS || "");
  const [recommendedCPU, setRecommendedCPU] = useState(product?.recommendedCPU || "");
  const [recommendedRAM, setRecommendedRAM] = useState(product?.recommendedRAM || "");
  const [recommendedStorage, setRecommendedStorage] = useState(product?.recommendedStorage || "");
  const [recommendedGPU, setRecommendedGPU] = useState(product?.recommendedGPU || "");

  React.useEffect(() => {
    console.log("product", product);
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

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setEditedProduct({
  //         ...editedProduct,
  //         imageUrl: reader.result as string,
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
      console.log("editedProduct", editedProduct);
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
              onChange={(e)=> {
                setEditedProduct({
                  ...editedProduct,
                  about: e.target.value,
                });
              }
              }
              rows={4}
            />
          </div>

          {/* Card description */}
          <div className="mb-[1.5em]">
            <label className="block mb-[0.5em]">Card Description</label>
            <input
              type="text"
              value={editedProduct.cardDescription}
              onChange={(e)=>{
                setEditedProduct({
                  ...editedProduct,
                  cardDescription: e.target.value,
                });
              }}
              className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            />
          </div>

          {/* Icon, language and release date */}
          <div className="grid 2xl:grid-cols-3 gap-[1.5em]">
            <div>
          <label className="block mb-[0.5em]">Select Icon</label>
          <Select
            value={editedProduct.icon}
            onValueChange={
              (value: string) => {
                setEditedProduct({
                  ...editedProduct,
                  icon: value,
                });
            
            }
            }
            required
          >
            <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
              <SelectValue placeholder="Select Icon" />
            </SelectTrigger>
            <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
              {["WINDOWS", "PLAYSTATION", "XBOX"].map((option) => (
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
            {/* Language */}
            <div>
          <label className="block mb-[0.5em]">Select Language</label>
          <Select
            value={editedProduct.language}
            onValueChange={
              (value: string) => {
                setEditedProduct({
                  ...editedProduct,
                  language: value,
            })
            }

            }

            required
          >
            <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
              {languageOptions.map((option) => (
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

            {/* Release date */}
            <div>
              <label className="block mb-[0.5em]">Release Date</label>
              <input
                type="date"
                name="date"
                value={editedProduct.date}
                onChange={handleInputChange}
                className="relative w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm z-10 after:content-[''] after:w-[5ch] after:h-full after:bg-[#00FFA1]/20 after:absolute after:top-0 after:right-0 after:-z-10"
              />
            </div>
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
                onChange={(e)=>{
                  setEditedProduct({
                    ...editedProduct,
                    saleQuantity: Number(e.target.value),
                  });
                }
                }
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
                required
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
              />
            </div>
          </div>

          {/* Stock status */}
          <div>
            <label className="block mb-[0.5em]">Stock status</label>
            <Select
              // value={stock}
              // onValueChange={(value: string) => setStock(value)}
              required
            >
              <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-md">
                {["In Stock", "Out Of Stock", "On Backorder"].map((option) => (
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
          setGalleryImages={(images: string[] | ((prevUrls: string[]) => string[])) => {
            const updatedImages = typeof images === 'function' ? images(editedProduct.galleryImages) : images;
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
          <select
            name="status"
            value={editedProduct.status}
            onChange={handleInputChange}
            className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          >
            {["Public", "Private", "Archived"].map((option) => (
              <option key={option} value={option} className="bg-black">
                {option}
              </option>
            ))}
          </select>
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
              }
              }
              selectedCategories={editedProduct.categories}
            />
          </div>

          <div className="mb-10">
            <BrandCategories brand={editedProduct.brand} setBrand={
              (brand) => {
                setEditedProduct({
                  ...editedProduct,
                  brand,
                });
              }
            } />
          </div>

          <div className="mb-10">
            <TagsCategories tagIds={editedProduct.tags} setTagIds={
              (tags) => {
                setEditedProduct({
                  ...editedProduct,
                  tags,
                });
              }
            } />
          </div>

          <div className="mb-10">
            <PlatformCategories platform={editedProduct.platform} setPlatform={
              (platform) => {
                setEditedProduct({
                  ...editedProduct,
                  platform,
                });
              }
            } />
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

