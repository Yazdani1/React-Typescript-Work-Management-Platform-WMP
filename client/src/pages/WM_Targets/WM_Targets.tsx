import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";

// Custom
import { ToastContainer, toast } from "react-toastify";
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import WM_TargetCard from "./WM_TargetCard";
import WMInfo from "../WM_Info/WMInfo";

import {
  getSingleWMDetails,
  getAllWMTargets,
  createWMTargets,
  CreateWMTargetsProps,
  
} from "../../API";
import WMStyle from "../WM.module.css";
import Modal from "../../components/Modal/Modal";
import wmTargetCardStyle from "./WM_TargetCard.module.css";
import { Work_Management } from "../../Dataprovider";

const WM_Targets = () => {
  const { slug } = useParams();

  //////////////////////////////////////////////////////
  //////////   to show modal box         ///////////////
  //////////////////////////////////////////////////////

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOnClose = () => {
    setOpenModal(false);
  };

  //////////////////////////////////////////////////////
  ////////// to load single wm details   ///////////////
  //////////////////////////////////////////////////////

  const [wmDetailsInfo, setWmDetailsInfo] = useState<Work_Management>();

  const loadSingleWMInfo = async () => {
    try {
      const res = await getSingleWMDetails(slug!);

      if (res) {
        setWmDetailsInfo(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// create wm targets           ///////////////
  //////////////////////////////////////////////////////

  const [status, setStatus] = useState<boolean>(false);
  const [targetText, setTargetText] = useState<string>("");

  //handle check box

  const handleWMTargetStatus = () => {
    setStatus(!status);
  };

  const onSubmitCreateWMTargets = async () => {
    try {
      const payload: CreateWMTargetsProps = {
        target: targetText,
        status: status,
        wm_id: wmDetailsInfo?._id!,
      };

      const res = await createWMTargets(payload);

      if (res) {
        toast.success("wm target created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllWMTargets();
        resetInputField();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const resetInputField = () => {
    setTargetText("");
  };


  //////////////////////////////////////////////////////
  ////////// to load all wm targets      ///////////////
  //////////////////////////////////////////////////////

  const [allWMTargets, setAllWMTargets] = useState([]);

  const loadAllWMTargets = async () => {
    try {
      const res = await getAllWMTargets(slug!);

      if (res) {
        setAllWMTargets(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadSingleWMInfo();
    loadAllWMTargets();
  }, []);

  return (
    <PageLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <h5>{JSON.stringify(wmDetailsInfo)}</h5>
            </CardLayout>
          </div>

          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <div className={WMStyle.wm_header}>
                <h6>WM Targets</h6>

                <p>
                  <IoAddCircleSharp
                    size={25}
                    onClick={() => setOpenModal(true)}
                  />
                </p>
              </div>

              {allWMTargets &&
                allWMTargets.map((target, index) => (
                  <WM_TargetCard
                    wm_target={target}
                    key={index}
                    loadAllWMTargets={loadAllWMTargets}
                  />
                ))}
            </CardLayout>
          </div>
        </div>

        <WMInfo slug={slug} singleWm_ID={wmDetailsInfo?._id!}/>
      </div>

      <Modal
        open={openModal}
        onClose={handleOnClose}
        title="Create wm targets"
        onSaveButton={onSubmitCreateWMTargets}
        onResetButton={resetInputField}
        showActionButton={true}
      >
        <div className={wmTargetCardStyle.inputAreaDesign}>
          <label>
            <input
              type="checkbox"
              // checked={wm_target.status}
              className={wmTargetCardStyle.roundedCheckbox}
              onChange={handleWMTargetStatus}
            />
          </label>

          <textarea
            rows={3}
            className="form-control"
            value={targetText}
            onChange={(e) => setTargetText(e.target.value)}
          />
        </div>
      </Modal>

      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default WM_Targets;
