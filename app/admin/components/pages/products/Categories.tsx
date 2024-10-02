import { Payment, columns } from "./categories/columns";
import { DataTable } from "./categories/data-table";

function getData(): Payment[] {
  // Fetch data synchronously or use a static array of data
  return [
    {
      id: "728ed52f",
      name: "Steve",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Jason",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Mark",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Smith",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Ricky",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Maz",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Mark",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Smith",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Ricky",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Maz",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Mark",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Smith",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Ricky",
      description: "description 1 here",
    },

    {
      id: "728ed52f",
      name: "Maz",
      description: "description 1 here",
    },
    {
      id: "728ed52f",
      name: "Mark",
      description: "description 1 here",
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
