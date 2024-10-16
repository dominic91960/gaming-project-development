import { uploadImage } from "@/components/helper/uploadImage";
import { useState } from "react";

interface ImageUploadProps {
  label: string;
  aspectRatio: string;
  setImageUrl: (url: string) => void;
}

const ImageUpload = ({ label, aspectRatio, setImageUrl }: ImageUploadProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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
      <label className="block mb-2 text-sm text-gray-500">{label}</label>
      <div className="relative w-full border-2 border-dashed border-gray-500 rounded-md">
        <div
          className="w-full relative overflow-hidden rounded-md"
          style={{ paddingBottom }}
        >
          {imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt="Uploaded"
                className="absolute top-0 left-0 object-cover w-full h-full"
              />
              <button
                className="absolute top-2 right-2 bg-white text-gray-500 px-2 py-1 rounded text-xs"
                onClick={() => {
                  setImageUrl("");
                  setImageSrc(null);
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <span className="text-sm text-gray-500">
                {aspectRatio.replace(":", " × ")}
              </span>
            </label>
          )}
        </div>
      </div>
      {imageSrc && (
        <label className="mt-2 text-xs text-blue-500 cursor-pointer">
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
      <div className="grid gap-4 mb-6">
        <ImageUpload
          label="Add Product Image"
          aspectRatio="1920:300"
          setImageUrl={setCoverImage}
        />
        <div className="grid grid-cols-5 gap-4">
          <ImageUpload
            label="Add video"
            aspectRatio="1920:1080"
            setImageUrl={setVideoUrl}
          />
          {[1, 2, 3, 4].map((_, index) => (
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
            />
          ))}
        </div>
        <div className="grid grid-cols-6 gap-4">
          <ImageUpload
            label="Add Card Image"
            aspectRatio="800:1080"
            setImageUrl={setCardImage}
          />
          <ImageUpload
            label="Latest Image"
            aspectRatio="1080:1920"
            setImageUrl={setLatestImage}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={addToLatestGame}
            onChange={(e) => setAddToLatestGame(e.target.checked)}
          />{" "}
          Add to Latest game
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={carousel}
            onChange={(e) => setCarousel(e.target.checked)}
          />{" "}
          Carousel
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={displayLatestGame}
            onChange={(e) => setDisplayLatestGame(e.target.checked)}
          />{" "}
          Display Latest game
        </label>
      </div>
    </div>
  );
};

export default ProductImages;
