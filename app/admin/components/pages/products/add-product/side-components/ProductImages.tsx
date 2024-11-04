import { useState } from "react";

import { uploadImage } from "@/components/helper/uploadImage";
import { Checkbox } from "@/components/ui/checkbox";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  aspectRatio: string;
  setImageUrl: (url: string) => void;
  imageUrl?: string;
}

const ImageUpload = ({
  label,
  aspectRatio,
  setImageUrl,
  imageUrl,
}: ImageUploadProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(imageUrl || null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
      const fileType = file.type;
      const url = await uploadImage(file, fileType);
      setImageUrl(url);
    }
  };

  const [width, height] = aspectRatio.split(":").map(Number);
  const paddingBottom = (height / width) * 100 + "%";

  return (
    <div className="flex flex-col items-center">
      <label className="block my-[1em] text-[#D9D9D9]">{label}</label>
      <div className="relative w-full border border-dashed border-[#D9D9D9] rounded-sm">
        <div
          className="w-full relative overflow-hidden rounded-md"
          style={{ paddingBottom }}
        >
          {imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt="Uploaded"
                className="absolute top-0 left-0 object-cover w-full h-full"
                fill
              />
              <button
                className="absolute top-2 right-2 bg-black/40 text-white px-2 py-1 border rounded backdrop-blur-[2px] hover:opacity-85"
                onClick={() => {
                  setImageUrl("");
                  setImageSrc(null);
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:animate-pulse">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <CiImageOn className="text-[3em] text-[#D9D9D9] py-[0.1em]" />
              <span className="text-[#D9D9D9]">
                {aspectRatio.replace(":", " × ")}
              </span>
            </label>
          )}
        </div>
      </div>
      {imageSrc && (
        <label className="mt-[0.5em] text-[#0BDB45] cursor-pointer hover:opacity-85">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          Replace Image
        </label>
      )}
    </div>
  );
};

interface ProductImagesProps {
  coverImage: string;
  setCoverImage: (url: string) => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  galleryImages: string[];
  setGalleryImages: (
    urls: string[] | ((prevUrls: string[]) => string[])
  ) => void;
  latestImage: string;
  setLatestImage: (url: string) => void;
  cardImage: string;
  setCardImage: (url: string) => void;
  addToLatestGame: boolean;
  setAddToLatestGame: (value: boolean) => void;
  carousel: boolean;
  setCarousel: (value: boolean) => void;
  displayLatestGame: boolean;
  setDisplayLatestGame: (value: boolean) => void;
}

const ProductImages = ({
  coverImage,
  setCoverImage,
  videoUrl,
  setVideoUrl,
  galleryImages,
  setGalleryImages,
  latestImage,
  setLatestImage,
  cardImage,
  setCardImage,
  addToLatestGame,
  setAddToLatestGame,
  carousel,
  setCarousel,
  displayLatestGame,
  setDisplayLatestGame,
}: ProductImagesProps) => {
  console.log("ImageData", ImageData);
  return (
    <div>
      <div className="grid mb-[1.5em]">
        <ImageUpload
          label="Add Product Image"
          aspectRatio="1920:300"
          setImageUrl={setCoverImage}
          imageUrl={coverImage}
        />
        <div className="grid grid-cols-2 gap-x-[1em] mt-[1em] sm:grid-cols-3">
          <ImageUpload
            label="Add Image"
            aspectRatio="1920:1080"
            setImageUrl={setVideoUrl}
            imageUrl={videoUrl}
          />
          {[
            galleryImages[0] ?? 1,
            galleryImages[1] ?? 2,
            galleryImages[2] ?? 3,
            galleryImages[3] ?? 4,
          ].map((i, index) => (
            <ImageUpload
              key={index}
              label={`Add image`}
              aspectRatio="1920:1080"
              setImageUrl={(url) =>
                setGalleryImages((prev) => {
                  const newImages = prev.slice(); // Create a copy of the current array
                  newImages[index] = url; // Set or replace the image URL at the correct index
                  return newImages; // Return the updated array
                })
              }
              imageUrl={i}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-[1em] mt-[1.5em] sm:grid-cols-12">
          <div className="sm:col-span-4">
            <ImageUpload
              label="Add Card Image"
              aspectRatio="800:1080"
              setImageUrl={setCardImage}
              imageUrl={cardImage}
            />
          </div>
          <div className="sm:col-span-4">
            <ImageUpload
              label="Latest Image"
              aspectRatio="1080:1920"
              setImageUrl={setLatestImage}
              imageUrl={latestImage}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-[1em]">
        <div className="flex items-center gap-x-[0.5em]">
          <Checkbox
            id="add-to-latest"
            className="bg-transparent border-[#606060] rounded-[2px] data-[state=checked]:bg-inherit data-[state=checked]:text-[#00FFA1]"
            checked={addToLatestGame}
            onCheckedChange={(checked: boolean) => setAddToLatestGame(checked)}
          />
          <label
            htmlFor="add-to-latest"
            className="cursor-pointer capitalize select-none"
          >
            Add to Latest game
          </label>
        </div>

        <div className="flex items-center gap-x-[0.5em]">
          <Checkbox
            id="add-to-carousel"
            className="bg-transparent border-[#606060] rounded-[2px] data-[state=checked]:bg-inherit data-[state=checked]:text-[#00FFA1]"
            checked={carousel}
            onCheckedChange={(checked: boolean) => setCarousel(checked)}
          />
          <label
            htmlFor="add-to-carousel"
            className="cursor-pointer capitalize select-none"
          >
            Add to Carousel
          </label>
        </div>

        <div className="flex items-center gap-x-[0.5em]">
          <Checkbox
            id="display-latest-game"
            className="bg-transparent border-[#606060] rounded-[2px] data-[state=checked]:bg-inherit data-[state=checked]:text-[#00FFA1]"
            checked={displayLatestGame}
            onCheckedChange={(checked: boolean) =>
              setDisplayLatestGame(checked)
            }
          />
          <label
            htmlFor="display-latest-game"
            className="cursor-pointer capitalize select-none"
          >
            Display Latest game
          </label>
        </div>

        {/* <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={addToLatestGame}
            onChange={(e) => setAddToLatestGame(e.target.checked)}
          />
          Add to Latest game
        </label> */}

        {/* <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={carousel}
            onChange={(e) => setCarousel(e.target.checked)}
          />
          Carousel
        </label> */}

        {/* <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={displayLatestGame}
            onChange={(e) => setDisplayLatestGame(e.target.checked)}
          />
          Display Latest game
        </label> */}
      </div>
    </div>
  );
};

export default ProductImages;
