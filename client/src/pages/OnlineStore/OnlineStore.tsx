import  { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FcList } from "react-icons/fc";
import { TbGridDots } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";

import style from "./OnlineStore.module.scss";
import PageLayout from "../../Pagelayout/PageLayout";
import {
  getOnlineStore,
  getPhotoLibrary,
  CreateOnlineStoreProps,
  createOnlineStore,
} from "../../API";

import { PhotoLibraryViewType } from "../../Dataprovider";

import CardLayout from "../../components/CardLayout";
import OnlineStoreCard from "./OnlineStoreCard";
import ModalBox from "../../components/Modal Package/ModalBox";
import PhotoLibraryCard from "../PhotoLibrary/PhotoLibraryCard";

const OnlineStore = () => {
  /****************************************/
  /**  Select Photo From Library   *******/
  /****************************************/

  const [photoLibraryPhotoID, setPhotoLibraryPhotoID] = useState<any>([]);
  // to select and remove photo url from photo library

  // this function will select and unselect an image from image libray
  // once its select its store image url into the array state

  const selectPhotoId = (imageurl: string) => {
    const selectedPhotsID = [...photoLibraryPhotoID];
    const index = selectedPhotsID.indexOf(imageurl);
    if (index === -1) {
      selectedPhotsID.push(imageurl);
    } else {
      selectedPhotsID.splice(index, 1);
    }
    setPhotoLibraryPhotoID(selectedPhotsID);
  };

  // To select all photo from photo library in one button click- first loop all the photo
  // this function will select all the photos and will set into the array
  // that array state can be sent in post request to add multiple photos

  const selectAllPhotos = () => {
    const allPhotoURL = photoLibraryPhoto.map((photo: any) => photo.imageUrl);
    setPhotoLibraryPhotoID(allPhotoURL);
  };

  // to remove image after selecting from the input modal - the tag

  const removePhoto = (index: number) => {
    setPhotoLibraryPhotoID(
      photoLibraryPhotoID.filter((el: any, t: any) => t !== index)
    );
  };

  // to remove all the selected image from the library
  const removeAlltheSelectedPhoto = () => {
    setPhotoLibraryPhotoID([]);
  };

  /****************************************/
  /**  Create Online Store    *************/
  /****************************************/

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const onSubmitCreateOnlineStore = async () => {
    try {

      const payload: CreateOnlineStoreProps = {
        title: title,
        des: description,
        price: parseInt(price),
        photo: photoLibraryPhotoID,
      };

      const res = await createOnlineStore(payload);

      if (res) {
        toast.success("Successfully created online store", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllOnlineStore();
        resetOnlineStoreInputField();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // to clear input form once user successfully created online store

  const resetOnlineStoreInputField = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setPhotoLibraryPhotoID([]);
  };

  /****************************************/
  /********  Get Online Store   **********/
  /****************************************/

  const [allOnlineStore, setAllOnlineStore] = useState([]);

  const loadAllOnlineStore = async () => {
    try {
      const res = await getOnlineStore();

      if (res) {
        setAllOnlineStore(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /*** Modal Box to Create Online Store ***/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  /****************************************/
  /*Modal Box to Select Photo From Library*/
  /****************************************/

  const [openModalToSelectPhoto, setOpenModalToSelectPhoto] =
    useState<boolean>(false);

  const onOpenModalForPhotoLibrary = () => {
    setOpenModalToSelectPhoto(true);
  };

  const onCloseModalForPhotoLibrary = () => {
    setOpenModalToSelectPhoto(false);
  };

  /****************************************/
  /*** To Get Photo Library Photots *******/
  /****************************************/

  const [photoLibraryPhoto, setPhotoLibraryPhoto] = useState([]);

  const loadPhotosFromPhotoLibrary = async () => {
    try {
      const res = await getPhotoLibrary();

      if (res) {
        setPhotoLibraryPhoto(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /**Photo Library Tab List or Grid*******/
  /****************************************/

  const [chooseLibraryView, setChooseLibraryView] = useState<PhotoLibraryViewType>(
    PhotoLibraryViewType.GRID_VIEW
  );

  const handleSelectLibraryView = (viewtype: PhotoLibraryViewType) => {
    setChooseLibraryView(viewtype);
  };

  useEffect(() => {
    loadAllOnlineStore();
    loadPhotosFromPhotoLibrary();
  }, []);

  return (
    <PageLayout>
      
      {/* To show all the online store posts 
      we retrive all the online store posts and show in this card. 
      */}
      <CardLayout
        headerTitle="All online storeproduct"
        backgroun_color="white"
        showAddIcon={true}
        openModal={onOpenModal}
      >
        {allOnlineStore &&
          allOnlineStore.map((store) => (
            <>
              <CardLayout>
                <OnlineStoreCard online_store={store} />
              </CardLayout>
            </>
          ))}
      </CardLayout>

      {/* Modal Box -To create online store.
      this modal box is to create online store. it contains all the input filed to add in the online store
      */}

      <ModalBox
        title="Create Photo Library"
        open={open}
        onCloseModal={onCloseModal}
        showActionButton={true}
        onSaveButton={onSubmitCreateOnlineStore}
        onResetButton={resetOnlineStoreInputField}
      >
        <label>Title:</label>
        <div className="form-group">
          <input
            type="text"
            name="Photo URL"
            className={style.onlineStoreInputField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label>Description:</label>
        <div className="form-group">
          <textarea
            name="Photo URL"
            className={style.onlineStoreInputField}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label>Price:</label>

        <div className="form-group">
          <input
            type="number"
            name="Photo URL"
            className={style.onlineStoreInputField}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <label>Photo:</label>

        <div className="form-group">
          <button
            onClick={onOpenModalForPhotoLibrary}
            className="btn btn-success"
          >
            Select Photos
          </button>
        </div>
        <h6>{photoLibraryPhotoID.length} Photos selected</h6>

        {/* To show selected photo list from photo library 
        all photo will be retrive from photo library and will disply in the modal box. and user can select
        multiple photos to create online store..
        */}

        <div className={style.selectedPhotoList}>
          <div className="row">
            {photoLibraryPhotoID &&
              photoLibraryPhotoID.map((p: any, index: number) => (
                <div className="col-xl-2 col-lg-2 col-sm-12">
                  <div className={style.imageContainer}>
                    <img src={p} />
                    <span
                      className={style.closeIcon}
                      onClick={() => removePhoto(index)}
                    >
                      <AiFillCloseCircle size={20} color="red" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ModalBox>

      {/* Modal Box -To choose Photo from Library  */}

      <ModalBox
        title="Select photo library"
        open={openModalToSelectPhoto}
        onCloseModal={onCloseModalForPhotoLibrary}
        showSelectPhotoFromLibaryButton={true}
        selectedImageList={photoLibraryPhotoID}
        // onSaveButton={onSubmitCreatePhotoLibrary}
        onResetButton={removeAlltheSelectedPhoto}
      >
        {/* Tab system for photo library view */}
        <div className={style.photoLibraryViewTypeContainer}>
          <div className={style.iconContainer}>
            <p
              onClick={() =>
                handleSelectLibraryView(PhotoLibraryViewType.GRID_VIEW)
              }
            >
              <TbGridDots size={25} />
            </p>
            <p
              onClick={() =>
                handleSelectLibraryView(PhotoLibraryViewType.LIST_VIEW)
              }
            >
              <FcList size={25} />
            </p>
          </div>
          <button className="btn btn-info" onClick={selectAllPhotos}>
            Select All {photoLibraryPhotoID.length}
          </button>
        </div>
        

        <div className="row">
          {/* To show photo in Grid view*/}

          {chooseLibraryView === PhotoLibraryViewType.GRID_VIEW &&
            photoLibraryPhoto &&
            photoLibraryPhoto.map((photo) => (
              <div className="col-xl-4 col-lg-4 col-sm-12">
                <PhotoLibraryCard
                  photo={photo}
                  selectPhoto={selectPhotoId}
                  photoLibraryPhotoID={photoLibraryPhotoID}
                />
              </div>
            ))}

          {/* To show photo in List view*/}

          {chooseLibraryView === PhotoLibraryViewType.LIST_VIEW &&
            photoLibraryPhoto &&
            photoLibraryPhoto.map((photo) => (
              <div className="col-xl-12 col-lg-12 col-sm-12">
                <PhotoLibraryCard
                  photo={photo}
                  selectPhoto={selectPhotoId}
                  photoLibraryPhotoID={photoLibraryPhotoID}
                />
              </div>
            ))}
        </div>
      </ModalBox>
    </PageLayout>
  );
};

export default OnlineStore;
