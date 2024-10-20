import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { mainFilter } from "../../utils/types/CommonTypes";
import { useDispatch } from "react-redux";
import { setMainFilter } from "../../Redux/FilterPropsRedux/FilterPropsActions";

const FilterBar = () => {
  const storedata = useSelector((state: any) => state.filterProps);
  const dispatch = useDispatch();

  const handleFilterChange = (payload: mainFilter) => {
    if (storedata.mainFilter == payload) return;
    dispatch(setMainFilter(payload));
  };

  return (
    <>
      <div className="filterbar_container">
        <span className="filter_label">Filter By:</span>
        <span
          className={classNames("flter_item", {
            selected_filter: storedata.mainFilter == "unread",
          })}
          onClick={() => handleFilterChange("unread")}
        >
          Unread
        </span>
        <span
          className={classNames("flter_item", {
            selected_filter: storedata.mainFilter == "read",
          })}
          onClick={() => handleFilterChange("read")}
        >
          Read
        </span>
        <span
          className={classNames("flter_item", {
            selected_filter: storedata.mainFilter == "favorite",
          })}
          onClick={() => handleFilterChange("favorite")}
        >
          Favorites
        </span>
      </div>
    </>
  );
};

export default FilterBar;
