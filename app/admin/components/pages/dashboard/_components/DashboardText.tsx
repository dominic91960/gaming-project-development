const DashboardText = () => {
  return (
    <div className="hidden w-full mt-[18px] font-primaryFont text-[12px] md:block 2xl:text-[16px]">
      <h1 className="font-medium leading-none text-[56px] uppercase 2xl:text-[88px]">
        Platform
      </h1>
      <h1 className="font-bold leading-none text-[62px] uppercase 2xl:text-[94px]">
        Insights
      </h1>
      <p className="font-medium text-justify lg:w-[55%] xl:w-[50%] 2xl:w-[55%]">
        Here, you can manage games, monitor users, and track the latest reviews
        and feedback. Stay updated on performance metrics and identify top-rated
        games and upcoming titles that users are excited about. Use these
        insights to help shape the gaming experience and keep players engaged.
      </p>
    </div>
  );
};

export default DashboardText;
