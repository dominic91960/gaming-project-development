import PageTable from "../../PageTable";
import PageTitle from "../../PageTitle";
import PaginationTab from "../../PaginationTab";

const platforms = () => {
  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md">
      <PageTitle title="All platforms" subtitle="Products/platforms" />
      <PageTable
        title="platforms"
        buttonText="Add platform"
        buttonFunction={() => {}}
      >
        <p>content goes here</p>
      </PageTable>
      <PaginationTab
        showDeleteButtonGroup={true}
        showStatusButtonGroup={false}
        totalSelections={0}
      />
    </div>
  );
};

export default platforms;
