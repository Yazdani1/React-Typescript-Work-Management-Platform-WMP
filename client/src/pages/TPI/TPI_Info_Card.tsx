import React, { FC, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

//Custom
import styletpiInfoCard from "./TPI_Info_Card.module.css";
import { TPIInfo } from "../../Dataprovider";
import DropDownCard from "../../components/DropDownCard";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { deleteTPIInfo } from "../../API";
import Modal from "../../components/Modal/Modal";
import WM_CardStyle from "../../components/WM_Card.module.css";
import { UpdateTPIInfo, updateTPIInfo } from "../../API";

interface TPI_Info_CardProps {
  tpiinfo: TPIInfo;
  loadAllTPIInfo: () => void;
}
const TPI_Info_Card: FC<TPI_Info_CardProps> = ({ tpiinfo, loadAllTPIInfo }) => {
  //////////////////////////////////////////////////////
  ////////// TPI Info Delete      //////////////////////
  //////////////////////////////////////////////////////
  const onSubmitDeleteTPIInfo = async (id: string) => {
    try {
      const res = await deleteTPIInfo(id);

      if (res) {
        toast.success("TPI Info deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllTPIInfo();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// Confirm Modal Box for delete //////////////
  //////////////////////////////////////////////////////

  const [openConfirmModalBox, setOpenConfirmModalBox] = useState(false);
  const handleCloseConfirmModalBox = () => {
    setOpenConfirmModalBox(false);
  };
  const handleOpenConfirmModalBox = () => {
    setOpenConfirmModalBox(true);
  };

  //////////////////////////////////////////////////////
  ////////// To show update tpi info  modal ////////////
  //////////////////////////////////////////////////////
  const [openUpdateModal, setUpdateOpenModal] = useState(false);
  const handleUpdateOnClose = () => {
    setUpdateOpenModal(false);
  };
  const handleUpdateOnOpenModal = () => {
    setUpdateOpenModal(true);
  };
  //////////////////////////////////////////////////////
  ////////// Update  TPI Info        ///////////////////
  //////////////////////////////////////////////////////

  const [tpiInfoMessage, setTpiInfoMessage] = useState<string>("");
  const [tpiInfoIssues, setTpiInfoIssues] = useState<string>("");
  const [tags, setTags] = useState<string[] | any>([]);

  // to add tag for responsible field
  const addTags = (e: any) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };
  // to remove tags
  const removeTag = (index: any) => {
    setTags(tags.filter((el: any, t: any) => t !== index));
  };
  const onSubmitUpdateTPIInfo = async () => {
    try {
      const payload: UpdateTPIInfo = {
        message: tpiInfoMessage,
        issues: tpiInfoIssues,
        responsible: tags,
      };
      const res = await updateTPIInfo(tpiinfo._id, payload);
      if (res) {
        toast.success("TPI Info Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllTPIInfo();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  useEffect(() => {
    setTpiInfoMessage(tpiinfo.message);
    setTpiInfoIssues(tpiinfo.issues);
    setTags(tpiinfo.responsible);
  }, []);

  return (
    <div className={styletpiInfoCard.tpi_Info_Container}>
      <div>
        <h6>Message: {tpiinfo.message}</h6>
        <p>Issues: {tpiinfo.issues}</p>
        <div className={styletpiInfoCard.tagContainer}>
          {tpiinfo.responsible.map((r, index) => (
            <div className={styletpiInfoCard.tags}>
              <p>{r}</p>
            </div>
          ))}
        </div>
        {tpiinfo.updatedAt ? (
          <p style={{ textDecoration: "line-through" }}>
            {moment(tpiinfo.date).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        ) : (
          <p>
            {moment(tpiinfo.date).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        )}
        {tpiinfo.updatedAt && (
          <p>
            {moment(tpiinfo.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        )}
      </div>
      <DropDownCard
        deleteSingleItem={() => handleOpenConfirmModalBox()}
        handleUpdateOnOpenModal={handleUpdateOnOpenModal}
      />
      <ConfirmModal
        openConfirmModal={openConfirmModalBox}
        onCloseModal={handleCloseConfirmModalBox}
        showActionButton={true}
        onConfirmButton={() => onSubmitDeleteTPIInfo(tpiinfo._id)}
      >
        <h5>Are you sure you want to delete this item?</h5>
      </ConfirmModal>

      {/*//////////////////////////////////////////////////////
  ////////// Update TPI Info Modal  /////////////////////
  //////////////////////////////////////////////////////*/}

      <Modal
        open={openUpdateModal}
        onClose={handleUpdateOnClose}
        title="Update Tpi Info"
        showActionButton={true}
        onSaveButton={onSubmitUpdateTPIInfo}
      >
        <div className={WM_CardStyle.tpi_form}>
          <label>Message:</label>
          <input
            type="text"
            className="form-control"
            value={tpiInfoMessage}
            onChange={(e) => setTpiInfoMessage(e.target.value)}
          />
          <label>Issues:</label>
          <input
            type="text"
            className="form-control"
            value={tpiInfoIssues}
            onChange={(e) => setTpiInfoIssues(e.target.value)}
          />
          <label>Responsible:</label>
          <div style={{ display: "flex" }}>
            {tags &&
              tags.map((item: any, index: any) => (
                <p
                  key={index}
                  style={{
                    display: "flex",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    color: "white",
                    padding: "5px",
                    margin: "10px",
                  }}
                >
                  {item}{" "}
                  <span
                    onClick={() => removeTag(index)}
                    style={{
                      marginLeft: "10px",
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    x
                  </span>
                </p>
              ))}
          </div>
          <input type="text" className="form-control" onKeyDown={addTags} />
        </div>
      </Modal>
    </div>
  );
};

export default TPI_Info_Card;
