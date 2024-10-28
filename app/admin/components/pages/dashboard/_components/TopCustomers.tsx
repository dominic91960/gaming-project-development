import CustomerCard from "./CustomerCard";

import samplePic from "@/public/images/sample-pic.png";

const customers = [
  {
    profilePic: samplePic.src,
    username: "Apex67",
    name: "Dominic Brian",
    orders: "3",
  },
  {
    profilePic: samplePic.src,
    username: "PixelPirate",
    name: "Samantha Chen",
    orders: "5",
  },
  {
    profilePic: samplePic.src,
    username: "RetroRider",
    name: "Carlos Rivera",
    orders: "2",
  },
  {
    profilePic: samplePic.src,
    username: "CyberKnight",
    name: "Elena Gomez",
    orders: "8",
  },
  {
    profilePic: samplePic.src,
    username: "LootLord",
    name: "Michael Jordan",
    orders: "1",
  },
  {
    profilePic: samplePic.src,
    username: "QuestMaster",
    name: "Natalie Brooks",
    orders: "4",
  },
];

const TopCustomers = () => {
  return (
    <div className="w-full bg-black/40 text-[11px] my-[2em] p-[1em] border border-[#0D6D49] rounded-sm sm:text-[14px] md:text-[17px] md:my-0 lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
      <h2 className="font-bold">Top Customers</h2>
      <div className="grid grid-cols-3 gap-[5px] 2xl:gap-[13px]">
        {customers.map(({ profilePic, username, name, orders }, index) => (
          <CustomerCard
            key={index}
            profilePic={profilePic}
            username={username}
            name={name}
            orders={orders}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCustomers;
