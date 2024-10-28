import { FaDollarSign } from "react-icons/fa";
import { PiListStarFill } from "react-icons/pi";
import { TbUserFilled } from "react-icons/tb";
import { RiBox3Fill } from "react-icons/ri";

import Greeting from "./_components/Greeting";
import Summary from "./_components/Summary";
import TopCustomers from "./_components/TopCustomers";

const summary = [
  {
    icon: <FaDollarSign />,
    title: "Total Earning",
    value: 2665.0,
  },
  {
    icon: <PiListStarFill />,
    title: "Total Orders",
    value: 20,
  },
  {
    icon: <TbUserFilled />,
    title: "Total Customers",
    value: 100,
  },
  {
    icon: <RiBox3Fill />,
    title: "Total Products",
    value: 200,
  },
];

const Dashboard = () => {
  return (
    <section className="font-primaryFont text-white px-[36px]">
      <Greeting />
      <div className="grid md:grid-cols-2 md:gap-[16px] lg:gap-[18px] xl:gap-[22px] 2xl:gap-[24px]">
        <div>
          <Summary summary={summary} />
          <div className="w-full h-[15em] bg-black/40 my-[24px] border border-[#0D6D49] rounded-sm"></div>
        </div>
        <div>
          <TopCustomers />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
