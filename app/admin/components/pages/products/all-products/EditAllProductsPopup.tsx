import React, { ChangeEvent, useState } from "react";

import { AllProductsNew } from "./columns";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

import ProductCategories from "../add-product/side-components/ProductCategories";
import BrandCategories from "../add-product/side-components/BrandCategories";
import TagsCategories from "../add-product/side-components/TagsCategories";
import PlatformCategories from "../add-product/side-components/PlatformCategories";
import ProductImages from "../add-product/side-components/ProductImages";
import SystemRequirements from "./System-Requirement";

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

  const [platform, setPlatform] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  //image data inputs
  const [imageUrl, setImageUrl] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct({
          ...editedProduct,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
    }
  };

  return (
    <form className="text-[15px] text-white px-[36px] grid grid-cols-12 gap-[3em]">
      {/* Main form area */}
      <div className="col-span-9">
        {/* General data form*/}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">General Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] mb-[3.2em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
          {/* Product name and display name */}
          <div className="grid grid-cols-2 gap-x-[7.4em] mb-[1.5em]">
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
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
              />
            </div>
          </div>

          {/* About this game */}
          <div className="mb-[1.5em]">
            <label className="block mb-[0.5em]">About This Game</label>
            <textarea
              className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
              rows={4}
            />
          </div>

          {/* Card description */}
          <div className="mb-[1.5em]">
            <label className="block mb-[0.5em]">Card Description</label>
            <input
              type="text"
              className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            />
          </div>

          {/* Icon, language and release date */}
          <div className="grid grid-cols-3 gap-x-[7.4em]">
            {/* Icon */}
            <div>
              <label className="block mb-[0.5em]">Select Icon</label>
              <input
                type="text"
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block mb-[0.5em]">Select Language</label>
              <input
                type="text"
                className="w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
              />
            </div>

            {/* Release date */}
            <div>
              <label className="block mb-[0.5em]">Release Date</label>
              <input
                type="date"
                name="date"
                value={editedProduct.date}
                onChange={handleInputChange}
                className="relative w-full bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm z-10 after:content-[''] after:w-[5ch] after:h-full after:bg-white after:absolute after:top-0 after:right-0 after:-z-10"
              />
            </div>
          </div>
        </div>

        {/* Pricing data form */}
        <h2 className="font-bold text-[1.3em] mb-[1.15em]">Pricing Data</h2>
        <div className="bg-black/40 px-[2.2em] py-[3.3em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
          {/* Regular pice and selling price */}
          <div className="grid grid-cols-2 gap-x-[7.4em] mb-[1.5em]">
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
          <div className="grid grid-cols-2 gap-x-[7.4em] mb-[1.5em]">
            {/* Sale quantity */}
            <div>
              <label className="block mb-[0.5em]">Sale Quantity</label>
              <input
                type="text"
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
            <select
              name="stock"
              value={editedProduct.stock}
              onChange={handleInputChange}
              className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
            >
              {["In Stock", "Out Of Stock", "On Backorder"].map((option) => (
                <option key={option} value={option} className="bg-black">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image upload */}
        <div>
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
      <div className="col-span-3 pt-[3.4em]">
        {/* Publish status */}
        <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
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
              categories={categories}
              setCategories={setCategories}
            />
          </div>

          <div className="mb-10">
            <BrandCategories brand={brand} setBrand={setBrand} />
          </div>

          <div className="mb-10">
            <TagsCategories tagIds={tags} setTagIds={setTags} />
          </div>

          <div className="mb-10">
            <PlatformCategories platform={platform} setPlatform={setPlatform} />
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

{
  /* <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          />
          <input
            type="text"
            name="sku"
            value={editedProduct.sku}
            onChange={handleInputChange}
            placeholder="SKU"
            className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          />
          <input
            type="text"
            name="stock"
            value={editedProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          />
          <input
            type="text"
            name="selling_price"
            value={editedProduct.selling_price}
            onChange={handleInputChange}
            placeholder="Selling Price"
            className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          />
          <input
            type="text"
            name="regular_price"
            value={editedProduct.regular_price}
            onChange={handleInputChange}
            placeholder="Regular Price"
            className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          />
          <select
            name="status"
            value={editedProduct.status}
            onChange={handleInputChange}
            className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Archived">Archived</option>
          </select>
          <input
            type="date"
            name="date"
            value={editedProduct.date}
            onChange={handleInputChange}
            className="bg-transparent px-[1em] py-[0.5em] text-white border border-[#606060] rounded-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-4 p-2"
          /> */
}
