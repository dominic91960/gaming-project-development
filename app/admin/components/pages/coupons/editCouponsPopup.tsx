import React, { ChangeEvent, FormEvent, useRef } from "react";

import { AllCouponsNew } from "./columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { IoIosCalendar } from "react-icons/io";

interface EditAllCouponsPopupProps {
  coupon: AllCouponsNew | null;
  isOpen: boolean;
  readOnly: boolean;
  onClose: () => void;
  onSave: (updatedcoupon: AllCouponsNew) => void;
}

const EditAllCouponsPopup: React.FC<EditAllCouponsPopupProps> = ({
  coupon,
  isOpen,
  readOnly,
  onClose,
  onSave,
}) => {
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const expiryDateRef = useRef<HTMLInputElement | null>(null);
  const [editedcoupon, setEditedcoupon] = React.useState<AllCouponsNew | null>(
    coupon
  );

  React.useEffect(() => {
    if (coupon) {
      setEditedcoupon({
        ...coupon,
        startDate: coupon.startDate
          ? new Date(coupon.startDate).toISOString().split("T")[0]
          : "",
        endDate: coupon.endDate
          ? new Date(coupon.endDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [coupon]);

  if (!isOpen || !editedcoupon) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedcoupon({
      ...editedcoupon,
      [name]: value,
    });
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedcoupon) {
      if (readOnly) return;
      // Ensure the startDate and endDate are in the correct format before passing to onSave
      const updatedCoupon = {
        ...editedcoupon,
        startDate: editedcoupon.startDate
          ? new Date(editedcoupon.startDate).toISOString()
          : null,
        endDate: editedcoupon.endDate
          ? new Date(editedcoupon.endDate).toISOString()
          : null,
      };
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-10">
      <div className="w-[340px] bg-gradient-to-tr from-black/40 to-[#00945E]/40 font-primaryFont text-[9px] text-white p-[3em] border border-[#0D6D49] rounded-sm backdrop-blur-md sm:w-[459px] sm:text-[10px] md:w-[578px] md:text-[11px] lg:w-[697px] lg:text-[12px] xl:w-[757px] xl:text-[12.5px] 2xl:w-[817px] 2xl:text-[13px]">
        <div className="flex flex-row items-center justify-between space-y-0 text-[13px] mb-[0.7em] sm:text-[15px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
          <h4 className="font-bold text-[1em]">
            {readOnly ? "View" : "Edit"} Coupon
          </h4>
          <button onClick={onClose}>
            <X className="size-[18px] text-[#00FFA1] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] hover:opacity-80" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <hr className="border-t-[#0D6D49]" />

        <form
          onSubmit={handleSave}
          className="mt-[2.5em] py-[1.5em] rounded-sm md:bg-black/40 md:p-[1.5em] md:border md:border-[#0D6D49]"
        >
          {/* Grid for coupon code */}
          <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
            <div>
              <label htmlFor="code">Coupon Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={editedcoupon.code}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                readOnly={readOnly}
              />

              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                some dummy error
              </p>
            </div>
          </div>

          {/* Grid for discount and discount type */}
          <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
            {/* discount */}
            <div>
              <label htmlFor="discount">Discount Amount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={editedcoupon.discount}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                readOnly={readOnly}
              />
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                some dummy error
              </p>
            </div>

            {/* Discount type */}
            <div>
              <label htmlFor="type">Discount Type</label>
              {/* <select
                id="type"
                name="type"
                value={editedcoupon.type}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.55em]"
                disabled={readOnly}
              >
                <option value="FIXED" className="bg-black">
                  Fixed product discount
                </option>
                <option value="PERCENTAGE" className="bg-black">
                  Percentage discount
                </option>
              </select> */}

              <Select value={editedcoupon.type}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#D9D9D9]/50 rounded-sm sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13px]">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 border border-[#D9D9D9]/50 text-white backdrop-blur-sm">
                  {["FIXED", "PERCENTAGE"].map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13px]"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                some dummy error
              </p>
            </div>
          </div>

          {/* Grid for coupon start date and coupon end date */}
          <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
            {/* Coupon start date */}
            <div>
              <label htmlFor="start-date">Start Date</label>
              <style>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                  display: none;
                }

                @supports (-moz-appearance: none) {
                  #date-picker {
                    display: none;
                  }
                }
              `}</style>
              <div className="relative">
                <input
                  type="date"
                  id="start-date"
                  name="startDate"
                  ref={startDateRef}
                  value={editedcoupon.startDate}
                  onChange={handleInputChange}
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                  readOnly={readOnly}
                />
                {!readOnly && (
                  <button
                    type="button"
                    id="date-picker"
                    className="absolute top-0 bottom-0 right-[0.2em] my-auto size-fit text-[1.5em] px-[0.2em] py-[0.2em] hover:opacity-80"
                    onClick={() => startDateRef.current?.showPicker()}
                  >
                    <IoIosCalendar />
                  </button>
                )}
              </div>
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                some dummy error
              </p>
            </div>

            {/* Coupon end date */}
            <div>
              <label htmlFor="end-date">Expiry Date</label>
              <style>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                  display: none;
                }

                @supports (-moz-appearance: none) {
                  #date-picker {
                    display: none;
                  }
                }
              `}</style>
              <div className="relative">
                <input
                  type="date"
                  id="end-date"
                  name="endDate"
                  ref={expiryDateRef}
                  value={editedcoupon.endDate}
                  onChange={handleInputChange}
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                  readOnly={readOnly}
                />
                {!readOnly && (
                  <button
                    type="button"
                    id="date-picker"
                    className="absolute top-0 bottom-0 right-[0.2em] my-auto size-fit text-[1.5em] px-[0.2em] py-[0.2em] hover:opacity-80"
                    onClick={() => expiryDateRef.current?.showPicker()}
                  >
                    <IoIosCalendar />
                  </button>
                )}
              </div>
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                some dummy error
              </p>
            </div>
          </div>

          {/* Coupon description */}
          <div className="mt-[1em]">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editedcoupon.description}
              onChange={handleInputChange}
              className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
              readOnly={readOnly}
            />
            <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
              some dummy error
            </p>
          </div>

          {/* <input
            type="text"
            name="discount"
            value={editedcoupon.discount}
            onChange={handleInputChange}
            placeholder="Coupon Discount"
            className="w-full mb-2 p-2 border rounded"
            readOnly={readOnly}
          /> */}

          {/* <select
            name="type"
            value={editedcoupon.type}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
            disabled={readOnly}
          >
            <option value="Fixed_product_discount">
              Fixed product discount
            </option>
            <option value="Percentage_discount">Percentage discount</option>
          </select> */}

          {/* <input
            type="date"
            name="startDate"
            value={editedcoupon.startDate}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
            readOnly={readOnly}
          /> */}

          {/* <input
            type="date"
            name="endDate"
            value={editedcoupon.endDate}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
            readOnly={readOnly}
          /> */}

          {/* <input
            type="text"
            name="description"
            value={editedcoupon.description}
            onChange={handleInputChange}
            placeholder="Coupon Description"
            className="w-full mb-2 p-2 border rounded"
            readOnly={readOnly}
          /> */}

          {/* Footer text and submit button */}
          {!readOnly && (
            <div className="flex items-center justify-between leading-none mt-[2.5em] md:mt-[12em]">
              <p className="max-w-[40ch] text-[8px] sm:max-w-[60ch] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] xl:text-[9.75px] 2xl:text-[10px]">
                Please review and ensure that all the details you have entered
                are correct before submitting.
              </p>

              <button
                type="button"
                className="bg-[#00FFA1] font-semibold text-black uppercase px-[1.4em] py-[0.8em] rounded-sm hover:opacity-80"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditAllCouponsPopup;
