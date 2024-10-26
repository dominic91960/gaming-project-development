import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItem {
  productImage: string;
  productName: string;
  productCode: string;
  regularPrice: number;
  quantity: number;
  total: number;
}

interface OrderItemsTableProps {
  items: OrderItem[];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
  const subtotal = items.reduce((acc, item) => acc + item.total, 0);

  // Static coupon value
  const couponValue = 10;

  // Calculate final price after applying the coupon
  const finalPrice = subtotal - couponValue;
  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Product Code</TableHead>
            <TableHead className="w-[100px]">Regular Price</TableHead>
            <TableHead className="w-[100px]">Quantity</TableHead>
            <TableHead className="w-[100px]">Total</TableHead>
          </TableRow>
        </TableHeader>

        {items.map((item, index) => (
          <TableBody>
            <TableRow>
              <TableCell>
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover"
                />
              </TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.productCode}</TableCell>
              <TableCell>${item.regularPrice.toFixed(2)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                ${(item.regularPrice * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>

      {/* Display Subtotal */}
      <div className="mt-4 text-right">
        <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
      </div>
      {/* Coupon Section (Static Value) */}
      <div className="mt-2 text-right">
        <strong>Coupon Value: -${couponValue.toFixed(2)}</strong>
      </div>
      {/* Display Final Price */}
      <div className="mt-2 text-right">
        <strong>Final Price: ${Math.max(finalPrice, 0).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderItemsTable;
