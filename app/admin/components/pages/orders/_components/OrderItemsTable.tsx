import React from "react";

interface OrderItem {
  productImage: string; // URL or path to the product image
  productName: string;
  productCode: string;
  regularPrice: string; // e.g., "$20"
  quantity: number;
  total: string; // e.g., "$40"
}

interface OrderItemsTableProps {
  items: OrderItem[]; // Prop to receive order items
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Product Image</th>
          <th className="border p-2">Product Name</th>
          <th className="border p-2">Product Code</th>
          <th className="border p-2">Regular Price</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="border p-2">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-16 h-16"
              />
            </td>
            <td className="border p-2">{item.productName}</td>
            <td className="border p-2">{item.productCode}</td>
            <td className="border p-2">{item.regularPrice}</td>
            <td className="border p-2">{item.quantity}</td>
            <td className="border p-2">{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderItemsTable;
