import React, { useEffect, useState } from "react";

import style from "./PostMark.module.scss";
import PageLayout from "../../Pagelayout/PageLayout";
import { getJsonPlaceHolderPostData } from "../../API";
import CardLayout from "../../components/CardLayout";

const PostMark = () => {

  /****************************************/
  /************* Load all data  ***********/
  /****************************************/
  const [allData, setAllData] = useState<any>([]);
  const [selectedPost, setSelectedPost] = useState<number>(0);

  const loadAllData = async () => {
    try {
      const res = await getJsonPlaceHolderPostData();

      if (res) {
        setAllData(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // To handle next button

  const handleNextPost = () => {
    setSelectedPost((prevIndex) => (prevIndex + 1) % allData.length);
  };

  // To handle previous button

  const handlePreviousPost = () => {
    setSelectedPost((prevIndex) => (prevIndex - 1) % allData.length);
  };

  // To select item to show in the details post

  const handleSelectPost = (index: number) => {
    setSelectedPost(index);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <PageLayout>
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <CardLayout backgroun_color="white">
            {allData &&
              allData.map((item: any, index: number) => (
                <div
                  className={
                    selectedPost === index ? style.itemMarked : style.itemList
                  }
                  onClick={() => handleSelectPost(index)}
                >
                  <h6>
                    {item.title}.{index}
                  </h6>
                </div>
              ))}
          </CardLayout>
        </div>

        <div className="col-xl-6 col-lg-6">
          <CardLayout backgroun_color="white">
            <h6>{allData[selectedPost]?.title}</h6>
            <p>{allData[selectedPost]?.body}</p>
            <button className="btn btn-primary" onClick={handleNextPost}>
              Next
            </button>
            {selectedPost >= 1 && (
              <button className="btn btn-success" onClick={handlePreviousPost}>
                Previous
              </button>
            )}
          </CardLayout>
        </div>
      </div>
    </PageLayout>
  );
};

export default PostMark;
