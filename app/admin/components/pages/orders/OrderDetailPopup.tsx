import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import OrderItemsTable from "./_components/OrderItemsTable"; // Import the new component

interface OrderItem {
  productImage: string;
  productName: string;
  productCode: string;
  regularPrice: number; // Updated to number
  quantity: number;
  total: number; // Updated to number
}

interface OrderDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerEmail: string;
  date: string;
  order_id: string;
  items: OrderItem[];
}

const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({
  isOpen,
  onClose,
  customerName,
  customerEmail,
  date,
  items,
  order_id,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-white">
          Order Details - {order_id}
        </DialogTitle>
        <div className="space-y-4 text-white">
          {/* <p>
            <strong>Order ID:</strong> {order_id}
          </p> */}

          <p>
            <strong>Customer Name:</strong> {customerName}
          </p>
          <p>
            <strong>Customer Email:</strong> {customerEmail}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          {/* Use the OrderItemsTable component here */}
          <OrderItemsTable items={items} />
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailPopup;
