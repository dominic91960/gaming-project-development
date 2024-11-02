"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartContext } from "@/context/CartContext";
import { useAuthContext } from "@/context/AuthContext";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  address: yup.string().required("Street Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.string().required("Zip Code is required"),
  message: yup.string(),
});

// Define the type for methods to expose via ref
interface BillingDetailsFormRef {
  submitForm: () => void;
}

// Forward ref to expose submit functionality
const BillingDetailsForm = forwardRef<BillingDetailsFormRef>((props, ref) => {
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
    setDiscount,
    totalDiscount,
    discountData,
    proceedCheckout,
    createOrder,
  } = useCartContext();
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    createOrder(data);
  };

  // Expose the submit method to parent component
  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onSubmit)(),
  }));

  return (
    <div className="flex flex-col flex-1 z-20 text-white">
      <h1 className="text-[13px] md:text-[18px] lg:text-[22px] xl:text-[25px] font-semibold mb-[2em]">
        Billing details
      </h1>
      <form className="text-[10px] md:text-[12px] lg:text-[15px] xl:text-[18px] font-medium">
        <div className="flex flex-col gap-y-[2em] lg:gap-y-[1em]">
          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Label>First Name</Label>
              <Input
                type="text"
                value={user?.firstName}
                {...register("firstName")}
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-1 w-full">
              <Label>Last Name</Label>
              <Input
                type="text"
                value={user?.lastName}
                {...register("lastName")}
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={user?.email}
              {...register("email")}
              className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Label>Phone</Label>
              <Input
                type="tel"
                value={user?.phone}
                {...register("phone")}
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-1 w-full">
              <Label>Country</Label>
              <Input
                type="text"
                value={user?.country}
                {...register("country")}
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
              {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Street Address</Label>
            <Input
              type="text"
              value={user?.address}
              {...register("address")}
              className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Label>City</Label>
              <Input
                type="text"
                value={user?.city}
                {...register("city")}
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-1 w-full">
              <Label>Zip Code</Label>
              <Input
                type="text"
                value={user?.postalCode}
                {...register("postalCode")}
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
              {errors.postalCode && (
                <p className="text-red-500">{errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <h1 className="text-[13px] md:text-[18px] lg:text-[22px] xl:text-[25px] font-semibold pt-[1em]">
            Additional information
          </h1>

          <div className="flex flex-col gap-y-1">
            <Textarea
              {...register("message")}
              className="border-[#0BDB45] border-[0.5px] text-white rounded-none bg-opacity-70"
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

export default BillingDetailsForm;
