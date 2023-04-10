import React, { FC, useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

//Custom
import CardLayout from "./CardLayout";
import { Work_Management } from "../Dataprovider";
import { ToastContainer, toast } from "react-toastify";
import TPI_Card from "./TPI_Card";
import { getTPI, deleteTPI, CreateTPIProps, createTPI, deleteWM } from "../API";
import WM_CardStyle from "./WM_Card.module.css";
import Modal from "../components/Modal/Modal";
import DropDownCard from "../components/DropDownCard";

interface WM_CardProps {
  wm: Work_Management;
  loadAllWorkManagement: () => void;
  // deleteSingleWorkManagement:(id:string)=> void;
}

const WM_Card: FC<WM_CardProps> = ({ wm, loadAllWorkManagement }) => {

 
  //////////////////////////////////////////////////////
  ////////// To show modal box for create tpi  /////////
  //////////////////////////////////////////////////////


  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOnClose = () => {
    setOpenModal(false);
  };

  //////////////////////////////////////////////////////
  //////////  To show update modal  ////////////////////
  //////////////////////////////////////////////////////
  const [openUpdateModal, setUpdateOpenModal] = useState<boolean>(false);

  const handleUpdateOnClose = () => {
    setUpdateOpenModal(false);
  };

  const handleUpdateOnOpenModal = () => {
    setUpdateOpenModal(true);
  };



  //////////////////////////////////////////////////////
  //////////  To load all tpi  /////////////////////////
  //////////////////////////////////////////////////////

  const [allTpiByWM, setAllTpiByWM] = useState([]);


  const loadTpi = async () => {
    try {
      const res = await getTPI(wm.slug);

      if (res) {
        setAllTpiByWM(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  //////////  To Delete WM  ////////////////////////////
  //////////////////////////////////////////////////////

  const deleteSingleWorkManagement = async (id: string) => {
    try {
      const res = await deleteWM(id);

      if (res) {
        loadAllWorkManagement();
        loadTpi();
        toast.success("WM Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  //////////  To Create TPI    /////////////////////////
  //////////////////////////////////////////////////////

  const [tpiName, setTpiName] = useState<string>("");


  const createNewTPI = async () => {
    try {
      const payload: CreateTPIProps = { tpi_name: tpiName, wm_id: wm._id };

      const res = await createTPI(payload);

      if (res) {
        toast.success("TPI Created Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadTpi();
        setTpiName("");
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  //////////   To reset input field ////////////////////
  //////////////////////////////////////////////////////

  const resetInputField =  () => {
    setTpiName("");
  };

  //////////////////////////////////////////////////////
  //////////  To Delete single TPI   ///////////////////
  //////////////////////////////////////////////////////
  const deleteSingleTPI = async (id: string) => {
    try {
      const res = await deleteTPI(id);

      if (res) {
        toast.success("TPI Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadTpi();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadTpi();
  }, []);

  return (
    <React.Fragment>
      <CardLayout backgroun_color="white">
        <div className={WM_CardStyle.wm_container}>
          <Link to={"/wm-details/" + wm.slug}>
            <h6>{wm.wm_name}</h6>
          </Link>
          <p>{allTpiByWM.length}</p>
          <DropDownCard
            deleteSingleItem={() => deleteSingleWorkManagement(wm._id)}
            handleUpdateOnOpenModal={handleUpdateOnOpenModal}
          />
          <p>
            <IoAddCircleSharp size={25} onClick={() => setOpenModal(true)} />
          </p>
          {/* To create TPI  Modal*/}
          <Modal
            open={openModal}
            onClose={handleOnClose}
            title="Create New TPI"
            onSaveButton={createNewTPI}
            onResetButton={resetInputField}
            showActionButton={true}
          >
            <div className={WM_CardStyle.tpi_form}>
              <label>TPI Name:</label>
              <input
                type="text"
                className="form-control"
                value={tpiName}
                onChange={(e) => setTpiName(e.target.value)}
              />
            </div>
          </Modal>
        </div>
        <div className="row">
          {allTpiByWM &&
            allTpiByWM.map((tpi: any, index) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className={WM_CardStyle.tpi_item_design} key={tpi._id}>
                  <TPI_Card tpi={tpi} deleteSingleTPI={deleteSingleTPI} />
                </div>
              </div>
            ))}
        </div>
        {allTpiByWM.length === 0 && (
          <h5>This work management does not have TPI.Create New TPI</h5>
        )}
        {/*To  Update WM Modal */}
        <Modal
          open={openUpdateModal}
          onClose={handleUpdateOnClose}
          title="Update WM"
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
      </CardLayout>

      <ToastContainer autoClose={8000} />
    </React.Fragment>
  );
};

export default WM_Card;
