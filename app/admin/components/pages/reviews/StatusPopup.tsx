import { useState } from "react";

import axiosInstance from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      await axiosInstance.patch(`/reviews/${id}/publish`, { publish: status });
    } catch (error) {}
  };
  const deleteData = async (status: string) => {
    try {
      await axiosInstance.patch(`/reviews/${id}/publish`, { publish: status });
    } catch (error) {}
  };

  return (
    <>
      <h3 className="font-medium mb-[1em]">Select Status</h3>
      <RadioGroup
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="Rejected" className="w-full cursor-pointer">
            Rejected
          </Label>
          <RadioGroupItem value="Rejected" id="Rejected" />
        </div>

        <hr className="border-t-[#0D6D49] my-[0.1em]" />

        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="Approved" className="w-full cursor-pointer">
            Approved
          </Label>
          <RadioGroupItem value="Approved" id="Approved" />
        </div>
      </RadioGroup>

      {/* <div className="flex flex-col space-y-2">
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
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Publish"
            checked={selectedStatus === "Publish"}
            onChange={() => setSelectedStatus("Publish")}
          />
          <span>Publish (True)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="unPublish"
            checked={selectedStatus === "unPublish"}
            onChange={() => setSelectedStatus("unPublish")}
          />
          <span>UnPublish (False)</span>
        </label>
      </div> */}

      <div className="flex justify-end mt-[1.2em] gap-[0.4em]">
        <Button
          variant="outline"
          onClick={onClose}
          className="h-fit text=[1em] px-[1em] py-[0.5em] rounded-sm"
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={handleSave}
          className="h-fit text=[1em] px-[1em] py-[0.5em] rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default StatusPopup;
