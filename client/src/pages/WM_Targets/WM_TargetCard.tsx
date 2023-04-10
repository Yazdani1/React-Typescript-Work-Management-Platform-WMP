import React, { FC, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FcCheckmark } from "react-icons/fc";

import { WMTargets } from "../../Dataprovider";
import wmTargetCardStyle from "./WM_TargetCard.module.css";
import DropDownCard from "../../components/DropDownCard";
import Modal from "../../components/Modal/Modal";
import {
  deleteWMTargets,
  updateWMTargets,
  UpdateWMTargetProps,
} from "../../API";

interface WM_TargetCardProps {
  wm_target: WMTargets;
  loadAllWMTargets: () => void;
}

const WM_TargetCard: FC<WM_TargetCardProps> = ({
  wm_target,
  loadAllWMTargets,
}) => {
  //////////////////////////////////////////////////////
  //////////   to show update modal       ///////////////
  //////////////////////////////////////////////////////

  const [openUpdateModal, setUpdateOpenModal] = useState(false);
  const handleUpdateOnClose = () => {
    setUpdateOpenModal(false);
  };
  const handleUpdateOnOpenModal = () => {
    setUpdateOpenModal(true);
  };

  //////////////////////////////////////////////////////
  //////////   to delete wm targets       //////////////
  //////////////////////////////////////////////////////

  const onSubmitWMTargetDelete = async (id: string) => {
    try {
      const res = await deleteWMTargets(id);

      if (res) {
        toast.success("WM Target Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        loadAllWMTargets();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// Update wm targets           ///////////////
  //////////////////////////////////////////////////////

  const [updateStatus, setUpdateStatus] = useState(false);

  const [updateTarget, setUpdatedTarget] = useState("");

  const [targetStatus, setTargetStatus] = useState(false);

  // to update target checkbox status in modal box
  const handleWMTargetStatusUpdate = () => {
    setUpdateStatus(!updateStatus);
  };

  // to update target checkbox status in card

  const handleOnlyStatusUpdate = () => {
    setTargetStatus(!targetStatus);
  };

  //////////////////////////////////////////////////////
  //////        to update only status         ///////////
  //////////////////////////////////////////////////////

  const onClickStatusUpdate = async () => {
    try {
      const payload: UpdateWMTargetProps = {
        status: targetStatus,
      };

      const res = await updateWMTargets(wm_target._id, payload);

      if (res) {
        toast.success("WM Target Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();

        loadAllWMTargets();
        // window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////// to update wm target  on modal box   ///////////
  //////////////////////////////////////////////////////

  const onSubmitUpdateWMTarget = async () => {
    try {
      const payload: UpdateWMTargetProps = {
        target: updateTarget,
        status: updateStatus,
      };

      const res = await updateWMTargets(wm_target._id, payload);

      if (res) {
        toast.success("WM Target Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllWMTargets();
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setUpdatedTarget(wm_target.target);
    setTargetStatus(wm_target.status);
    setUpdateStatus(wm_target.status);
  }, []);

  return (
    <div className={wmTargetCardStyle.target_Card_Container}>
      <div className={wmTargetCardStyle.checkBox_Target}>
        <label>
          <input
            type="checkbox"
            checked={targetStatus}
            className={wmTargetCardStyle.roundedCheckbox}
            // className={wmTargetCardStyle.checkBox}

            onChange={() => handleOnlyStatusUpdate()}
          />
        </label>

        <p>{wm_target.target}</p>
      </div>

      <div className={wmTargetCardStyle.actionButton}>
        <p className="btn btn-success" onClick={onClickStatusUpdate}>
         Done
        </p>
        <DropDownCard
          handleUpdateOnOpenModal={handleUpdateOnOpenModal}
          deleteSingleItem={() => onSubmitWMTargetDelete(wm_target._id)}
        />
      </div>

      <Modal
        open={openUpdateModal}
        onClose={handleUpdateOnClose}
        onSaveButton={onSubmitUpdateWMTarget}
        title="Update wm target"
        showActionButton={true}
      >
        <div className={wmTargetCardStyle.inputAreaDesign}>
          <label>
            <input
              type="checkbox"
              checked={updateStatus}
              className={wmTargetCardStyle.roundedCheckbox}
              onChange={handleWMTargetStatusUpdate}
            />
          </label>

          <textarea
            rows={3}
            className="form-control"
            value={updateTarget}
            onChange={(e) => setUpdatedTarget(e.target.value)}
          />
        </div>
        {wm_target._id}
      </Modal>

      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default WM_TargetCard;
