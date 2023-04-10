import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import ModalBox from "../../components/Modal Package/ModalBox";
import { TPIItems } from "../../Dataprovider";
import {
  CreateTPIItems,
  getTpiItems,
  createTPIItems,
  CreateTPIItemsProps,
} from "../../API";
import TpiItemsCard from "./TpiItemsCard";

const TpiItems = () => {
  /****************************************/
  /*** Modal Box to Show Single Post *****/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  /****************************************/
  /*** To add multiple items in array  *****/
  /****************************************/

  const [tpi_item_title, setTpi_item_title] = useState<string>("");
  const [tpi_item_value, setTpi_item_value] = useState<string>("");
  const [tpi_item_details, setTpi_item_details] = useState<string>("");
  // This tpiItemData will hold all the array data
  const [tpiItemData, setTpiItemData] = useState<CreateTPIItems[]>([]);

  const handleTpiItemTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTpi_item_title(event.target.value);
  };

  const handleTpiItemValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTpi_item_value(event.target.value);
  };

  const handleTpiItemDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTpi_item_details(event.target.value);
  };

  const handleAddTpiItem = () => {
    const newTpiInfo = {
      title: tpi_item_title,
      value: parseInt(tpi_item_value),
      details: tpi_item_details,
    };
    setTpiItemData([...tpiItemData, newTpiInfo]);

    // Clear the form inputs when user add one items

    setTpi_item_title("");
    setTpi_item_value("");
    setTpi_item_details("");
  };

  // to remove item from the array - when user click on the delete button it will remove one item

  const removeTPIItem = (index: number) => {
    setTpiItemData(tpiItemData.filter((el: any, t: number) => t !== index));
  };

  /****************************************/
  /*** To create tpi items  ***************/
  /****************************************/

  const [tpiItemName, setTpiItemName] = useState<string>("");

  const onCreateTPIItems = async () => {
    try {
      const payload: CreateTPIItemsProps = {
        tpi_Item_Name: tpiItemName,
        tpi_item_info: tpiItemData,
      };

      const res = await createTPIItems(payload);

      if (res) {
        toast.success("TPI Item Created Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllTPIItems();
        resetInput();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const resetInput = () => {
    setTpiItemName("");

    setTpiItemData([]);
  };

  /****************************************/
  /*** To load all TPI Items   ************/
  /****************************************/

  const [allTpiItems, setAllTpiItems] = useState<TPIItems[]>([]);

  const loadAllTPIItems = async () => {
    try {
      const res = await getTpiItems();

      if (res) {
        setAllTpiItems(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllTPIItems();
  }, []);

  return (
    <PageLayout>
      <React.Fragment>
        <CardLayout backgroun_color="white">
          <button onClick={onOpenModal} className="btn btn-primary">
            Add TPI Items
          </button>
        </CardLayout>

        {/* To show list of TPI items */}

        {allTpiItems &&
          allTpiItems.map((item) => (
            <TpiItemsCard
              tpiItem={item}
              key={item._id}
              loadTpiArrayItems={loadAllTPIItems}
            />
          ))}

        {/* Modal box to create tpi items */}

        <ModalBox
          title="Create Tpi Items"
          open={open}
          onCloseModal={onCloseModal}
          showActionButton={true}
          onSaveButton={onCreateTPIItems}
          onResetButton={resetInput}
        >
          <div>
            {/* To add tpi items name */}
            <div style={{ width: "750px" }}>
              <label>TPI Items Name:</label>
              <input
                type="text"
                className="form-control"
                value={tpiItemName}
                onChange={(e) => setTpiItemName(e.target.value)}
              />
            </div>
            <label>Add Multiple Items:</label>
            <hr />

            {/* To show the header of the row item if user added data in the array */}

            {tpiItemData.length > 0 && <TPIItemHeaderRow />}

            {/* To show the added item from the array */}

            <div className="row">
              {tpiItemData &&
                tpiItemData.map((item, index: number) => (
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
                      </div>
                      <div className="col-xl-3 col-lg-3">
                        <button
                          onClick={() => removeTPIItem(index)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* To add multiple items */}
            <div className="row">
              <div className="col-xl-3 col-lg-3">
                <div>
                  <label>Title:</label>

                  <input
                    type="text"
                    className="form-control"
                    value={tpi_item_title}
                    onChange={handleTpiItemTitle}
                  />
                </div>
              </div>

              <div className="col-xl-3 col-lg-3">
                <div>
                  <label>Value:</label>

                  <input
                    type="number"
                    className="form-control"
                    value={tpi_item_value}
                    onChange={handleTpiItemValue}
                  />
                </div>
              </div>

              <div className="col-xl-3 col-lg-3">
                <div>
                  <label>Details:</label>

                  <input
                    type="text"
                    className="form-control"
                    value={tpi_item_details}
                    onChange={handleTpiItemDetails}
                  />
                </div>
              </div>

              <div className="col-xl-3 col-lg-3">
                <div style={{ height: "200px" }}>
                  <button
                    className="btn btn-success"
                    onClick={handleAddTpiItem}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBox>
      </React.Fragment>
    </PageLayout>
  );
};

export default TpiItems;

// The header of the item row

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
