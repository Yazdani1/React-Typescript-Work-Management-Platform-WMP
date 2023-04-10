import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoAddCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

//Custom
import { TPI } from "../../Dataprovider";
import TPI_Summary_Card from "./TPI_Summary_Card";
import TPI_Info_Card from "./TPI_Info_Card";
import {
  tpiDetails,
  getAllTpiSummary,
  createTPISummary,
  CreateTPISummaryProps,
  getAllTPIInfo,
  createTPIInfo,
  CreateTPIInfo,
} from "../../API";
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import WM_CardStyle from "../../components/WM_Card.module.css";
import Modal from "../../components/Modal/Modal";
import productCardStyle from "../Product/ProductCard.module.css";
import { TPIValueType } from "../../Dataprovider";

const TPI_Details = () => {
  const { slug } = useParams();

  // to change checkbox value

  // const [checked, setChecked] = useState(true);

  // const handleCheckBoxValueChange = () => {
  //   setChecked(!checked);
  // };

  // const [gender, setGender] = useState("Male");

  // const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setGender(event.target.value);
  //   console.log(event.target.value);
  // };

  // end to check box value

  // radio button start

  //end of radio button

  const [tpiDetailsInfo, setTpiDetailsInfo] = useState<TPI>();

  const [tpiSummary, setTpiSummary] = useState<string>("");

  // to show modal box for create tpi summary
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOnClose = () => {
    setOpenModal(false);
  };

  // to load a single tpi details info

  const getSingleTPIDetails = async () => {
    try {
      const res = await tpiDetails(slug!);
      if (res) {
        setTpiDetailsInfo(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // create tpi summary

  const onSubmitCreateTpiSummary = async () => {
    try {
      const payload: CreateTPISummaryProps = {
        tpi_summary: tpiSummary,
        tpi_id: tpiDetailsInfo?._id!,
      };

      const res = await createTPISummary(payload);

      if (res) {
        toast.success("TPI Summary Created Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTpiSummary("");
        loadAllTPISummary();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // to reset input field

  const resetInputField = () => {
    setTpiSummary("");
  };

  //////////////////////////////////////////////////////
  ////////// Load all TPI Summary   ////////////////////
  //////////////////////////////////////////////////////

  // to load all tpi summary with load more pagination features

  const [tpiSummaryLength, setTpiSummaryLength] = useState([]);
  const [allTpiSummary, setAllTpiSummary] = useState([]);
  const [limit, setLimit] = useState<number>(3);

  const handleLimitState = () => {
    setLimit((prev) => prev + 3);
  };

  const loadAllTPISummary = async () => {
    try {
      const res = await getAllTpiSummary(slug!, limit);

      if (res) {
        setAllTpiSummary(res.data.tpi_summary);
        setTpiSummaryLength(res.data.tpi_summary_length);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ////////// Create TPI Info Modal   ///////////////////
  //////////////////////////////////////////////////////
  const [tpiInfoOpenModal, setTpiInfoOpenModal] = useState<boolean>(false);
  const handleOnCloseTpiInfoModal = () => {
    setTpiInfoOpenModal(false);
  };
  //////////////////////////////////////////////////////
  ////////// Add TPI Value Modal   /////////////////////
  //////////////////////////////////////////////////////
  const [openTpiValueModal, setOpenTpiValueModal] = useState<boolean>(false);
  const handleOpenTPIValueModal = () => {
    setOpenTpiValueModal(true);
  };
  const handleCloseTPIValueModal = () => {
    setOpenTpiValueModal(false);
  };

  //////////////////////////////////////////////////////
  ////////// Choose TPI Type State   ////////////////////////
  //////////////////////////////////////////////////////

  const [tpiValueType, setTpiValueType] = useState<string>("TPI_CRAPH_VALUE");

  //////////////////////////////////////////////////////
  ////////// Create TPI Info    ///////////////////
  //////////////////////////////////////////////////////

  // to add tag state

  const [tags, setTags] = useState<string[]>([]);

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

  const [tpiInfoMessage, setTpiInfoMessage] = useState<string>("");
  const [tpiInfoIssues, setTpiInfoIssues] = useState<string>("");

  // to add responsibe from selector dropdown
  // const [brands, setBrands] = useState("");
  // const handleResponsiveDropDown = (e:any)=>{
  //   setBrands(e.target.value);
  //   setTags([...tags,brands]);
  // }

  const onSubmitCreateTPIInfo = async () => {
    try {
      const payload: CreateTPIInfo = {
        message: tpiInfoMessage,
        issues: tpiInfoIssues,
        responsible: tags,
        tpi_id: tpiDetailsInfo?._id!,
      };
      const res = await createTPIInfo(payload);
      if (res) {
        loadTPIInfo();

        resetTpiInfoInputFiled();

        toast.success("TPI Info Created Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const resetTpiInfoInputFiled = () => {
    setTpiInfoMessage("");
    setTpiInfoIssues("");
    setTags([]);
  };

  //////////////////////////////////////////////////////
  ////////// Load all TPI Info   //////////////////////
  //////////////////////////////////////////////////////

  const [allTPIInfo, setAllTPIInfo] = useState([]);

  const loadTPIInfo = async () => {
    try {
      const res = await getAllTPIInfo(slug!);

      if (res) {
        setAllTPIInfo(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    getSingleTPIDetails();
    loadAllTPISummary();
    loadTPIInfo();
  }, [limit]);

  /**
   * This use effect is showing slug name in the browser tab one user move to the detials page
   */

  useEffect(() => {
    document.title = `${slug}`;
  }, [slug]);

  return (
    <PageLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <div className={WM_CardStyle.wm_container}>
                <h6>Add TPI Value</h6>
                <p>
                  <IoAddCircleSharp
                    size={25}
                    onClick={handleOpenTPIValueModal}
                  />
                </p>
                {/* To create TPI Value*/}
                <Modal
                  open={openTpiValueModal}
                  onClose={handleCloseTPIValueModal}
                  title="Create TPI Value"
                  showActionButton={false}
                >
                  <label>Choose type:</label>
                  <div className="selected-dropdownlist">
                    <select
                      className={productCardStyle.custom_select}
                      value={tpiValueType}
                      onChange={(e) => setTpiValueType(e.target.value)}
                    >
                      <option>--Select Type--</option>
                      {Object.keys(TPIValueType).map((i, index) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                    {TPIValueType.TPI_CRAPH_VALUE === tpiValueType && (
                      <h6>We will have to add Graph here</h6>
                    )}
                    {TPIValueType.TPI_TEXT_VALUE === tpiValueType && (
                      <h6>Text input field is here</h6>
                    )}
                  </div>
                </Modal>
              </div>
              <h5>{tpiDetailsInfo?.tpi_name}</h5>
            </CardLayout>
            {/* //////////////////////////////////////////////////////
             /////////////////     TPI Summary      ///////////////
              ////////////////////////////////////////////////// */}
            <CardLayout backgroun_color="white">
              <div className={WM_CardStyle.wm_container}>
                <h6>Create TPI Summary {tpiSummaryLength.length}</h6>

                <p>
                  <IoAddCircleSharp
                    size={25}
                    onClick={() => setOpenModal(true)}
                  />
                </p>

                {/* To create TPI Summary Modal*/}

                <Modal
                  open={openModal}
                  onClose={handleOnClose}
                  title="Create TPI Summary"
                  onSaveButton={onSubmitCreateTpiSummary}
                  onResetButton={resetInputField}
                  showActionButton={true}
                >
                  <div className={WM_CardStyle.tpi_form}>
                    <label>TPI Summary:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={tpiSummary}
                      onChange={(e) => setTpiSummary(e.target.value)}
                    />
                  </div>
                </Modal>
              </div>
              {/* To load all the tpi summary */}
              {allTpiSummary &&
                allTpiSummary.map((summary, index) => (
                  <TPI_Summary_Card
                    tpi_summary={summary}
                    loadAllTPISummary={loadAllTPISummary}
                  />
                ))}
              <p style={{ display: "flex", justifyContent: "right" }}>
                {allTpiSummary.length} of {tpiSummaryLength.length}
              </p>
              {tpiSummaryLength.length === allTpiSummary.length ? null : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleLimitState();
                    loadAllTPISummary();
                  }}
                >
                  Load More
                </button>
              )}
            </CardLayout>
          </div>
          {/* //////////////////////////////////////////////////////
             /////////////////     TPI Info Details      ///////////////
              ////////////////////////////////////////////////// */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <CardLayout backgroun_color="white">
              <div className={WM_CardStyle.wm_container}>
                <h6>Create TPI Info</h6>
                <p>
                  <IoAddCircleSharp
                    size={25}
                    onClick={() => setTpiInfoOpenModal(true)}
                  />
                </p>
                {/* To create TPI Summary Modal*/}
                <Modal
                  open={tpiInfoOpenModal}
                  onClose={handleOnCloseTpiInfoModal}
                  title="Create TPI Info"
                  onSaveButton={onSubmitCreateTPIInfo}
                  onResetButton={resetTpiInfoInputFiled}
                  showActionButton={true}
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

                    {/* <div className="selected-dropdownlist">
                    <select
                      // className={productCardStyle.custom_select}
                      value={brands}
                      onChange={handleResponsiveDropDown}
                    >
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                      <option value="Mini Copper">Mini Copper</option>
                      <option value="Volvo">Volvo</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Opel">Opel</option>
                    </select>
                  </div> */}
                    <input
                      type="text"
                      className="form-control"
                      onKeyDown={addTags}
                    />
                  </div>
                </Modal>
              </div>
              {allTPIInfo &&
                allTPIInfo.map((tpinfo, index) => (
                  <TPI_Info_Card
                    tpiinfo={tpinfo}
                    key={index}
                    loadAllTPIInfo={loadTPIInfo}
                  />
                ))}

              {/* Check box feature */}
              {/* <form>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckBoxValueChange}
                />
              </form>
              <h2>{checked.toString()}</h2>
              {checked ? "True" : "False"}
         
              <div>
                <div onChange={onChangeValue}>
                  <input
                    type="radio"
                    value="Male"
                    name="gender"
                    checked={gender === "Male"}
                  />
                  Male
                  <input
                    type="radio"
                    value="Female"
                    name="gender"
                    checked={gender === "Female"}
                  />
                  Female
                  <input
                    type="radio"
                    value="Other"
                    name="gender"
                    checked={gender === "Other"}
                  />
                  Other
                </div>
                {gender}
              </div> */}
              {/* Radio button feature */}
            </CardLayout>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default TPI_Details;
