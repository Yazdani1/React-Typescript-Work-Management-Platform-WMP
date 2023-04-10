import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

//Custom
import { getAllFavouriteTPI } from "../../API";
import PageLayout from "../../Pagelayout/PageLayout";
import FavouriteTPICard from "./FavouriteTPICard";

const FavouriteTPI = () => {
  
  //////////////////////////////////////////////////////
  ////////// Load all Favourite TPI   //////////////////
  //////////////////////////////////////////////////////

  const [allFavouriteTPI, setAllFavouriteTPI] = useState([]);

  const loadAllFavouriteTPI = async () => {
    try {
      const res = await getAllFavouriteTPI();

      if (res) {
        setAllFavouriteTPI(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllFavouriteTPI();
  }, []);

  return (
    <PageLayout>
      <div className="row">
        {allFavouriteTPI &&
          allFavouriteTPI.map((tpi, index) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <FavouriteTPICard
                tpi_info={tpi}
                loadFavouriteTPI={loadAllFavouriteTPI}
              />
            </div>
          ))}
      </div>

      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default FavouriteTPI;
