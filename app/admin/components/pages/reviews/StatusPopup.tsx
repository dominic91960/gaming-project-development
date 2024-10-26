import { useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/axios/axiosInstance";

interface StatusPopupProps {
  initialStatus: string;
  id: string;
  onSave: (newStatus: string) => void;
  onClose: () => void;
}

const StatusPopup: React.FC<StatusPopupProps> = ({
  initialStatus,
  id,
  onSave,
  onClose,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);

  const handleSave = () => {
    onSave(selectedStatus);
    updateReview(selectedStatus);
    onClose();
  };

  const updateReview = async (status: string) => {
    try {
      await axiosInstance.patch(`/reviews/${id}/publish`, {'publish':status});
    } catch (error) {}
  };
  const deleteData = async (status: string) => {
    try {
      await axiosInstance.patch(`/reviews/${id}/publish`, {'publish':status});
    } catch (error) {}
  };

  return (
    <div className="absolute bg-white shadow-md rounded-md p-4 z-50 text-black">
      <h3 className="text-lg font-bold mb-2">Select Status</h3>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Approved"
            checked={selectedStatus === "Approved"}
            onChange={() => setSelectedStatus("Approved")}
          />
          <span>Approved</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Rejected"
            checked={selectedStatus === "Rejected"}
            onChange={() => setSelectedStatus("Rejected")}
          />
          <span>Rejected</span>
        </label>
        {/* <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Publish"
            checked={selectedStatus === "Publish"}
            onChange={() => setSelectedStatus("Publish")}
          />
          <span>Publish (True)</span>
        </label> */}
        {/* <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="unPublish"
            checked={selectedStatus === "unPublish"}
            onChange={() => setSelectedStatus("unPublish")}
          />
          <span>UnPublish (False)</span>
        </label> */}
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
