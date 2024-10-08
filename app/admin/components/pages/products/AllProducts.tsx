import { AllProducts, columns } from "./all-products/columns";
import { DataTable } from "./all-products/data-table";

function getData(): AllProducts[] {
  // Fetch data synchronously or use a static array of data
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
      id: "728ed52f",
      name: "UFO 50",
      sku: "#w0342",
      stock: "In Stock",
      selling_price: "40s",
      regular_price: "60s",
      status: "Public",
      date: "23/05/2024",
    },

    // Add more static data if needed
  ];
}

export default function DemoPage() {
  const data = getData(); // No need for async/await here

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
