import React, { FC } from "react";
import { toast } from "react-toastify";

import { TPIItems, TPIIListItemsProps } from "../../Dataprovider";
import CardLayout from "../../components/CardLayout";
import { deleteTpiItemsArrayItem } from "../../API";

interface TpiItemsCardProps {
  tpiItem: TPIItems;
  loadTpiArrayItems: () => void;
}

const TpiItemsCard: FC<TpiItemsCardProps> = ({
  tpiItem,
  loadTpiArrayItems,
}) => {
  /****************************************/
  /*** To Delete TPI Items Arry  ***********/
  /****************************************/

  const onClickDeleteTpiItemsArray = async (id: string) => {
    try {
      const res = await deleteTpiItemsArrayItem(id);

      if (res) {
        toast.success("Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadTpiArrayItems();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <CardLayout backgroun_color="white">
      <h6>{tpiItem.tpi_Item_Name}</h6>
      <hr />

      {/* To show item array data */}

      <TPIItemHeaderRow />

      {tpiItem.tpi_item_info &&
        tpiItem.tpi_item_info.map((item: TPIIListItemsProps) => (
          <div
            style={{
              border: "1px solid black",
              padding: "5px",
              margin: "5px",
              borderRadius: "5px",
            }}
          >
            <div className="row">
              <div className="col-xl-3 col-lg-3">
                <p>{item.title}</p>
              </div>
              <div className="col-xl-3 col-lg-3">
                <p>{item.value}</p>
              </div>
              <div className="col-xl-3 col-lg-3">
                <p>{item.details}</p>
                <p>{item._id}</p>
              </div>
              <div className="col-xl-3 col-lg-3">
                <button
                  className="btn btn-danger"
                  onClick={() => onClickDeleteTpiItemsArray(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </CardLayout>
  );
};

export default TpiItemsCard;

const TPIItemHeaderRow = () => {
  return (
    <div className="row">
      <div className="col-xl-3 col-lg-3">
        <h6>Title</h6>
      </div>

      <div className="col-xl-3 col-lg-3">
        <h6>Value</h6>
      </div>

      <div className="col-xl-3 col-lg-3">
        <h6>Details</h6>
      </div>

      <div className="col-xl-3 col-lg-3">
        <h6>Action</h6>
      </div>
    </div>
  );
};
