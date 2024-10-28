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
  price: number;
  game: {
    cardImage: string;
    displayName: string;
    id: string;
    regularPrice: number;
    quantity: number;
  };
}

interface OrderItemsTableProps {
  products: OrderItem[];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ products }) => {
  const subtotal = products.reduce((acc, product) => acc + product.price, 0);

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

        {products.map((product, index) => (
          <TableBody>
            <TableRow>
              <TableCell>
                <img
                  src={product.game.cardImage}
                  alt={product.game.displayName}
                  className="w-16 h-16 object-cover"
                />
              </TableCell>
              <TableCell className="text-white">
                {product.game.displayName}
              </TableCell>
              <TableCell className="text-white">{product.game.id}</TableCell>
               <TableCell className="text-white">${product.game.regularPrice.toFixed(2)}</TableCell>
              <TableCell className="text-white">
                {product.game.quantity}
              </TableCell>
              <TableCell className="text-white">
                ${(product.game.regularPrice * product.game.quantity).toFixed(2)}
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
