import React, { useState, useEffect } from "react";

import { Customers, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): Promise<Customers[]> {
  // Fetch data from your API here.
  return Promise.resolve([
    {
      name: "Steve Smith",
      id: "728ed52f",
      username: "steve123",
      country: "Australia",
      phone: 12345,
    },
    // ...
  ]);
}

export default function CustomersPage() {
  const [data, setData] = React.useState<Customers[]>([]);

  React.useEffect(() => {
    getData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
