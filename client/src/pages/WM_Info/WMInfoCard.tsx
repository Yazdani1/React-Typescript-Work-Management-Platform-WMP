import React, { FC, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

//Custom
import styleWMInfoCard from "./WMInfoCard.module.css";
import { WMInfo } from "../../Dataprovider";
import DropDownCard from "../../components/DropDownCard";
import { WMInfoStatus } from "../../Dataprovider";
import { deleteWMInfo } from "../../API";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import wmInfoStyle from "./WMInfoCard.module.css";
import { UpdateWMInfoProps, updateWmInfoDetails } from "../../API";
import Modal from "../../components/Modal/Modal";

interface WMInfoCardProps {
  wminfo: WMInfo;
  loadAllWMInfo: () => void;
  index: number;
}

const WMInfoCard: FC<WMInfoCardProps> = ({ wminfo, loadAllWMInfo, index }) => {
  //////////////////////////////////////////////////////
  ////////// Update WM Info ////////////////////////////
  //////////////////////////////////////////////////////
  const [updateWmInfoStatus, setUpdateWmInfoStatus] = useState<any>(
    WMInfoStatus.RED
  );
  const [updateWmInfo, setUpdateWmInfo] = useState<string>("");

  const onSubmitUpdateWMInfo = async () => {
    try {
      const payload: UpdateWMInfoProps = {
        wminfo: updateWmInfo,
        status: updateWmInfoStatus,
      };

      const res = await updateWmInfoDetails(wminfo._id, payload);

      if (res) {
        toast.success("WM Info Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllWMInfo();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// Delete WM Info ////////////////////////////
  //////////////////////////////////////////////////////

  const deleteSingleWMInfo = async () => {
    try {
      const res = await deleteWMInfo(wminfo._id);

      if (res) {
        toast.success("WM Info Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        loadAllWMInfo();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// To show update     wm info modal  /////////
  //////////////////////////////////////////////////////

  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const handleUpdateOpenModal = () => {
    setOpenUpdateModal(true);
  };

  const handleUpdateCloseModal = () => {
    setOpenUpdateModal(false);
  };

  //////////////////////////////////////////////////////
  ////////// Confirm Modal Box for delete //////////////
  //////////////////////////////////////////////////////

  const [openConfirmModalBox, setOpenConfirmModalBox] =
    useState<boolean>(false);
    
  const handleCloseConfirmModalBox = () => {
    setOpenConfirmModalBox(false);
  };
  const handleOpenConfirmModalBox = () => {
    setOpenConfirmModalBox(true);
  };

  useEffect(() => {
    setUpdateWmInfoStatus(wminfo.status);
    setUpdateWmInfo(wminfo.wminfo);
  }, []);

  return (
    <div className={styleWMInfoCard.cardContainer}>
      <div style={{ flex: 1 }}>
        <h4>{index + 1}</h4>
      </div>
      <div className={styleWMInfoCard.wmInfoText}>
        <p>{wminfo.wminfo.substring(0, 50)}</p>
      </div>

      <div className={styleWMInfoCard.wmInfoStatus}>
        <p
          className={
            WMInfoStatus.RED === wminfo.status
              ? styleWMInfoCard.statusCircleRedDesign
              : WMInfoStatus.GREEN === wminfo.status
              ? styleWMInfoCard.statusCircleGreenDesign
              : styleWMInfoCard.statusCircleYellowDesign
          }
        >
          {/* {wminfo.status} */}
        </p>
      </div>

      <div>
        <DropDownCard
          deleteSingleItem={() => handleOpenConfirmModalBox()}
          handleUpdateOnOpenModal={handleUpdateOpenModal}
        />
      </div>

      {/*//////////////////////////////////////////////////////
  //////////Delete WM Info Confirm Modal  /////////////////////
  //////////////////////////////////////////////////////*/}

      <ConfirmModal
        openConfirmModal={openConfirmModalBox}
        onCloseModal={handleCloseConfirmModalBox}
        showActionButton={true}
        onConfirmButton={() => deleteSingleWMInfo()}
      >
        <h5>Are you sure you want to delete this wm info?</h5>
      </ConfirmModal>

      {/*//////////////////////////////////////////////////////
       ////////// Update WM  Info Modal  /////////////////////
       ////////////////////////////////////////////////////*/}

      <Modal
        open={openUpdateModal}
        onClose={handleUpdateCloseModal}
        title="Update WM Info"
        showActionButton={true}
        onSaveButton={onSubmitUpdateWMInfo}
      >
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className={wmInfoStyle.wmInfoInputField}>
              <label>WM Info:</label>
              <textarea
                className="form-control"
                rows={3}
                value={updateWmInfo}
                onChange={(e) => setUpdateWmInfo(e.target.value)}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <label>Status:</label>

            <div>
              <select
                className={
                  WMInfoStatus.RED === updateWmInfoStatus
                    ? wmInfoStyle.wmInfoStatusRed
                    : WMInfoStatus.GREEN === updateWmInfoStatus
                    ? wmInfoStyle.wmInfoStatusGreen
                    : wmInfoStyle.wmInfoStatusYellow
                }
                value={updateWmInfoStatus}
                onChange={(e) => setUpdateWmInfoStatus(e.target.value)}
              >
                {Object.keys(WMInfoStatus).map((w, index) => (
                  <option value={w} className={wmInfoStyle.optionDesign}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WMInfoCard;
