import { useEffect, useState } from "react";
import { AllProductsNew, columns } from "./all-products/columns";
import { DataTable } from "./all-products/data-table";
import AddProducts from "./all-products/AddProducts";
import EditAllProductsPopup from "./all-products/EditAllProductsPopup";
import { ColumnDef } from "@tanstack/react-table";
import axiosInstance from "@/axios/axiosInstance";
import { useSidebar } from "@/context/SidebarContext";
import { IoTrash } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

function getInitialData(): AllProductsNew[] {
  return [
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52f",
      name: "Wukong",
      sku: "#w0342",
      stock: "In Stock",
      selling_price: "$40",
      regular_price: "$60",
      status: "Public",
      date: "23/05/2024",
      displayName: "Wukong",
      about: "",
      cardDescription: "",
      language: "",
      icon: "",
      saleQuantity: 0,
      coverImage: "",
      galleryImages: [],
      latestImage: "",
      cardImage: "",
      videoUrl: "",
      addToLatestGame: false,
      carousel: false,
      displayLatestGame: false,
      platform: "",
      brand: "",
      minimumOS: "",
      minimumCPU: "",
      minimumRAM: "",
      minimumStorage: "",
      minimumGPU: "",
      recommendedOS: "",
      recommendedCPU: "",
      recommendedRAM: "",
      recommendedStorage: "",
      recommendedGPU: "",
      categories: [],
      tags: [],
    },
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52g",
      name: "UFO 50",
      sku: "#u0343",
      stock: "In Stock",
      selling_price: "$40",
      regular_price: "$60",
      status: "Public",
      date: "23/05/2024",
      displayName: "UFO 50",
      about: "",
      cardDescription: "",
      language: "",
      icon: "",
      saleQuantity: 0,
      coverImage: "",
      galleryImages: [],
      latestImage: "",
      cardImage: "",
      videoUrl: "",
      addToLatestGame: false,
      carousel: false,
      displayLatestGame: false,
      platform: "",
      brand: "",
      minimumOS: "",
      minimumCPU: "",
      minimumRAM: "",
      minimumStorage: "",
      minimumGPU: "",
      recommendedOS: "",
      recommendedCPU: "",
      recommendedRAM: "",
      recommendedStorage: "",
      recommendedGPU: "",
      categories: [],
      tags: [],
    },
  ];
}

