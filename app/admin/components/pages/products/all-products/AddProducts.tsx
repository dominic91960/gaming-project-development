import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllProductsNew } from "../all-products/columns";
import GeneralDataForm from "./GeneralDataForm";
import PricingDataForm from "./PricingDataForm";
import BrandCategories from "../add-product/side-components/BrandCategories";
import TagsCategories from "../add-product/side-components/TagsCategories";
import PlatformCategories from "../add-product/side-components/PlatformCategories";
import ProductCategories from "../add-product/side-components/ProductCategories";
import ProductImages from "../add-product/side-components/ProductImages";
import SystemRequirements from "./System-Requirement";

interface AddProductsProps {
  onAddProduct: (newProduct: AllProductsNew) => void;
}

export default function AddProducts({ onAddProduct }: AddProductsProps) {
  // GeneralDataForm input states
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [language, setLanguage] = useState<string[]>([]);
  const [date, setDate] = useState("");

  // PricingDataForm input states
  const [regularPrice, setRegularPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [saleQuantity, setSaleQuantity] = useState(0);
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");

  //image data inputs
  const [imageUrl, setImageUrl] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>(["","","","",""]);
  const [cardImage, setCardImage] = useState("");
  const [latestImage, setLatestImage] = useState("");
  const [addToLatestGame, setAddToLatestGame] = useState(false);
  const [carousel, setCarousel] = useState(false);
  const [displayLatestGame, setDisplayLatestGame] = useState(false);

  // system requirements
  const [minimumOS, setMinimumOS] = useState("");
  const [minimumCPU, setMinimumCPU] = useState("");
  const [minimumRAM, setMinimumRAM] = useState("");
  const [minimumStorage, setMinimumStorage] = useState("");
  const [minimumGPU, setMinimumGPU] = useState("");
  const [recommendedOS, setRecommendedOS] = useState("");
  const [recommendedCPU, setRecommendedCPU] = useState("");
  const [recommendedRAM, setRecommendedRAM] = useState("");
  const [recommendedStorage, setRecommendedStorage] = useState("");
  const [recommendedGPU, setRecommendedGPU] = useState("");

  // Other states
  const [status, setStatus] = useState("Public"); // Initialize with a valid Platforms value if needed
  const [platform, setPlatform] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: AllProductsNew = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl,
      name,
      sku,
      stock,
      selling_price: sellingPrice,
      regular_price: regularPrice,
      status,
      date,
      displayName,
      about,
      cardDescription,
      icon,
      language: language.join(", "),
      saleQuantity,
      coverImage,
      videoUrl,
      galleryImages,
      latestImage,
      cardImage,
      addToLatestGame,
      carousel,
      displayLatestGame,
      platform,
      brand,
      categories,
      tags,
      minimumOS,
      minimumCPU,
      minimumRAM,
      minimumStorage,
      minimumGPU,
      recommendedOS,
      recommendedCPU,
      recommendedRAM,
      recommendedStorage,
      recommendedGPU,
      stockStatus: "",
    };

    console.log(newProduct, "newProduct");
    onAddProduct(newProduct);

    // Clear form fields if needed
    /* setName("");
    setDisplayName("");
    setAbout("");
    setCardDescription("");
    setIcon("");
    setLanguage("");
    setSku("");
    setStock("");
    setSellingPrice("");
    setRegularPrice("");
    setStatus("Public");
    setDate("");
    setImageUrl(""); */
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-[9px] text-white px-[36px] grid lg:grid-cols-12 lg:gap-[3em] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
    >
      {/* Main form area */}
      <div className="lg:col-span-8">
        {/* General data form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">General Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          <GeneralDataForm
            name={name}
            setName={setName}
            displayName={displayName}
            setDisplayName={setDisplayName}
            about={about}
            setAbout={setAbout}
            cardDescription={cardDescription}
            setCardDescription={setCardDescription}
            icon={icon}
            setIcon={setIcon}
            language={language}
            setLanguage={setLanguage}
            date={date}
            setDate={setDate}
          />
        </div>

        {/* Pricing data form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">Pricing Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          <PricingDataForm
            regularPrice={regularPrice}
            setRegularPrice={setRegularPrice}
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}
            sku={sku}
            setSku={setSku}
            stock={stock}
            setStock={setStock}
            saleQuantity={saleQuantity}
            setSaleQuantity={setSaleQuantity}
          />
        </div>

        {/* Product images form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">Product Images</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          <ProductImages
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            latestImage={latestImage}
            setLatestImage={setLatestImage}
            cardImage={cardImage}
            setCardImage={setCardImage}
            addToLatestGame={addToLatestGame}
            setAddToLatestGame={setAddToLatestGame}
            carousel={carousel}
            setCarousel={setCarousel}
            displayLatestGame={displayLatestGame}
            setDisplayLatestGame={setDisplayLatestGame}
          />
        </div>

        {/* System requirements form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">
          System Requirements
        </h2>
        <div className="bg-black/40 px-[2.2em] pt-[1.8em] pb-[1em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-md lg:pt-[1.5em] xl:mb-0">
          <SystemRequirements
            minimumOS={minimumOS}
            setMinimumOS={setMinimumOS}
            minimumCPU={minimumCPU}
            setMinimumCPU={setMinimumCPU}
            minimumRAM={minimumRAM}
            setMinimumRAM={setMinimumRAM}
            minimumStorage={minimumStorage}
            setMinimumStorage={setMinimumStorage}
            minimumGPU={minimumGPU}
            setMinimumGPU={setMinimumGPU}
            recommendedOS={recommendedOS}
            setRecommendedOS={setRecommendedOS}
            recommendedCPU={recommendedCPU}
            setRecommendedCPU={setRecommendedCPU}
            recommendedRAM={recommendedRAM}
            setRecommendedRAM={setRecommendedRAM}
            recommendedStorage={recommendedStorage}
            setRecommendedStorage={setRecommendedStorage}
            recommendedGPU={recommendedGPU}
            setRecommendedGPU={setRecommendedGPU}
          />
        </div>
      </div>

      {/* Dropdown area */}
      <div className="lg:col-span-4 lg:pt-[3.4em]">
        {/* Publish status */}
        <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-md">
          <label className="block mb-[0.1em] text-[1.2em]">Publish</label>
          <hr className="border-t-[#606060] mb-[0.6em]" />
          <Select
            value={status}
            onValueChange={(value: string) => setStatus(value)}
            required
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

        {/* Categories */}
        <ProductCategories
          categories={categories}
          setCategories={setCategories}
        />

        {/* Brands */}
        <BrandCategories brand={brand} setBrand={setBrand} />

        {/* Tags */}
        <TagsCategories tagIds={tags} setTagIds={setTags} />

        {/* Platforms */}
        <PlatformCategories platform={platform} setPlatform={setPlatform} />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#00FFA1] font-semibold text-black text-[calc(1em+1px)] uppercase px-[2.4em] py-[0.5em] rounded-sm hover:opacity-90 transition-opacity duration-100 mb-12"
        >
          Add product
        </button>
      </div>
    </form>
  );
}
