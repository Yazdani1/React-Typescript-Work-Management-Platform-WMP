import React, { FC, useState } from "react";

import ecommerceCategoryStyle from "./ECommerce.module.css";
import { ECommerceCategory } from "../../Dataprovider";

interface ECommerceCategoryCardProps {
  ecategory: ECommerceCategory;
  selectCategoryID: (catid: string) => void;
  ecategoryListId?: string[];
}

const ECommerceCategoryCard: FC<ECommerceCategoryCardProps> = ({
  ecategory,
  selectCategoryID,
  ecategoryListId,
}) => {
  return (
    <div className={ecommerceCategoryStyle.eCategoryCard}>
      <label>
        {ecategoryListId?.includes(ecategory._id) ? (
         <>
          <input
            type="checkbox"
            checked={true}
            onChange={() => selectCategoryID(ecategory._id)}
          />
         </>
        ) : (
          <input
            type="checkbox"
            onChange={() => selectCategoryID(ecategory._id)}
          />
        )}

        {ecategory.ecategoryname}
      </label>
    </div>
  );
};

export default ECommerceCategoryCard;
