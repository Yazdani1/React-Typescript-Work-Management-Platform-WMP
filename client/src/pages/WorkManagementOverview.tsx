import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddCircleSharp } from "react-icons/io5";

//Custom
import PageLayout from "../Pagelayout/PageLayout";
import { getAllWorkManagement, CreateWMProps, createWM,deleteWM } from "../API";
import WM_Card from "../components/WM_Card";
import CardLayout from "../components/CardLayout";
import WMStyle from "./WM.module.css";
import Modal from "../components/Modal/Modal";

const WorkManagementOverview = () => {
  const [allWorkManagement, setAllWorkManagement] = useState([]);

  // to create wm

  const [wmName, setWmName] = useState<string>("");

  // to show modal box
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOnClose = () => {
    setOpenModal(false);
  };

  // create new wm

  const createWorkManagement = async () => {
    try {
      const payload: CreateWMProps = { wm_name: wmName };

      const res = await createWM(payload);

      if (res) {
        toast.success("WM Created Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setWmName("");
        window.location.reload();
        loadAllWorkManagement();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

    // to reset input field
    const resetInputField = ()=>{
      setWmName("");
    }

  // load all work management

  const loadAllWorkManagement = async () => {
    try {
      const res = await getAllWorkManagement();

      if (res) {
        setAllWorkManagement(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  useEffect(() => {
    loadAllWorkManagement();
  }, []);

  return (
    <PageLayout>
      <CardLayout backgroun_color="white">
        <div className={WMStyle.wm_header}>
          <h6>Create Work Management</h6>
    
          <p>
            <IoAddCircleSharp size={25} onClick={() => setOpenModal(true)} />
          </p>
        </div>
      </CardLayout>

      {allWorkManagement &&
        allWorkManagement.map((wm, index) => (
          <>
            <WM_Card wm={wm} loadAllWorkManagement={loadAllWorkManagement}/>
          </>
        ))}

        <Modal
          open={openModal}
          onClose={handleOnClose}
          title="Create New Work Management"
          onSaveButton={createWorkManagement}
          onResetButton={resetInputField}
          showActionButton={true}
        >
          <div className={WMStyle.wm_form}>
            <label>WM Name:</label>
            <input
              type="text"
              className="form-control"
              value={wmName}
              onChange={(e) => setWmName(e.target.value)}
            />
          </div>
        </Modal>
      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default WorkManagementOverview;
