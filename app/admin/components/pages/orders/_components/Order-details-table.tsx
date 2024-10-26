import { useState } from "react";
import { AllCustomersNew, columns } from "./columns";
import { DataTable } from "./data-table";

import { ColumnDef } from "@tanstack/react-table";

function getInitialData(): AllCustomersNew[] {
  return [
    {
      no: "1",
      imageUrl: "/images/sample-pic.png",
      id: "728ed52f",
      order_detail_name: "Call of Duty",
      order_detail_code: "#COD342",
      order_detail_regular_price: "$15",
      order_detail_quantity: "3",
      order_detail_total: "$45",
    },

    {
      no: "2",
      imageUrl: "/images/sample-pic.png",
      id: "728ed52g",
      order_detail_name: "battlefield 2042",
      order_detail_code: "#BTF127",
      order_detail_regular_price: "$18",
      order_detail_quantity: "2",
      order_detail_total: "$36",
    },
  ];
}

export default function Allcustomers() {
  const [customers, setcustomers] = useState<AllCustomersNew[]>(
    getInitialData()
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">All customers</h1>

      {/* Data Table */}
      <DataTable columns={columns} data={customers} />
    </div>
  );
}
