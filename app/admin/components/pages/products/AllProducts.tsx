import { useState } from "react";
import { AllProductsNew, columns } from "./all-products/columns";
import { DataTable } from "./all-products/data-table";
import AddProducts from "./all-products/AddProducts";
import EditAllProductsPopup from "./all-products/EditAllProductsPopup";
import { ColumnDef } from "@tanstack/react-table";
import axiosInstance from "@/axios/axiosInstance";

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
      brand: ""
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
      brand: ""
    },
  ];
}

export default function AllProducts() {
  const [products, setProducts] = useState<AllProductsNew[]>(getInitialData());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AllProductsNew | null>(
    null
  );

  const handleAddProduct = async (newProduct: AllProductsNew) => {
    console.log("ffgfgf", newProduct);
    setProducts((prevProducts) => [...prevProducts, newProduct]);
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
      stock: parseInt(newProduct.stock),
      SKU: newProduct.sku,
      stockStatus: newProduct.stock === "In Stock" ? "IN_STOCK" : "OUT_OF_STOCK",
      minimumOS: "",
      minimumCPU: "",
      minimumRAM: "",
      minimumGPU: "",
      minimumStorage: "",
      recommendedOS: "",
      recommendedCPU: "",
      recommendedRAM: "",
      recommendedGPU: "",
      recommendedStorage: "",
      coverImage: newProduct.coverImage,
      screenshots: newProduct.galleryImages,
      video: newProduct.videoUrl,
      cardImage: newProduct.cardImage,
      labelImage: newProduct.icon,
      addToLatestGames: newProduct.addToLatestGame,
      addToCarousel: newProduct.carousel,
      displayInLatesGames: newProduct.displayLatestGame,
      published: newProduct.status === "Public",
      categoryIds: [],
      tagIds: [],
      brandId: newProduct.brand,
      platformId: newProduct.platform,
    };

    await axiosInstance.post("/games", data);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleEditProduct = (product: AllProductsNew) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: AllProductsNew) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const actionColumn: ColumnDef<AllProductsNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteProduct(row.original.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditProduct(row.original)}
        >
          Edit
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllProductsNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-[2px] text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Products
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Products / All Products
        </p>
      </div>

      {/* Add Products Component */}
      <AddProducts onAddProduct={handleAddProduct} />

      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={products} />

      {/* Edit Product Modal */}
      <EditAllProductsPopup
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
