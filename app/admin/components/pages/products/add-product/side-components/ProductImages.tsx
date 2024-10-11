// import { useState } from "react";

// interface ImageUploadProps {
//   label: string;
//   aspectRatio: string; // Aspect ratio format like '1920:1080'
// }

// const ImageUpload = ({ label, aspectRatio }: ImageUploadProps) => {
//   const [imageSrc, setImageSrc] = useState<string | null>(null);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setImageSrc(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   // Convert aspect ratio to percentage padding
//   const [width, height] = aspectRatio.split(":").map(Number);
//   const paddingBottom = (height / width) * 100 + "%";

//   return (
//     <div className="flex flex-col items-center">
//       <label className="block mb-2 text-sm text-gray-500">{label}</label>
//       <div className="relative w-full border-2 border-dashed border-gray-500 rounded-md">
//         <div
//           className="w-full relative overflow-hidden rounded-md"
//           style={{ paddingBottom }}
//         >
//           {imageSrc ? (
//             <img
//               src={imageSrc}
//               alt="Uploaded"
//               className="absolute top-0 left-0 object-cover w-full h-full"
//             />
//           ) : (
//             <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
//               <input
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//               <span className="text-sm text-gray-500">
//                 {aspectRatio.replace(":", " × ")}
//               </span>
//             </label>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductImages = () => {
//   return (
//     <div className="p-6 bg-gray-900 text-white rounded-md">
//       <h2 className="text-lg font-semibold mb-4">Product Images</h2>
//       <div className="grid gap-4 mb-6">
//         <ImageUpload label="Add Product Image" aspectRatio="1920:300" />
//         <div className="grid grid-cols-5 gap-4">
//           <ImageUpload label="Add video" aspectRatio="1920:1080" />
//           {[1, 2, 3, 4].map((_, index) => (
//             <ImageUpload
//               key={index}
//               label={`Add image`}
//               aspectRatio="1920:1080"
//             />
//           ))}
//         </div>
//         <div className="grid grid-cols-6 gap-4">
//           <ImageUpload label="Add Card Image" aspectRatio="800:1080" />
//           <ImageUpload label="Latest Image" aspectRatio="1080:1920" />
//         </div>
//       </div>
//       <div className="flex gap-4">
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" /> Add to Latest game
//         </label>
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" /> Carousel
//         </label>
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" /> Display Latest game
//         </label>
//       </div>
//     </div>
//   );
// };

// export default ProductImages;

import { useState } from "react";

interface ImageUploadProps {
  label: string;
  aspectRatio: string; // Aspect ratio format like '1920:1080'
}

const ImageUpload = ({ label, aspectRatio }: ImageUploadProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Convert aspect ratio to percentage padding
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
                onClick={() => setImageSrc(null)}
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

const ProductImages = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-md">
      <h2 className="text-lg font-semibold mb-4">Product Images</h2>
      <div className="grid gap-4 mb-6">
        <ImageUpload label="Add Product Image" aspectRatio="1920:300" />
        <div className="grid grid-cols-5 gap-4">
          <ImageUpload label="Add video" aspectRatio="1920:1080" />
          {[1, 2, 3, 4].map((_, index) => (
            <ImageUpload
              key={index}
              label={`Add image`}
              aspectRatio="1920:1080"
            />
          ))}
        </div>
        <div className="grid grid-cols-6 gap-4">
          <ImageUpload label="Add Card Image" aspectRatio="800:1080" />
          <ImageUpload label="Latest Image" aspectRatio="1080:1920" />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Add to Latest game
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Carousel
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Display Latest game
        </label>
      </div>
    </div>
  );
};

export default ProductImages;
