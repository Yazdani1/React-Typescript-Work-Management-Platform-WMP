import React, { FC } from "react";
//Custom
import ecommerceItemCard from "./ECommerce.module.css";
import { ECommerceItem } from "../../Dataprovider";

interface ECommerceItemCardProps {
  eitem: ECommerceItem;
}

const ECommerceItemCard: FC<ECommerceItemCardProps> = ({ eitem }) => {
  return (
    <div className={ecommerceItemCard.eitemContainer}>
      <h4>{eitem.title}</h4>
      <p>{eitem.price}</p>
      <p>{eitem.ecategoryid.ecategoryname}</p>
      <p>{eitem.ecategoryid._id}</p>
    </div>
  );
};
export default ECommerceItemCard;
