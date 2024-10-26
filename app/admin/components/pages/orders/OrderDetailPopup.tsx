import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Allcustomers from "./_components/Order-details-table";

const orderData = {
  steveSmith: [
    {
      no: "1",
      imageUrl: "/images/sample-pic1.png",
      id: "728ed52f",
      order_detail_name: "Call of Duty",
      order_detail_code: "#COD342",
      order_detail_regular_price: "$15",
      order_detail_quantity: "3",
      order_detail_total: "$45",
    },
    {
      no: "2",
      imageUrl: "/images/sample-pic2.png",
      id: "728ed52g",
      order_detail_name: "Battlefield 2042",
      order_detail_code: "#BTF127",
      order_detail_regular_price: "$18",
      order_detail_quantity: "2",
      order_detail_total: "$36",
    },
  ],
  rickyPonting: [
    {
      no: "1",
      imageUrl: "/images/sample-pic3.png",
      id: "728ed52h",
      order_detail_name: "Freedom Fighters",
      order_detail_code: "#FDF177",
      order_detail_regular_price: "$13",
      order_detail_quantity: "4",
      order_detail_total: "$52",
    },
    {
      no: "2",
      imageUrl: "/images/sample-pic4.png",
      id: "728ed52i",
      order_detail_name: "Age of Empires",
      order_detail_code: "#EOE113",
      order_detail_regular_price: "$20",
      order_detail_quantity: "5",
      order_detail_total: "$100",
    },
    {
      no: "3",
      imageUrl: "/images/sample-pic5.png",
      id: "728ed52j",
      order_detail_name: "Project IGI",
      order_detail_code: "#PJI006",
      order_detail_regular_price: "$21",
      order_detail_quantity: "3",
      order_detail_total: "$42",
    },
  ],
};

interface OrderDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerEmail: string;
  date: string;
}

const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({
  isOpen,
  onClose,
  customerName,
  customerEmail,
  date,
}) => {
  const [customers, setCustomers] = useState(orderData.steveSmith); // Default to Steve Smith's data

  const handleViewButtonClick = (user: "steveSmith" | "rickyPonting") => {
    setCustomers(orderData[user]);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Order Details</DialogTitle>
        <div className="space-y-4 text-white">
          <p>
            <strong>Customer Name:</strong> {customerName}
          </p>
          <p>
            <strong>Customer Email:</strong> {customerEmail}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        {/* View Buttons for Steve Smith and Ricky Ponting */}
        <div className="button-group">
          <button onClick={() => handleViewButtonClick("steveSmith")}>
            View Steve Smith's Orders
          </button>
          <button onClick={() => handleViewButtonClick("rickyPonting")}>
            View Ricky Ponting's Orders
          </button>
        </div>

        {/* All Customers Table */}
        <div className="table-section">
          <Allcustomers data={customers} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailPopup;
