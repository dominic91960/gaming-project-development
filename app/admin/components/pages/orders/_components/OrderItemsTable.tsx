import React from "react";

interface OrderItem {
  productImage: string;
  productName: string;
  productCode: string;
  regularPrice: number;
  quantity: number;
}

interface OrderItemsTableProps {
  items: OrderItem[];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
  return (
    <table className="min-w-full ">
      <thead>
        <tr>
          <th className="py-2">Image</th>
          <th className="py-2">Product Name</th>
          <th className="py-2">Product Code</th>
          <th className="py-2">Regular Price</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="py-2">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-16 h-16 object-cover"
              />
            </td>
            <td className="py-2">{item.productName}</td>
            <td className="py-2">{item.productCode}</td>
            <td className="py-2">${item.regularPrice.toFixed(2)}</td>
            <td className="py-2">{item.quantity}</td>
            <td className="py-2">
              ${(item.regularPrice * item.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderItemsTable;
