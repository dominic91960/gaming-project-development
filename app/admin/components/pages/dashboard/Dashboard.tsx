import { FaDollarSign } from "react-icons/fa";
import { PiListStarFill } from "react-icons/pi";
import { TbUserFilled } from "react-icons/tb";
import { RiBox3Fill } from "react-icons/ri";

import Greeting from "./_components/Greeting";
import Summary from "./_components/Summary";

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
      <div className="grid sm:grid-cols-2">
        <Summary summary={summary} />
      </div>
    </section>
  );
};

export default Dashboard;
