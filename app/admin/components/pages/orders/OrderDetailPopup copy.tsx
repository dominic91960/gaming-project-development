import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import OrderItemsTable from "./_components/OrderItemsTable"; // Import the new component
import { IoClose } from "react-icons/io5";

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
      <DialogContent className="bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E] sm:w-auto">
        <DialogTitle className="text-white">{products[0]?.price}</DialogTitle>
        <button
          className="absolute top-[1em] right-[1em] text-[#00FFA1] text-[1.4em] hover:opacity-80 transition-opacity duration-100"
          onClick={onClose}
        >
          <IoClose />
        </button>
        <div>
          <OrderItemsTable products={products} order={order} />
          {/* <Button variant="outline" className="text-white" onClick={onClose}>
            Close
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailPopup;
