import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getEmailById } from "../../utils/apiHelper";
import { useSelector } from "react-redux";
import { IEmailApiResp } from "../../utils/interfaces/CommonInterfaces";
import { useDispatch } from "react-redux";
import {
  setFavEmails,
  setReadEmails,
} from "../../Redux/EmailsRedux/EmailActions";
import classNames from "classnames";
import { formatDate } from "../../utils/helperFunctions";
import { RootState } from "../../Redux/rootReducer";

const EmailDisplay = () => {
  const dispatch = useDispatch();

  const storedata: RootState = useSelector((state: any) => state);
  const favEmails = storedata.metaData.favEmails;
  const readEmails = storedata.metaData.readEmails;

  const {
    date,
    from: { email, name },
    id,
    short_description,
    subject,
  }: RootState["filterProps"]["selectedEmail"] = storedata.filterProps
    .selectedEmail;

  const [emaildata, setEmailData] = useState<IEmailApiResp>({
    id: "1",
    body: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const sample = {
  //     id: "3",
  //     body: "<div><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>",
  //   };

  //   const getEmailData = async (id?:number) => {
  //     const data = await getEmailById(id ?? storedata.selectedEmailId);
  //     setEmailData(data)
  //   }

  //   const addTodo = useCallback(() => {
  //     getEmailData()
  //   }, [storedata.selectedEmailId]);

  const getBody = async () => {
    setIsLoading(true);
    const data = await getEmailById(parseInt(id));
    setEmailData(data);
    seenEmail();
    setIsLoading(false);
    return data;
  };

  //   const emailBody: any = useMemo(async () => {
  //     return await getBody();
  //   }, [storedata]);

  useEffect(() => {
    getBody();
  }, [id]);

  //   console.log(emailBody);

  const favToggle = () => {
    if (!id) return;

    let existingList = JSON.parse(JSON.stringify(favEmails));

    if (existingList.includes(id)) {
      let ind = existingList.findIndex((ele: string) => ele == id);
      existingList.splice(ind, 1);
    } else {
      existingList.push(id);
    }

    dispatch(setFavEmails(existingList));
  };

  const seenEmail = () => {
    if (!id) return;

    let existingList = JSON.parse(JSON.stringify(readEmails));

    if (!existingList.includes(id)) {
      existingList.push(id);
    }

    dispatch(setReadEmails(existingList));
  };

  const isFavorite = favEmails.includes(id);
  const dateString = useMemo(() => formatDate(date), [date]);

  return (
    <>
      <div className="email_container_outer">
        <div className="avatar_cont">
          <div className="avatar">GS</div>
        </div>
        <div className="email_cont_inner">
          <div className="email_header">
            <h1>{name}</h1>
            <button
              className={classNames("fav_btn", {
                unfav: isFavorite,
              })}
              onClick={favToggle}
            >
              {isFavorite ? "Remove from favorite" : "Mark as Favorite"}
            </button>
          </div>
          <div className="date_text">{dateString}</div>
          {isLoading ? (
            <div className="loading_body">Loading...</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: emaildata.body }}></div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailDisplay;
