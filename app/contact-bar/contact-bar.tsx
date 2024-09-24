import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";

const ContactBar = () => {
  return (
    <div className="bg-[#0d0f10] border-b border-[#8C8C8C]">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 ">
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-[80px] text-white border-none">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>USD</SelectLabel>
                    <SelectItem value="apple">LKR</SelectItem>
                    <SelectItem value="banana">GBP</SelectItem>
                    <SelectItem value="blueberry">KWD</SelectItem>
                    <SelectItem value="grapes">OMR</SelectItem>
                    <SelectItem value="pineapple">CND</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[90px] text-white border-none">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>English</SelectLabel>
                    <SelectItem value="apple">French</SelectItem>
                    <SelectItem value="banana">German</SelectItem>
                    <SelectItem value="blueberry">Italian</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="col-span-4 mr-[80px] place-items-center place-self-center">
            <div className="flex items-center gap-[130px]">
              <div className="flex items-center gap-2 text-white">
                <FaPhoneAlt />
                <p className="text-white font-primaryFont font-semibold text-[11px]">
                  +94 764523876
                </p>
              </div>

              <div className="flex items-center gap-2 text-white">
                <FaRegEnvelope />
                <p className="text-white font-primaryFont font-semibold text-[11px]">
                  logo.contact@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
