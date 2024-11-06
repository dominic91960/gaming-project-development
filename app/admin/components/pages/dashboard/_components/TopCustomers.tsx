import CustomerCard from "./CustomerCard";

interface Customers {
  profilePic: string;
  username: string;
  name: string;
  orders: number;
}

interface TopCustomersProps {
  customers: Customers[] | null;
}

const TopCustomers: React.FC<TopCustomersProps> = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <div>No top customers available.</div>;
  }

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
