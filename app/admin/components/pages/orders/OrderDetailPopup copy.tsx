import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import OrderItemsTable from "./_components/OrderItemsTable"; // Import the new component

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

interface OrderDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  products: OrderItem[];
  order: any;
}

const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({
  isOpen,
  onClose,
  products,
  order,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-white">{products[0]?.price}</DialogTitle>
        <div>
          <OrderItemsTable products={products} order={order} />
          <Button variant="outline" className="text-white" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailPopup;
