import { useState, FC, useEffect } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";

//Custom
import Modal from "../../components/Modal/Modal";
import CardLayout from "../../components/CardLayout";
import WMStyle from "../WM.module.css";
import wmInfoStyle from "./WMInfoCard.module.css";
import { WMInfoStatus } from "../../Dataprovider";
import { getAllWMInfo, createWMInfo, CreateWMInfoProps } from "../../API";
import WMInfoCard from "./WMInfoCard";

interface WMInfoProps {
  slug?: string;
  singleWm_ID: string;
}

const WMInfo: FC<WMInfoProps> = ({ slug, singleWm_ID }) => {
  //////////////////////////////////////////////////////
  ////////// WM Info Modal         /////////////////////
  //////////////////////////////////////////////////////

  const [openWMInfoModal, setOpenWMInfoModal] = useState<boolean>(false);

  const handleWMInfoOpenModal = () => {
    setOpenWMInfoModal(true);
  };

  const handleWMInfoCloseModal = () => {
    setOpenWMInfoModal(false);
  };

  //////////////////////////////////////////////////////
  ////////// Create WM Info        /////////////////////
  //////////////////////////////////////////////////////

  const [wmInfoStatus, setWmInfoStatus] = useState<string | any>(WMInfoStatus.RED);
  const [wmInfo, setWmInfo] = useState<string>("");

  const onSubmitCreateWMInfo = async () => {
    try {

      const payload: CreateWMInfoProps = {
        wminfo: wmInfo,
        status: wmInfoStatus,
        wm_id: singleWm_ID,
      };
      
      const res = await createWMInfo(payload);
      if (res) {
        toast.success("Successfully created wm info", {
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
  ////////// Get All WM Info       /////////////////////
  //////////////////////////////////////////////////////

  const [allWmInfo, setAllWmInfo] = useState<any>([]);
  const loadAllWMInfo = async () => {
    try {
      const res = await getAllWMInfo(slug!);
      if (res) {
        setAllWmInfo(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllWMInfo();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">

          <CardLayout backgroun_color="white">
            <div className={WMStyle.wm_header}>
              <h6>Create WM Info</h6>
              <p>
                <IoAddCircleSharp size={25} onClick={handleWMInfoOpenModal} />
              </p>
            </div>
            {allWmInfo &&
              allWmInfo.map((info:any, index:any) => <WMInfoCard wminfo={info} loadAllWMInfo={loadAllWMInfo} index={index}/>)}
          </CardLayout>
          
        </div>
      </div>
      <Modal
        open={openWMInfoModal}
        onClose={handleWMInfoCloseModal}
        title="Create WM Info"
        onSaveButton={onSubmitCreateWMInfo}
        showActionButton={true}
      >
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className={wmInfoStyle.wmInfoInputField}>
              <label>WM Info:</label>
              <textarea
                className="form-control"
                rows={3}
                value={wmInfo}
                onChange={(e) => setWmInfo(e.target.value)}
              />
            </div>
            <p>{wmInfoStatus}</p>
            <p>{wmInfo}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <label>Status:</label>
            <div>
              <select
                className={
                  WMInfoStatus.RED === wmInfoStatus
                    ? wmInfoStyle.wmInfoStatusRed
                    : WMInfoStatus.GREEN === wmInfoStatus
                    ? wmInfoStyle.wmInfoStatusGreen
                    : wmInfoStyle.wmInfoStatusYellow
                }
                value={wmInfoStatus}
                onChange={(e) => setWmInfoStatus(e.target.value)}
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

export default WMInfo;
