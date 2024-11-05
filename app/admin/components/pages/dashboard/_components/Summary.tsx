import React from "react";

import { FaDollarSign } from "react-icons/fa";
import { PiListStarFill } from "react-icons/pi";
import { TbUserFilled } from "react-icons/tb";
import { RiBox3Fill } from "react-icons/ri";

import SummaryCard from "./SummaryCard";

interface SummaryProps {
  summary: {
    totalEarning: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
  };
}

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  const { totalEarning, totalOrders, totalCustomers, totalProducts } = {
    ...summary,
  };

  function formatValue(value: number, isFixed: boolean) {
    let formattedValue = isFixed ? value.toFixed(2) : value.toString();

    if (value >= 1000 && value < 1000000) {
      value = value / 1000;
      formattedValue = value.toFixed(2) + "K";
    }

    if (value >= 1000000) {
      value = value / 1000000;
      formattedValue = value.toFixed(2) + "M";
    }

    return formattedValue;
  }

  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <SummaryCard
        icon={<FaDollarSign />}
        title="Total Earning"
        value={formatValue(totalEarning, true)}
      />
      <SummaryCard
        icon={<PiListStarFill />}
        title="Total Orders"
        value={formatValue(totalOrders, false)}
      />
      <SummaryCard
        icon={<TbUserFilled />}
        title="Total Customers"
        value={formatValue(totalCustomers, false)}
      />
      <SummaryCard
        icon={<RiBox3Fill />}
        title="Total Products"
        value={formatValue(totalProducts, false)}
      />
    </div>
  );
};

export default Summary;
