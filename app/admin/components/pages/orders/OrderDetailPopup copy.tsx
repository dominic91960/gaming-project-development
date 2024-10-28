import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import OrderItemsTable from "./_components/OrderItemsTable"; // Import the new component

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


interface OrderDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  products: OrderItem[];
}

const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-white">{products[0].price}</DialogTitle>
        <div>
          <OrderItemsTable products={products} />
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailPopup;
