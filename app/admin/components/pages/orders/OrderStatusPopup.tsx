// StatusPopup.tsx
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useOrderContext } from "@/context/OrderContext";

interface StatusPopupProps {
  id: string;
  initialStatus: string;
  onSave: (newStatus: string) => void;
  onClose: () => void;
}

const StatusPopup: React.FC<StatusPopupProps> = ({
  id,
  initialStatus,
  onSave,
  onClose,
}) => {
  const { updateOrderStatusById } = useOrderContext();
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);

  const handleSave = () => {
    updateOrderStatusById(id, selectedStatus);
    onSave(selectedStatus);
    onClose();
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
        {/* Pending */}
        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="PENDING" className="w-full cursor-pointer">
            Pending
          </Label>
          <RadioGroupItem value="PENDING" id="PENDING" />
        </div>
        <hr className="border-t-[#0D6D49] my-[0.1em]" />

        {/* Completed */}
        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="COMPLETED" className="w-full cursor-pointer">
            Completed
          </Label>
          <RadioGroupItem value="COMPLETED" id="COMPLETED" />
        </div>
        <hr className="border-t-[#0D6D49] my-[0.1em]" />

        {/* Cancelled */}
        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="CANCELLED" className="w-full cursor-pointer">
            Cancelled
          </Label>
          <RadioGroupItem value="CANCELLED" id="CANCELLED" />
        </div>
        <hr className="border-t-[#0D6D49] my-[0.1em]" />

        {/* Hold */}
        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="HOLD" className="w-full cursor-pointer">
            Hold
          </Label>
          <RadioGroupItem value="HOLD" id="HOLD" />
        </div>
      </RadioGroup>

      {/* <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="PENDING"
            checked={selectedStatus === "PENDING"}
            onChange={() => setSelectedStatus("PENDING")}
          />
          <span>PENDING</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="COMPLETED"
            checked={selectedStatus === "COMPLETED"}
            onChange={() => setSelectedStatus("COMPLETED")}
          />
          <span>Completed</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="CANCELLED"
            checked={selectedStatus === "CANCELLED"}
            onChange={() => setSelectedStatus("CANCELLED")}
          />
          <span>Cancelled</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="HOLD"
            checked={selectedStatus === "HOLD"}
            onChange={() => setSelectedStatus("HOLD")}
          />
          <span>Hold</span>
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
