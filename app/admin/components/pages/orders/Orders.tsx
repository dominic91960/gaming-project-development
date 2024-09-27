import PageTable from "../../PageTable";
import PageTitle from "../../PageTitle";
import PaginationTab from "../../PaginationTab";

function Orders() {
  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md">
      <PageTitle title="All orders" subtitle="Orders" />
      <PageTable
        title="Orders"
        buttonText="Add order"
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
}

export default Orders;
