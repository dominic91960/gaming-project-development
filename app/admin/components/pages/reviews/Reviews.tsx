import PageTable from "../../PageTable";
import PageTitle from "../../PageTitle";
import PaginationTab from "../../PaginationTab";

function Reviews() {
  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md">
      <PageTitle title="All reviews" subtitle="Reviews" />
      <PageTable title="Reviews" buttonText="" buttonFunction={() => {}}>
        <p>content goes here</p>
      </PageTable>
      <PaginationTab
        showDeleteButtonGroup={false}
        showStatusButtonGroup={true}
        totalSelections={0}
      />
    </div>
  );
}

export default Reviews;
