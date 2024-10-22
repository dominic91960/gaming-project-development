import { Label } from "@radix-ui/react-label";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

function BillingDetailsForm() {
  return (
    <div className="flex flex-col flex-1 z-20 text-white">
      <h1 className="text-[13px] md:text-[18px] lg:text-[22px] xl:text-[25px] font-semibold mb-[2em]">
        Billing details
      </h1>
      <form
        action=""
        className="text-[10px] md:text-[12px] lg:text-[15px] xl:text-[18px] font-medium"
      >
        <div className="flex flex-col gap-y-[2em] lg:gap-y-[1em]">
          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Label className="">First Name</Label>
              <Input
                type="text"
                name="firstName"
                className=" border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
            </div>

            <div className="flex flex-col gap-y-1 w-full">
              <Label className="">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label className="">Email</Label>
            <Input
              type="email"
              name="email"
              className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
            />
          </div>

          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Label className="">Phone</Label>
              <Input
                type="tel"
                name="phone"
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
            </div>

            <div className="flex flex-col gap-y-1 w-full">
              <Label className="">Country</Label>
              <Input
                type="text"
                name="country"
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label className="">Street Address</Label>
            <Input
              type="text"
              name="streetAddress"
              className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
            />
          </div>

          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Label className="">City</Label>
              <Input
                type="text"
                name="city"
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
            </div>

            <div className="flex flex-col gap-y-1 w-full">
              <Label className="">Zip Code</Label>
              <Input
                type="text"
                name="zipCode"
                className="border-[#0BDB45] border-[0.5px] text-white rounded-none h-[2em] bg-opacity-70"
              />
            </div>
          </div>

          <h1 className="text-[13px] md:text-[18px] lg:text-[22px] xl:text-[25px] font-semibold pt-[1em]">
            Additional information
          </h1>

          <div className="flex flex-col gap-y-1">
            {/* <Label className="">Type Your Message</Label> */}
            <Textarea
              name="message"
              className="border-[#0BDB45] border-[0.5px] text-white rounded-none bg-opacity-70"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BillingDetailsForm;
