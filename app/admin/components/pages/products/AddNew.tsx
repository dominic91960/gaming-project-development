import axiosInstance from "@/axios/axiosInstance";
import AddProducts from "./all-products/AddProducts";
import { AllProductsNew } from "./all-products/columns";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSidebar } from "@/context/SidebarContext";

const AddNew = () => {
  const { setSelectedItem } = useSidebar();
  // function getInitialData(): AllProductsNew[] {
  //   return [
  //     {
  //       imageUrl: "/images/sample-pic.png",
  //       id: "728ed52f",
  //       name: "Wukong",
  //       sku: "#w0342",
  //       stock: "In Stock",
  //       selling_price: "$40",
  //       regular_price: "$60",
  //       status: "Public",
  //       date: "23/05/2024",
  //       displayName: "Wukong",
  //       about: "",
  //       cardDescription: "",
  //       language: [],
  //       icon: "",
  //       saleQuantity: 0,
  //       coverImage: "",
  //       galleryImages: [],
  //       latestImage: "",
  //       cardImage: "",
  //       videoUrl: "",
  //       addToLatestGame: false,
  //       carousel: false,
  //       displayLatestGame: false,
  //       platform: "",
  //       brand: "",
  //       minimumOS: "",
  //       minimumCPU: "",
  //       minimumRAM: "",
  //       minimumStorage: "",
  //       minimumGPU: "",
  //       recommendedOS: "",
  //       recommendedCPU: "",
  //       recommendedRAM: "",
  //       recommendedStorage: "",
  //       recommendedGPU: "",
  //       categories: [],
  //       tags: [],
  //     },
  //     {
  //       imageUrl: "/images/sample-pic.png",
  //       id: "728ed52g",
  //       name: "UFO 50",
  //       sku: "#u0343",
  //       stock: "In Stock",
  //       selling_price: "$40",
  //       regular_price: "$60",
  //       status: "Public",
  //       date: "23/05/2024",
  //       displayName: "UFO 50",
  //       about: "",
  //       cardDescription: "",
  //       language: [],
  //       icon: "",
  //       saleQuantity: 0,
  //       coverImage: "",
  //       galleryImages: [],
  //       latestImage: "",
  //       cardImage: "",
  //       videoUrl: "",
  //       addToLatestGame: false,
  //       carousel: false,
  //       displayLatestGame: false,
  //       platform: "",
  //       brand: "",
  //       minimumOS: "",
  //       minimumCPU: "",
  //       minimumRAM: "",
  //       minimumStorage: "",
  //       minimumGPU: "",
  //       recommendedOS: "",
  //       recommendedCPU: "",
  //       recommendedRAM: "",
  //       recommendedStorage: "",
  //       recommendedGPU: "",
  //       categories: [],
  //       tags: [],
  //     },
  //   ];
  // }

  const [products, setProducts] = useState<AllProductsNew[]>();

  const handleAddProduct = async (newProduct: AllProductsNew) => {
    // console.log("ffgfgf", newProduct);
    // setProducts((prevProducts) => [...prevProducts, newProduct]);
    const data = {
      productName: newProduct.name,
      displayName: newProduct.displayName,
      aboutThisGame: newProduct.about,
      cardDescription: newProduct.cardDescription,
      system: newProduct.icon,
      languages: newProduct.language ? [newProduct.language] : [],
      releaseDate: new Date(newProduct.date).toISOString(),
      regularPrice: parseFloat(newProduct.regular_price.replace("$", "")),
      sellingPrice: parseFloat(newProduct.selling_price.replace("$", "")),
      stock: newProduct.saleQuantity,
      SKU: newProduct.sku,
      categoryIds: newProduct.categories,
      stockStatus:
        newProduct.stock === "In Stock" ? "IN_STOCK" : "OUT_OF_STOCK",
      minimumOS: newProduct.icon === "WINDOWS" ? newProduct.minimumOS : "",
      minimumCPU: newProduct.icon === "WINDOWS" ? newProduct.minimumCPU : "",
      minimumRAM: newProduct.icon === "WINDOWS" ? newProduct.minimumRAM : "",
      minimumGPU: newProduct.icon === "WINDOWS" ? newProduct.minimumGPU : "",
      minimumStorage:
        newProduct.icon === "WINDOWS" ? newProduct.minimumStorage : "",
      recommendedOS:
        newProduct.icon === "WINDOWS" ? newProduct.recommendedOS : "",
      recommendedCPU:
        newProduct.icon === "WINDOWS" ? newProduct.recommendedCPU : "",
      recommendedRAM:
        newProduct.icon === "WINDOWS" ? newProduct.recommendedRAM : "",
      recommendedGPU:
        newProduct.icon === "WINDOWS" ? newProduct.recommendedGPU : "",
      recommendedStorage:
        newProduct.icon === "WINDOWS" ? newProduct.recommendedStorage : "",
      coverImage: newProduct.coverImage,
      screenshots: newProduct.galleryImages,
      video: newProduct.videoUrl,
      cardImage: newProduct.cardImage,
      latestImage: newProduct.latestImage,
      addToLatestGames: newProduct.addToLatestGame,
      addToCarousel: newProduct.carousel,
      displayInLatesGames: newProduct.displayLatestGame,
      published: newProduct.status === "Public",
      tagIds: newProduct.tags,
      brandId: newProduct.brand,
      platformId: newProduct.platform,
    };

    try {
      const res = await axiosInstance.post("/games", data);
      if (res.status === 201) {
        console.log("Product added successfully");
        toast.success("Product added successfully");
        setSelectedItem("all-products");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };
  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          Add Product
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Products / Add Product
        </p>
      </div>

      {/* Add Products Component */}
      <AddProducts onAddProduct={handleAddProduct} />
    </div>
  );
};

export default AddNew;
