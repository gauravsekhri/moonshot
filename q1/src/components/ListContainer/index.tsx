import React, { useEffect, useState } from "react";
import ListItem from "../ListItem";
import { IEmailListItem } from "../../utils/interfaces/CommonInterfaces";
import { getEmailsByPage } from "../../utils/apiHelper";
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
    const apiResp = await getEmailsByPage(newPage ?? currentPage);
    setTotalEmails(apiResp.total);
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
    return getFilteredList();
  }, [currentPage, emailsList, storedata.filterProps.mainFilter]);

  const handleNext = () => {
    getList(currentPage + 1);
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevious = () => {
    getList(currentPage - 1);
    dispatch(setCurrentPage(currentPage - 1));
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className="list_scroll_area">
        {visibleList.map((ele) => (
          <ListItem {...ele} />
        ))}
      </div>

      <div className="pagination_cont">
        <div>
          Showing 1- {rowsPerPage * (currentPage - 1) + visibleList.length} of{" "}
          {totalEmails}
        </div>
        <div className="page_btns">
          <button onClick={() => handlePrevious()} disabled={currentPage <= 1}>
            Prev
          </button>
          <button
            onClick={() => handleNext()}
            disabled={totalEmails - rowsPerPage * currentPage <= 0}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ListContainer;
