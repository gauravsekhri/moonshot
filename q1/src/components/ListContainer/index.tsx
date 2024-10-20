import React, { useEffect, useState } from "react";
import ListItem from "../ListItem";
import { IEmailListItem } from "../../utils/interfaces/CommonInterfaces";
import { getAllEmails, getEmailsByPage } from "../../utils/apiHelper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../Redux/FilterPropsRedux/FilterPropsActions";
import { RootState } from "../../Redux/rootReducer";

const ListContainer = () => {
  const dispatch = useDispatch();

  const storedata: RootState = useSelector((state: any) => state);
  const currentPage = storedata.filterProps.currentPage;
  const readEmails = storedata.metaData.readEmails;
  const favEmails = storedata.metaData.favEmails;
  const rowsPerPage = 10;

  const [emailsList, setEmailsList] = useState<IEmailListItem[]>([]);
  const [totalEmails, setTotalEmails] = useState<number>(0);

  const getList = async (newPage?: number) => {
    const apiResp = await getAllEmails();
    // setTotalEmails(apiResp.total);
    setEmailsList(apiResp.list);
  };

  const getFilteredList = () => {
    switch (storedata.filterProps.mainFilter) {
      case "unread":
        return emailsList.filter((ele) => !readEmails.includes(ele.id));
      case "read":
        return emailsList.filter((ele) => readEmails.includes(ele.id));
      case "favorite":
        return emailsList.filter((ele) => favEmails.includes(ele.id));
      default:
        return emailsList;
    }
  };

  const visibleList = React.useMemo(() => {
    let reqList = getFilteredList();
    setTotalEmails(reqList.length);
    return reqList.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
  }, [currentPage, emailsList, storedata.filterProps.mainFilter, currentPage]);

  const handleNext = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevious = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className="list_scroll_area">
        {visibleList.length > 0 ? (
          <>
            {visibleList.map((ele) => (
              <ListItem {...ele} />
            ))}
          </>
        ) : (
          <div className="no_data">No data found</div>
        )}
      </div>

      <div className="pagination_cont">
        <div>
          Showing {visibleList.length > 0 ? currentPage * rowsPerPage + 1 : 0} -{" "}
          {rowsPerPage * currentPage + visibleList.length} of {totalEmails}
        </div>
        <div className="page_btns">
          <button onClick={() => handlePrevious()} disabled={currentPage == 0}>
            Prev
          </button>
          <button
            onClick={() => handleNext()}
            // disabled={totalEmails - rowsPerPage * currentPage <= 0}
            disabled={visibleList.length != rowsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ListContainer;
