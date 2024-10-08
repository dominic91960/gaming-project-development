import { useState } from "react";
import { AllProductsNew, columns } from "./all-products/columns";
import { DataTable } from "./all-products/data-table";
import AddProducts from "./all-products/AddProducts";

// Initial data function
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
    },
  ];
}

export default function AllProducts() {
  const [products, setProducts] = useState<AllProductsNew[]>(getInitialData());

  // Function to add a new product
  const handleAddProduct = (newProduct: AllProductsNew) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* Add Products Component */}
      <AddProducts onAddProduct={handleAddProduct} />

      {/* Data Table */}
      <DataTable columns={columns} data={products} />
    </div>
  );
}
