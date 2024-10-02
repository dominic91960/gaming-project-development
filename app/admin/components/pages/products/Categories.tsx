import { useState } from "react";
import { Payment, columns } from "./categories/columns";
import { DataTable } from "./categories/data-table";

// Example data
function getData(): Payment[] {
  return [
    { id: "1", name: "Steve", description: "description 1 here" },
    { id: "2", name: "Jason", description: "description 2 here" },
    { id: "3", name: "Mark", description: "description 3 here" },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>(getData());

  // Function to handle deleting a row by its ID
  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} onDelete={handleDelete} />
    </div>
  );
}
