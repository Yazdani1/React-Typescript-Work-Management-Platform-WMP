import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import ModalBox from "../../components/Modal Package/ModalBox";
import style from "./PhotoLibrary.module.scss";
import {
  getPhotoLibrary,
  CreatePhotoLinraryProps,
  createPhotoLibrary,
  getPhotoLibraryWithPagination,
} from "../../API";
import PhotoLibraryCard from "./PhotoLibraryCard";

const PhotoLibrary = () => {
  /****************************************/
  /*** Modal Box to Create Photo Library ***/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  /****************************************/
  /***   Create Photo Library   **********/
  /****************************************/

  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmitCreatePhotoLibrary = async () => {
    try {
      const payload: CreatePhotoLinraryProps = { imageUrl: imageUrl };

      const res = await createPhotoLibrary(payload);

      if (res) {
        toast.success("Photo created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadPhotoLibrary();
        resetInputField();
        loadPhotoWithPagination();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const resetInputField = () => {
    setImageUrl("");
  };

  /****************************************/
  /*** Get Photo Library Photo  **********/
  /****************************************/

  // This one is to load all the photos from the databse and show it in the web page..

  const [allPhoto, setAllPhoto] = useState<any>([]);

  const loadPhotoLibrary = async () => {
    try {
      const res = await getPhotoLibrary();

      if (res) {
        setAllPhoto(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /***Get Photo Library With Pagination****/
  /****************************************/

  // these are state that needs to get the api data withpagination
  

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<string>("12");

  const loadPhotoWithPagination = async () => {
    try {
      const res = await getPhotoLibraryWithPagination(page, parseInt(limit));

      if (res) {
        setTotalPages(res.data.totalPages);
        setAllPhoto(res.data.items);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // To select the page number then it update the page state
  // and it send get request to the api then api load the data

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // this function generate page number
  // and when click on the page number it load post from the api

  const getPaginationNumbers = () => {
    // Generate an array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  //Previous button and Next button

  const handlePreviousButton = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextButton = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    // loadPhotoLibrary();
    loadPhotoWithPagination();
  }, [page, limit]);

  return (
    <PageLayout>
      <CardLayout
        backgroun_color="white"
        openModal={onOpenModal}
        headerTitle="Create Photo Library"
        showAddIcon={true}
      ></CardLayout>

      {/* To show list of phots */}

      <CardLayout backgroun_color="white">
        <h6>All Photo</h6>

        <div className="row">
          {allPhoto &&
            allPhoto.map((photo:any) => (
              <div className="col-xl-2 col-lg-2 col-sm-12">
                <PhotoLibraryCard photo={photo} key={photo._id}/>
              </div>
            ))}
        </div>
   
        {/* To show the pagination page number */}
        {/* Render the pagination numbers */}
        <div className={style.paginationContainer}>
          <div className={style.paginationItem}>
            <button onClick={handlePreviousButton} className="btn btn-info">
              Previous
            </button>
            {getPaginationNumbers().map((number) => (
              <span
                className={
                  page === number
                    ? style.activePagePaginationNumber
                    : style.paginationPageNumber
                }
                onClick={() => handlePageChange(number)}
              >
                <p>{number}</p>
              </span>
            ))}
            <button onClick={handleNextButton} className="btn btn-info">
              Next
            </button>

            <div>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardLayout>

      {/* Modal Box -To create Photo Library  */}

      <ModalBox
        title="Create Photo Library"
        open={open}
        onCloseModal={onCloseModal}
        onSaveButton={onSubmitCreatePhotoLibrary}
        onResetButton={resetInputField}
        showActionButton={true}
      >
        <label>Photo Link:</label>
        <div className="form-group">
          <input
            type="text"
            name="Photo URL"
            className={style.photoUrlInput}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
      </ModalBox>
    </PageLayout>
  );
};

export default PhotoLibrary;
