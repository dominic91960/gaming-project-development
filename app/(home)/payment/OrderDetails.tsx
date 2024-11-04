"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

type CartItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  quantity: number;
  price: number;
  productType: string;
};

type OrderDetailsProps = {
  cart: CartItem[];
  totalDiscount: number;
  totalPrice: number;
  handleSubmit: () => void;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
  cart,
  totalDiscount,
  totalPrice,
  handleSubmit,
}) => {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placedOrder = () => {
    handleSubmit();
  };
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean | any>(
    false
  );
  return (
    <div className="flex flex-col flex-1 bg-white bg-opacity-20 border-[0.25px] md:border-[0.5px] border-white z-20 p-[2em]">
      <h1 className="text-[13px] md:text-[18px] lg:text-[22px] xl:text-[25px] font-semibold mb-[1em] text-white">
        Your Order
      </h1>
      <div className="flex flex-col gap-y-[0.5em] items-center">
        <div className="flex w-full justify-between mx-auto text-white text-[10px] md:text-[14px] xl:text-[16px]">
          <h3 className="font-semibold">Product</h3>
          <h3 className="font-semibold">Subtotal</h3>
        </div>
        <div className="border-t-[0.5px] border-white w-full border-opacity-70"></div>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex w-full justify-between text-white mx-auto text-opacity-70 text-[8px] md:text-[12px] lg:text-[14px]"
          >
            <h3 className="font-normal">
              {item.title} &nbsp; x {item.quantity}
            </h3>
            <h3 className="font-normal">
              ${Math.max(item.price * item.quantity, 0).toFixed(2)}
            </h3>
          </div>
        ))}

        <div className="border-t-[0.5px] border-white w-full border-opacity-70"></div>
        <div className="flex w-full justify-between text-white mx-auto text-opacity-70 text-[8px] md:text-[12px] lg:text-[14px]">
          <h3 className="font-normal">Subtotal</h3>
          <h3 className="font-normal">${Math.max(subtotal, 0).toFixed(2)}</h3>
        </div>
        <div className="border-t-[0.5px] border-white w-full border-opacity-70"></div>
        <div className="flex w-full justify-between text-white mx-auto text-opacity-70 text-[8px] md:text-[12px] lg:text-[14px]">
          <h3 className="font-normal">Discount</h3>
          <h3 className="font-normal">
            - ${Math.max(totalDiscount, 0).toFixed(2)}
          </h3>
        </div>
        <div className="border-t-[0.5px] border-white w-full border-opacity-70"></div>
        <div className="flex w-full justify-between text-white mx-auto text-opacity-70 text-[8px] md:text-[12px] lg:text-[14px]">
          <h3 className="font-normal">Total</h3>
          <h3 className="font-normal">
            ${Math.max(totalPrice - totalDiscount, 0).toFixed(2)}
          </h3>
        </div>
        <div className="border-t-[0.5px] border-white w-full border-opacity-70"></div>
      </div>

      <RadioGroup defaultValue="default" className="flex flex-col py-[1em]">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="default"
            id="r1"
            className="border-white text-[#346CD2] checked:bg-transparent checked:border-white hover:bg-transparent after:checked:bg-[#346CD2]"
          />
          <Label
            htmlFor="r1"
            className="text-white mx-auto text-opacity-70 text-[8px] md:text-[12px] lg:text-[14px]"
          >
            Paypal
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="card"
            id="r2"
            className="border-white text-[#346CD2] checked:bg-transparent checked:border-white hover:bg-transparent after:checked:bg-[#346CD2]"
          />
          <Label
            htmlFor="r2"
            className="text-white mx-auto text-opacity-70 text-[8px] md:text-[12px] lg:text-[14px]"
          >
            Credit / Debit Card
          </Label>
        </div>
      </RadioGroup>
      <div className="border border-white h-[108px] sm:h-[120px] md:h-[150px] lg:h-[160px] xl:h-[183px] border-opacity-70"></div>

      <p className="text-white text-opacity-70 text-[8px] md:text-[12px] lg:text-[14px] py-[1em]">
        We use your personal data to process your order, enhance your experience
        on this site, and for other purposes outlined in our privacy policy.
      </p>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={isCheckboxChecked}
          onCheckedChange={(checked) => setIsCheckboxChecked(checked)}
          className="border-white h-3 w-3 md:h-5 md:w-5 peer text-[#346CD2]"
        />
        <label
          htmlFor="terms"
          className="text-white text-[8px] md:text-[12px] lg:text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have read and agree to the website terms and conditions *
        </label>
      </div>

      <Button
        variant="gaming"
        className="h-max w-full text-[18px] text-black px-[1em] py-[0.5em] mt-8"
        disabled={!isCheckboxChecked || totalPrice < 0}
        onClick={placedOrder}
      >
        Place Order
      </Button>
    </div>
  );
};

export default OrderDetails;
