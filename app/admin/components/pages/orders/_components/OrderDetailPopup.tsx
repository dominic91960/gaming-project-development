// import React from "react";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import Allcustomers from "./Order-details-table";

// interface OrderDetailPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   customerName: string;
//   customerEmail: string;
//   date: string;
// }

// const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({
//   isOpen,
//   onClose,
//   customerName,
//   customerEmail,
//   date,
// }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogTitle>Order Details</DialogTitle>
//         <div className="space-y-4">
//           <p>
//             <strong>Customer Name:</strong> {customerName}
//           </p>
//           <p>
//             <strong>Customer Email:</strong> {customerEmail}
//           </p>
//           <p>
//             <strong>Date:</strong> {date}
//           </p>
//           <Button variant="outline" onClick={onClose}>
//             Close
//           </Button>
//         </div>

//         <Allcustomers />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OrderDetailPopup;
