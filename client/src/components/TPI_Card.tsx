import React, { FC, useState } from "react";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CgExpand } from "react-icons/cg";

import Modal from "../components/Modal/Modal";
import { TPI } from "../Dataprovider";
import { CreateFavouriteTPIProps, createFavouriteTPI } from "../API";
import TPICardStyle from "./TPI_Card.module.css";
import DropDownCard from ".././components/DropDownCard";

interface TPI_CardProps {
  tpi: TPI;
  deleteSingleTPI: (id: string) => void;
}

const TPI_Card: FC<TPI_CardProps> = ({ tpi, deleteSingleTPI, }) => {
  // to show modal box to edit tpi
  const [openUpdateModal, setUpdateOpenModal] = useState<boolean>(false);

  const handleUpdateOnClose = () => {
    setUpdateOpenModal(false);
  };

  const handleUpdateOnOpenModal = () => {
    setUpdateOpenModal(true);
  };

  // to show details post modal

  const [showDetailsTPI, setShowDetailsTPI] = useState<boolean>(false);

  const handleOpenTPIDetailsModal = () => {
    setShowDetailsTPI(true);
  };

  const handleCloseTPIDetailsModal = () => {
    setShowDetailsTPI(false);
  };

  //////////////////////////////////////////////////////
  ////////// To save favourite tpi       ///////////////
  //////////////////////////////////////////////////////

  const handleSaveFavouriteTPI = async (tpiId: string) => {
    try {
      const payload: CreateFavouriteTPIProps = { tpi_id: tpiId };
      const res = await createFavouriteTPI(payload);
      if (res) {
        toast.success("TPI Saved Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className={TPICardStyle.tpicard}>
      <div className={TPICardStyle.tpiTitleRow}>
        <Link to={"/tpi-details/" + tpi?.slug}>
          <h6>{tpi.tpi_name.substring(0, 40)}</h6>
        </Link>
        <p onClick={handleOpenTPIDetailsModal}>
          <CgExpand size={20} />
        </p>
      </div>
      <div className={TPICardStyle.itemRow}>
        <p> {moment(tpi.date).format("MMM Do YY")}</p>
        <DropDownCard
          handleUpdateOnOpenModal={handleUpdateOnOpenModal}
          deleteSingleItem={() => deleteSingleTPI(tpi._id)}
          save={()=>handleSaveFavouriteTPI(tpi._id)}
        />
      </div>
      {/* this modal is to update tpi name */}
      <Modal
        open={openUpdateModal}
        onClose={handleUpdateOnClose}
        title="Update TPI"
        showActionButton={true}
      >
        <div className={TPICardStyle.tpi_update_form}>
          <label>TPI Name:</label>
          <input
            type="text"
            className="form-control"
          />
        </div>
      </Modal>
      {/* this modal is to show details post for single TPI */}
      <Modal
        open={showDetailsTPI}
        onClose={handleCloseTPIDetailsModal}
        title="TPI Details Post"
      >
        <div className={TPICardStyle.tpi_update_form}>
          <p>{tpi.tpi_name}</p>
        </div>
      </Modal>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default TPI_Card;