export default function AllProducts() {
  const [products, setProducts] = useState<AllProductsNew[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AllProductsNew | null>(
    null
  );

  useEffect(() => {
    function mapGamesResponse(games: any[]): any[] {
      return games.map((game) => ({
        id: game.id,
        name: game.productName,
        displayName: game.displayName,
        about: game.aboutThisGame,
        cardDescription: game.cardDescription,
        language: game.languages?.[0] || "",
        date: game.releaseDate
          ? new Date(game.releaseDate).toISOString().split("T")[0]
          : "",
        icon: game.system || "",
        imageUrl: game.cardImage || "",
        sku: game.SKU || "",
        stock: game.stock?.toString() || "",
        selling_price: "$" + game.sellingPrice?.toString() || "",
        regular_price: "$" + game.regularPrice?.toString() || "",
        status: game.stockStatus || "",
        saleQuantity: game.stock || 0,
        coverImage: game.coverImage || "",
        galleryImages: game.screenshots || [],
        latestImage: game.latestImage || "",
        cardImage: game.cardImage || "",
        videoUrl: game.video || "",
        addToLatestGame: game.addToLatestGames || false,
        carousel: game.addToCarousel || false,
        displayLatestGame: game.displayInLatesGames || false,
        platform: game.platformId || "",
        brand: game.brandId || "",
        categories:
          game.gameCategories?.map(
            (cat: { category: { id: any } }) => cat.category.id
          ) || [],
        tags:
          game.tags?.map((tag: { tag: { id: any } }) => tag.tag.id) || [],
        minimumOS: game.minimumOS || "",
        minimumCPU: game.minimumCPU || "",
        minimumRAM: game.minimumRAM || "",
        minimumStorage: game.minimumStorage || "",
        minimumGPU: game.minimumGPU || "",
        recommendedOS: game.recommendedOS || "",
        recommendedCPU: game.recommendedCPU || "",
        recommendedRAM: game.recommendedRAM || "",
        recommendedStorage: game.recommendedStorage || "",
        recommendedGPU: game.recommendedGPU || "",
      }));
    }

    const getGames = async () => {
      const res = await axiosInstance("/games");
      const processedData = mapGamesResponse(res.data);
      setProducts(processedData);
    };

    getGames();
  }, []);

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleEditProduct = (product: AllProductsNew) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = async (updatedProduct: AllProductsNew) => {
    // setProducts((prevProducts) =>
    //   prevProducts.map((product) =>
    //     product.id === updatedProduct.id ? updatedProduct : product
    //   )
    // );
    console.log("update",updatedProduct);
    const data = {
      productName: updatedProduct.name,
      displayName: updatedProduct.displayName,
      aboutThisGame: updatedProduct.about,
      cardDescription: updatedProduct.cardDescription,
      system: updatedProduct.icon,
      languages: updatedProduct.language ? [updatedProduct.language] : [],
      releaseDate: new Date(updatedProduct.date).toISOString(),
      regularPrice: parseFloat(updatedProduct.regular_price.replace("$", "")),
      sellingPrice: parseFloat(updatedProduct.selling_price.replace("$", "")),
      stock: updatedProduct.saleQuantity,
      SKU: updatedProduct.sku,
      categoryIds: updatedProduct.categories,
      stockStatus:
      updatedProduct.stock === "In Stock" ? "IN_STOCK" : "OUT_OF_STOCK",
      minimumOS: updatedProduct.icon === "WINDOWS" ? updatedProduct.minimumOS : "",
      minimumCPU: updatedProduct.icon === "WINDOWS" ? updatedProduct.minimumCPU : "",
      minimumRAM: updatedProduct.icon === "WINDOWS" ? updatedProduct.minimumRAM : "",
      minimumGPU: updatedProduct.icon === "WINDOWS" ? updatedProduct.minimumGPU : "",
      minimumStorage:
      updatedProduct.icon === "WINDOWS" ? updatedProduct.minimumStorage : "",
      recommendedOS:
      updatedProduct.icon === "WINDOWS" ? updatedProduct.recommendedOS : "",
      recommendedCPU:
      updatedProduct.icon === "WINDOWS" ? updatedProduct.recommendedCPU : "",
      recommendedRAM:
      updatedProduct.icon === "WINDOWS" ? updatedProduct.recommendedRAM : "",
      recommendedGPU:
      updatedProduct.icon === "WINDOWS" ? updatedProduct.recommendedGPU : "",
      recommendedStorage:
      updatedProduct.icon === "WINDOWS" ? updatedProduct.recommendedStorage : "",
      coverImage: updatedProduct.coverImage,
      screenshots: updatedProduct.galleryImages,
      video: updatedProduct.videoUrl,
      cardImage: updatedProduct.cardImage,
      latestImage: updatedProduct.latestImage,
      addToLatestGames: updatedProduct.addToLatestGame,
      addToCarousel: updatedProduct.carousel,
      displayInLatesGames: updatedProduct.displayLatestGame,
      published: updatedProduct.status === "Public",
      tagIds: updatedProduct.tags,
      brandId: updatedProduct.brand,
      platformId: updatedProduct.platform,
    };
    const res = await axiosInstance.patch(`/games/${updatedProduct.id}`, data);
    console.log("res",res);
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const actionColumn: ColumnDef<AllProductsNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleEditProduct(row.original)}
        >
          <LuPencilLine />
        </button>
        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleDeleteProduct(row.original.id)}
        >
          <IoTrash />
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllProductsNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          {isEditModalOpen ? "Edit Product" : "All Products"}
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Products / All Products
        </p>
      </div>

      {!isEditModalOpen && (
        <DataTable columns={columnsWithActions} data={products} />
      )}

      <EditAllProductsPopup
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
