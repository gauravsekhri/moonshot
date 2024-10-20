import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer";
import classNames from "classnames";
import FilterBar from "../FilterBar";
import ListContainer from "../ListContainer";
import EmailDisplay from "../EmailDisplay";

const AppLayout = () => {
  const selectedId = useSelector(
    (state: RootState) => state.filterProps.selectedEmail.id
  );

  return (
    <>
      <div
        className={classNames("main_container", {
          "master-slave": selectedId.length > 0,
        })}
      >
        <FilterBar />
        <div className="inner_cont">
          <div className="left_cont">
            <ListContainer />
          </div>
          {selectedId.length > 0 && (
            <div className="right_cont">
              <EmailDisplay />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppLayout;
