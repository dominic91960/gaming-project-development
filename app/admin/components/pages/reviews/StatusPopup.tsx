// StatusPopup.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
    <>
      <h3 className="font-medium mb-[1em]">Select Status</h3>
      {/* <div className="flex flex-col space-y-2">
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
      </div> */}
      <RadioGroup
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="rejected" className="w-full cursor-pointer">
            Rejected
          </Label>
          <RadioGroupItem value="rejected" id="rejected" />
        </div>
        <hr className="border-t-[#0D6D49] my-[0.1em]" />
        <div className="flex items-center justify-between hover:opacity-85">
          <Label htmlFor="approved" className="w-full cursor-pointer">
            Approved
          </Label>
          <RadioGroupItem value="approved" id="approved" />
        </div>
      </RadioGroup>
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
