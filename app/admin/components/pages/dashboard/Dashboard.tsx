import Greeting from "./_components/Greeting";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

// const summary = [
//   {
//     icon: <RiMoneyDollarCircleFill />,
//     title: "Total Earning",
//     value: 2665.0,
//   },
// ];

const Dashboard = () => {
  return (
    <section className="font-primaryFont text-white px-[36px]">
      <Greeting />
      <div className="grid grid-cols-2"></div>
    </section>
  );
};

export default Dashboard;
