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
  quantity: number;
  game: {
    cardImage: string;
    displayName: string;
    id: string;
    regularPrice: number;
  };
}

interface OrderItemsTableProps {
  products: OrderItem[];
  order: any;
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({
  products,
  order,
}) => {
  const subtotal = products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Product</TableHead>
            <TableHead className="w-[100px] text-white">Name</TableHead>
            <TableHead className="w-[100px] text-white">Product Code</TableHead>
            <TableHead className="w-[100px] text-white">
              Regular Price
            </TableHead>
            <TableHead className="w-[100px] text-white">Quantity</TableHead>
            <TableHead className="w-[100px] text-white">Total</TableHead>
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
              <TableCell className="text-white">
                ${product.game.regularPrice.toFixed(2)}
              </TableCell>
              <TableCell className="text-white">
                {product?.quantity}
              </TableCell>
              <TableCell className="text-white">
                ${(product.game.regularPrice * product?.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>

      {/* Display Subtotal */}
      <div className="mt-4 text-right text-white">
        <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
      </div>
      {/* Coupon Section (Static Value) */}
      <div className="mt-2 text-right text-white">
        <strong>
          Coupon Value: -$
          {Math.max(subtotal - order?.totalAmount, 0).toFixed(2)}
        </strong>
      </div>
      {/* Display Final Price */}
      <div className="mt-2 text-right text-white">
        <strong>
          Final Price: ${Math.max(order?.totalAmount, 0).toFixed(2)}
        </strong>
      </div>
    </div>
  );
};

export default OrderItemsTable;
