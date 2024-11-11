import React, { ChangeEvent, FormEvent, useRef } from "react";
import * as Yup from "yup";
import { AllCouponsNew } from "./columns";
import { X } from "lucide-react";
import { IoIosCalendar } from "react-icons/io";
import { useToast } from "@/context/ToastContext";
import axiosInstance from "@/axios/axiosInstance";
import { useCouponContext } from "@/context/CouponContext";

// Define validation schema with Yup
const couponSchema = Yup.object().shape({
  code: Yup.string().required("Coupon code is required"),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .positive("Discount must be a positive number")
    .required("Discount amount is required"),
  type: Yup.string().oneOf(["FIXED", "PERCENTAGE"], "Invalid discount type"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("Expiry date is required")
    .min(Yup.ref("startDate"), "Expiry date cannot be before start date"),
  description: Yup.string().required("Description is required"),
});

interface EditAllCouponsPopupProps {
  coupon: AllCouponsNew | null;
  isOpen: boolean;
  readOnly: boolean;
  onClose: () => void;
  onSave: (updatedCoupon: any) => void;
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
  const [editedCoupon, setEditedCoupon] = React.useState<AllCouponsNew | null>(
    coupon
  );
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { saveCoupon } = useCouponContext();

  const addToast = useToast();

  React.useEffect(() => {
    if (coupon) {
      setEditedCoupon({
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

  if (!isOpen || !editedCoupon) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Ensure the state update matches the type exactly
    setEditedCoupon((prev) => {
      // If prev is null, return an empty object or keep it as null if you prefer to handle that case
      if (!prev) return null;

      return {
        ...prev,
        [name]: value,
      } as AllCouponsNew; // Type assertion ensures compatibility
    });

    // Clear the specific field error if any
    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear error for the specific field
    }));
  };

  // Validate form and display errors if any
  const validateForm = async () => {
    try {
      await couponSchema.validate(editedCoupon, { abortEarly: false });
      setErrors({}); // Clear errors if validation is successful
      return true;
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        validationError.inner.forEach((error) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (readOnly) return;

    const isValid = await validateForm();
    if (isValid && editedCoupon) {
      const updatedCoupon = {
        ...editedCoupon,
        startDate: editedCoupon.startDate
          ? new Date(editedCoupon.startDate).toISOString()
          : null,
        endDate: editedCoupon.endDate
          ? new Date(editedCoupon.endDate).toISOString()
          : null,
      };
      onSave(updatedCoupon);

      const updatedFormData = {
        id: updatedCoupon.id,
        code: updatedCoupon.code,
        discount: updatedCoupon.discount,
        type: updatedCoupon.type,
        startDate: updatedCoupon.startDate,
        endDate: updatedCoupon.endDate,
        description: updatedCoupon.description,
      };
      saveCoupon(updatedFormData, onClose);
    }
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
          {/* Coupon Code */}
          <div>
            <label htmlFor="code">Coupon Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={editedCoupon.code}
              onChange={handleInputChange}
              className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
              readOnly={readOnly}
            />
            <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
              {errors.code}
            </p>
          </div>

          {/* Discount and Discount Type */}
          <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
            <div>
              <label htmlFor="discount">Discount Amount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={editedCoupon.discount}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                readOnly={readOnly}
              />
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                {errors.discount}
              </p>
            </div>

            <div>
              <label htmlFor="type">Discount Type</label>
              <select
                id="type"
                name="type"
                value={editedCoupon.type}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.55em]"
                disabled={readOnly}
              >
                <option value="FIXED">Fixed product discount</option>
                <option value="PERCENTAGE">Percentage discount</option>
              </select>
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                {errors.type}
              </p>
            </div>
          </div>

          {/* Start Date and Expiry Date */}
          <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
            <div>
              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                name="startDate"
                ref={startDateRef}
                value={editedCoupon.startDate}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                readOnly={readOnly}
              />
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                {errors.startDate}
              </p>
            </div>

            <div>
              <label htmlFor="end-date">Expiry Date</label>
              <input
                type="date"
                id="end-date"
                name="endDate"
                ref={expiryDateRef}
                value={editedCoupon.endDate}
                onChange={handleInputChange}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                readOnly={readOnly}
              />
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                {errors.endDate}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-[1em]">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editedCoupon.description}
              onChange={handleInputChange}
              className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
              readOnly={readOnly}
            />
            <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
              {errors.description}
            </p>
          </div>

          {!readOnly && (
            <div className="flex items-center justify-between leading-none mt-[2.5em] md:mt-[12em]">
              <p className="max-w-[40ch] text-[8px] sm:max-w-[60ch] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] xl:text-[9.75px] 2xl:text-[10px]">
                Please review and ensure that all the details you have entered
                are correct before submitting.
              </p>

              <button
                type="submit"
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
