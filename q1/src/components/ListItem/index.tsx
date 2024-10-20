import React, { useCallback, useMemo } from "react";
import { IEmailListItem } from "../../utils/interfaces/CommonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { formatDate } from "../../utils/helperFunctions";
import { setSelectedEmailProps } from "../../Redux/FilterPropsRedux/FilterPropsActions";
import { RootState } from "../../Redux/rootReducer";

const ListItem = (props: IEmailListItem) => {
  const {
    from: { email, name },
    id,
    short_description,
    subject,
    date,
  } = props;

  const dispatch = useDispatch();
  const storedata: RootState = useSelector((state: any) => state);

  const handleEmailSelect = () => {
    dispatch(setSelectedEmailProps(props));
  };

  const isFavEmail = storedata.metaData.favEmails.includes(id);
  const isEmailSeen = storedata.metaData.readEmails.includes(id);

  const dateString = useMemo(() => formatDate(date), [date]);

  return (
    <>
      <div
        className={classNames("item_container", {
          "selected-item": storedata.filterProps.selectedEmail.id == id,
          unread: !isEmailSeen,
        })}
        onClick={handleEmailSelect}
      >
        <div className="avatar_cont">
          <div className="avatar">GS</div>
        </div>
        <div className="details_cont">
          <div>
            From: <b>{`${name} <${email}>`}</b>
          </div>
          <div>
            Subject: <b>{subject}</b>
          </div>
          <div className="text_preview">{short_description}</div>
          <div className="item_footer">
            <div className="item_date">{dateString}</div>
            {isFavEmail && <div className="fav_item">Favourite</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
