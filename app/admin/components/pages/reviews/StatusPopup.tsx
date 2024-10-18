// StatusPopup.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StatusPopupProps {
  initialStatus: string;
  onSave: (newStatus: string) => void;
  onClose: () => void;
}

const StatusPopup: React.FC<StatusPopupProps> = ({
  initialStatus,
  onSave,
  onClose,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);

  const handleSave = () => {
    onSave(selectedStatus);
    onClose();
  };

  return (
    <div className="absolute bg-white shadow-md rounded-md p-4 z-50 text-black">
      <h3 className="text-lg font-bold mb-2">Select Status</h3>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="approved"
            checked={selectedStatus === "approved"}
            onChange={() => setSelectedStatus("approved")}
          />
          <span>Approved</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="rejected"
            checked={selectedStatus === "rejected"}
            onChange={() => setSelectedStatus("rejected")}
          />
          <span>Rejected</span>
        </label>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default StatusPopup;
