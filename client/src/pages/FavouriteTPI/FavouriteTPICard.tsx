import React, { FC, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
//Custom
import { FavouriteTPI } from "../../Dataprovider";
import favouriteTPICardStyle from "./FavouriteTPICard.module.css";
import CardLayout from "../../components/CardLayout";
import DropDownCard from "../../components/DropDownCard";
import { deleteFavouriteTPI } from "../../API";
import ConfirmModal from "../../components/Modal/ConfirmModal";

interface FavouriteTPICardProps {
  tpi_info: FavouriteTPI;
  loadFavouriteTPI: () => void;
}

const FavouriteTPICard: FC<FavouriteTPICardProps> = ({
  tpi_info,
  loadFavouriteTPI,
}) => {
  //////////////////////////////////////////////////////
  //////////       Delete Favourite TPI  ///////////////
  //////////////////////////////////////////////////////

  const onClickDeleteFavouriteTPI = async () => {
    try {
      const res = await deleteFavouriteTPI(tpi_info?._id);

      if (res) {
        toast.success("Favourite TPI Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadFavouriteTPI();
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
    <CardLayout backgroun_color="white">
      <div className={favouriteTPICardStyle.favouriteTPIContainer}>
        {tpi_info.tpi_id?.tpi_name ? (
          <div className={favouriteTPICardStyle.itemRow}>
            <h6>{tpi_info.tpi_id?.tpi_name}</h6>
            <DropDownCard
              // handleUpdateOnOpenModal={handleUpdateOnOpenModal}
              deleteSingleItem={() => handleOpenConfirmModalBox()}
            />
          </div>
        ) : (
          <div className={favouriteTPICardStyle.itemRow}>
            <h6 style={{ background: "red" }}>This tpi has been removed</h6>
            <DropDownCard
              // handleUpdateOnOpenModal={handleUpdateOnOpenModal}
              deleteSingleItem={() => handleOpenConfirmModalBox()}
            />
          </div>
        )}

        <Link to={"/tpi-details/" + tpi_info.tpi_id?.slug}>
          <p>{tpi_info.tpi_id?.slug}</p>
        </Link>
      </div>

      <ConfirmModal
        openConfirmModal={openConfirmModalBox}
        onCloseModal={handleCloseConfirmModalBox}
        showActionButton={true}
        onConfirmButton={onClickDeleteFavouriteTPI}
      >
        <h5>Are you sure you want to delete this item?</h5>
      </ConfirmModal>
    </CardLayout>
  );
};

export default FavouriteTPICard;
