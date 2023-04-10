import React, { FC, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
//Custom
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { TPI_Summary } from "../../Dataprovider";
import TPI_Summary_Style from "./TPI_Summary_Card.module.css";
import DropDownCard from "../../components/DropDownCard";
import { deleteTPISummary } from "../../API";
import Modal from "../../components/Modal/Modal";

interface TPI_Summary_CardProps {
  tpi_summary: TPI_Summary;
  loadAllTPISummary: () => void;
}

const TPI_Summary_Card: FC<TPI_Summary_CardProps> = ({
  tpi_summary,
  loadAllTPISummary,
}) => {
  // to show update modal
  const [openUpdateModal, setUpdateOpenModal] = useState<boolean>(false);

  const handleUpdateOnClose = () => {
    setUpdateOpenModal(false);
  };

  const handleUpdateOnOpenModal = () => {
    setUpdateOpenModal(true);
  };

  // to delete tpi summary

  const onClickDeleteTPISummary = async (id: string) => {
    try {
      const res = await deleteTPISummary(id);

      if (res) {
        toast.success("TPI Summary deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllTPISummary();
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

  const [openConfirmModalBox, setOpenConfirmModalBox] = useState<boolean>(false);
  const handleCloseConfirmModalBox = () => {
    setOpenConfirmModalBox(false);
  };
  const handleOpenConfirmModalBox = () => {
    setOpenConfirmModalBox(true);
  };

  return (
    <div className={TPI_Summary_Style.tpiSummaryCard}>
      <h6>{tpi_summary.tpi_summary}</h6>
      <div className={TPI_Summary_Style.tpiSummaryItemRow}>
        <p> {moment(tpi_summary.date).format("MMM Do YY")}</p>
        <DropDownCard
          handleUpdateOnOpenModal={handleUpdateOnOpenModal}
          deleteSingleItem={() => handleOpenConfirmModalBox()}
        />
      </div>

      {/* To show update modal */}

      <Modal
        open={openUpdateModal}
        onClose={handleUpdateOnClose}
        title="Update TPI Summary"
        showActionButton={true}
      >
        <div className="Fdgfdgfd">
          <label>WM Name:</label>
          <input
            type="text"
            className="form-control"
            // value={posTitle}
            // onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
      </Modal>

      <ConfirmModal
        openConfirmModal={openConfirmModalBox}
        onCloseModal={handleCloseConfirmModalBox}
        showActionButton={true}
        onConfirmButton={() => onClickDeleteTPISummary(tpi_summary._id)}
      >
        <h5>Are you sure you want to delete this item?</h5>
      </ConfirmModal>
    </div>
  );
};

export default TPI_Summary_Card;
