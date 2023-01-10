import React, { FC } from "react";
import moment from "moment";

import { OnlineStoreInfo } from "../../Dataprovider";
import style from "./OnlineStoreCard.module.scss";

interface OnlineStoreCardProps {
  online_store: OnlineStoreInfo;
}

const OnlineStoreCard: FC<OnlineStoreCardProps> = ({ online_store }) => {
  

  /****************************************/
  /**Show New or Old Tag based on date*******/
  /****************************************/


  const getPostTag = (date: any) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 1);

    if (date >= twoDaysAgo) {
      return "New";
    } else {
      return "Old";
    }
  };

  return (
    <div className={style.onlineStoreCardContainer}>
      <div className={style.onlineStorePhoto}>
        {online_store.photo.map((p) => (
          <img src={p} />
        ))}
      </div>

      <div className={style.onlineStoreDetailsInfo}>
        <h6>{online_store.title}</h6>
        <p>{online_store.des.substring(0, 700)}</p>

        <h3>{online_store.price}.EUR</h3>
        <p>{moment(online_store.date).format("MMMM Do YYYY, h:mm:ss a")}</p>

        <div className={style.tagDesign}>
          {getPostTag(new Date(online_store.date))}
          </div>
      </div>
    </div>
  );
};

export default OnlineStoreCard;
