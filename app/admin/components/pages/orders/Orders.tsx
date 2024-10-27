import { useState } from "react";
import { AllOrdersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrders";
import EditAllOrdersPopup from "./editOrdersPopup";
import OrderDetailPopup from "./OrderDetailPopup";
import { ColumnDef } from "@tanstack/react-table";

const COUPON_VALUE = 10; // Static coupon value of $10

// Calculates total price for each item based on regular price and quantity
function calculateItemsWithTotal(
  items: {
    regularPrice: number;
    quantity: number;
    productImage: string;
    productName: string;
    productCode: string;
  }[]
) {
  return items.map((item) => ({
    ...item,
    total: item.regularPrice * item.quantity,
  }));
}

// Calculates the final order total for an array of items with an applied discount
function calculateOrderTotal(
  items: { regularPrice: number; quantity: number }[]
) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.regularPrice * item.quantity,
    0
  );
  return subtotal - COUPON_VALUE;
}

// Initializes order data, dynamically adding totals
function getInitialData(): AllOrdersNew[] {
  const orders = [
    {
      id: "728ed52f",
      order_id: "#254GF45",
      date: "23/05/2024",
      username: "SteveSmith",
      order_total: "",
      status: "Approved",
      items: [
        {
          productImage: "/images/all-orders/cod.jpeg",
          productName: "Call of Duty",
          productCode: "#COD451",
          regularPrice: 15,
          quantity: 3,
        },
        {
          productImage: "/images/all-orders/battlefield.jpg",
          productName: "Battlefield 2042",
          productCode: "#BFD800",
          regularPrice: 20,
          quantity: 3,
        },

        {
          productImage: "/images/all-orders/red_dead.jpg",
          productName: "Red Dead Redemption",
          productCode: "#BFD800",
          regularPrice: 100,
          quantity: 3,
        },
      ],
    },

    {
      id: "728ed53a",
      order_id: "#254GF11",
      date: "25/07/2024",
      username: "Ricky Ponting",
      order_total: "",
      status: "Approved",
      items: [
        {
          productImage: "/images/all-orders/igi.jpg",
          productName: "Project IGI",
          productCode: "#IGI345",
          regularPrice: 12,
          quantity: 4,
        },
      ],
    },

    {
      id: "728ed533",
      order_id: "#254GD00",
      date: "01/07/2024",
      username: "David Warner",
      order_total: "",
      status: "Approved",
      items: [
        {
          productImage: "/images/all-orders/igi.jpg",
          productName: "GTA",
          productCode: "#GTA345",
          regularPrice: 10,
          quantity: 5,
        },

        {
          productImage: "/images/all-orders/aoe.jpg",
          productName: "Age of Empires",
          productCode: "#AOE345",
          regularPrice: 25,
          quantity: 10,
        },

        {
          productImage: "/images/all-orders/cricket.jpg",
          productName: "Cricket",
          productCode: "#GTA345",
          regularPrice: 30,
          quantity: 3,
        },
      ],
    },
  ];

  return orders.map((order) => {
    const itemsWithTotal = calculateItemsWithTotal(order.items); // Calculate total for each item
    return {
      ...order,
      items: itemsWithTotal,
      order_total: `$${calculateOrderTotal(itemsWithTotal).toFixed(2)}`, // Calculate the order total
    };
  });
}

export default function AllOrders() {
  const [orders, setOrders] = useState<AllOrdersNew[]>(getInitialData());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AllOrdersNew | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew | null>(null);

  const handleViewOrder = (order: AllOrdersNew) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleAddOrder = (newOrder: AllOrdersNew) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const handleEditOrder = (order: AllOrdersNew) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveOrder = (updatedOrder: AllOrdersNew) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const actionColumn: ColumnDef<AllOrdersNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteOrder(row.original.id)}
        >
          Delete
        </button>

        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleViewOrder(row.original)}
        >
          View
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllOrdersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10 text-white">
      <h1 className="text-2xl font-bold mb-4 text-white">All Orders</h1>
      {/* Add Orders Component */}
      <Addorders onAddOrder={handleAddOrder} />
      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={orders} />
      {/* Edit order Modal */}
      <EditAllOrdersPopup
        order={editingOrder}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveOrder}
      />

      {/* Order Details Popup */}
      {selectedOrder && (
        <OrderDetailPopup
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          customerName={selectedOrder.username}
          customerEmail={
            selectedOrder.username === "SteveSmith"
              ? "Steve@gmail.com"
              : "Ricky@gmail.com"
          }
          date={selectedOrder.date}
          items={selectedOrder.items}
          order_id={selectedOrder.order_id}
        />
      )}
    </div>
  );
}
