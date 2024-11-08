import { useRef } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { AllCouponsNew } from "./columns";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosCalendar } from "react-icons/io";

import { useCouponContext } from "@/context/CouponContext";

interface AddCouponsProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCoupon: (newCoupon: AllCouponsNew) => void;
}

export default function AddCoupons({
  isOpen,
  onClose,
  onAddCoupon,
}: AddCouponsProps) {
  const { addNewCoupon } = useCouponContext();
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const expiryDateRef = useRef<HTMLInputElement | null>(null);

  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
      discount: "",
      type: "Public",
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Coupon code is required"),
      description: Yup.string().required("Description is required"),
      discount: Yup.number()
        .required("Discount is required")
        .min(0, "Discount must be at least 0")
        .max(100, "Discount cannot exceed 100"),
      type: Yup.string().required("Type is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date().required("End date is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Create date objects and format them as required
        const startDate = new Date(values.startDate);
        const endDate = new Date(values.endDate);

        // Set endDate to the end of the day
        endDate.setHours(23, 59, 59, 999);

        const formattedValues = {
          ...values,
          startDate: startDate.toISOString(), // Format to ISO string
          endDate: endDate.toISOString(), // Format to ISO string
        };

        const data = await addNewCoupon(formattedValues, formik.resetForm);
        if (data) {
          onAddCoupon(data);
        }

        // Reset form
      } catch (error) {
        console.error("Error creating coupon:", error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-10">
      <div className="w-[320px] bg-gradient-to-tr from-black/40 to-[#00945E]/40 font-primaryFont text-[9px] text-white p-[3em] border border-[#0D6D49] rounded-sm backdrop-blur-md sm:w-[500px] sm:text-[10px] md:w-[680px] md:text-[11px] lg:w-[860px] lg:text-[12px] xl:w-[970px] xl:text-[12.5px] 2xl:w-[1070px] 2xl:text-[13px]">
        <div className="flex flex-row items-center justify-between space-y-0 text-[13px] mb-[0.7em] sm:text-[15px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
          <h4 className="font-bold text-[1em]">Add Coupon</h4>
          <button onClick={onClose}>
            <X className="size-[18px] text-[#00FFA1] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] hover:opacity-80" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <hr className="border-t-[#0D6D49]" />

        <form
          onSubmit={formik.handleSubmit}
          className="mt-[2.5em] py-[1.5em] rounded-sm md:col-span-8 md:bg-black/40 md:p-[1.5em] md:border md:border-[#0D6D49] lg:col-span-9"
        >
          {/* Grid for coupon code */}
          <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
            <div>
              <label htmlFor="coupon-code">Coupon Code</label>
              <input
                type="text"
                id="coupon-code"
                {...formik.getFieldProps("code")}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
              />
              {formik.touched.code && formik.errors.code ? (
                <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                  {formik.errors.code}
                </p>
              ) : null}
            </div>
          </div>

          {/* Grid for discount and discount type */}
          <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
            {/* discount */}
            <div>
              <label htmlFor="discount-amount">Discount Amount</label>
              <input
                type="number"
                id="discount-amount"
                {...formik.getFieldProps("discount")}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
              />
              {formik.touched.discount && formik.errors.discount ? (
                <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                  {formik.errors.discount}
                </p>
              ) : null}
            </div>

            {/* Discount type */}
            <div>
              <label>Discount Type</label>
              <select
                id="discount-type"
                {...formik.getFieldProps("type")}
                className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.55em]"
              >
                <option value="FIXED" className="bg-black">
                  Fixed product discount
                </option>
                <option value="PERCENTAGE" className="bg-black">
                  Percentage discount
                </option>
              </select>

              {/* <Select>
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
              </Select> */}
              {formik.touched.type && formik.errors.type ? (
                <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                  {formik.errors.type}
                </p>
              ) : null}
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
                  ref={startDateRef}
                  {...formik.getFieldProps("startDate")}
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
                <button
                  type="button"
                  id="date-picker"
                  className="absolute top-0 bottom-0 right-[0.2em] my-auto size-fit text-[1.5em] px-[0.2em] py-[0.2em] hover:opacity-80"
                  onClick={() => startDateRef.current?.showPicker()}
                >
                  <IoIosCalendar />
                </button>
              </div>
              {formik.touched.startDate && formik.errors.startDate ? (
                <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                  {formik.errors.startDate}
                </p>
              ) : null}
            </div>

            {/* Coupon end date */}
            <div>
              <label htmlFor="expiry-date">Expiry Date</label>
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
                  id="expiry-date"
                  ref={expiryDateRef}
                  {...formik.getFieldProps("endDate")}
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
                <button
                  type="button"
                  id="date-picker"
                  className="absolute top-0 bottom-0 right-[0.2em] my-auto size-fit text-[1.5em] px-[0.2em] py-[0.2em] hover:opacity-80"
                  onClick={() => expiryDateRef.current?.showPicker()}
                >
                  <IoIosCalendar />
                </button>
              </div>
              {formik.touched.endDate && formik.errors.endDate ? (
                <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                  {formik.errors.endDate}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-[1em]">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              {...formik.getFieldProps("description")}
              className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.5em]"
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                {formik.errors.description}
              </p>
            ) : null}
          </div>

          {/* Footer text and submit button */}
          <div className="flex items-center justify-between leading-none mt-[2.5em] md:mt-[12em]">
            <p className="max-w-[40ch] text-[8px] sm:max-w-[60ch] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] xl:text-[9.75px] 2xl:text-[10px]">
              Please review and ensure that all the details you have entered are
              correct before submitting.
            </p>
            <button
              type="submit"
              className="bg-[#00FFA1] font-semibold text-black uppercase px-[1.4em] py-[0.8em] rounded-sm hover:opacity-80"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
