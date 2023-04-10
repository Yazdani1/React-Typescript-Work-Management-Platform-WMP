import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import { getOnlineStore } from "../../API";

const News = () => {

  //////////////////////////////////////////////////////
  // Show onlin store info in this file       //////////
  //////////////////////////////////////////////////////

  // To implement how to show post one by one by clicking on next button
  // At first get all the post from api

  const [allPosts, setAllPosts] = useState<any>([]);

  const loadAllOnlineStorePost = async () => {
    try {
      const res = await getOnlineStore();
      if (res) {
        setAllPosts(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // To show the first index position post by default and when user click on the next button
  // then show the posts one by one...
  // First load the post from api then store it in the state array..

  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  /**
   * This function change the index position and then based on the index position, post will be loaded
   */
  const handleNextClick = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % allPosts.length);
  };

  useEffect(() => {
    loadAllOnlineStorePost();
  }, []);

  return (
    <PageLayout>
      <CardLayout backgroun_color="white">
        <div>
          <h1>{currentPostIndex}</h1>
          <h1>{allPosts[currentPostIndex]?.title}</h1>
          <p>{allPosts[currentPostIndex]?.des}</p>
          <h4>{allPosts[currentPostIndex]?.price}</h4>

          <span style={{ margin: "10px" }}>
            {allPosts[currentPostIndex]?.photo.map((p: any) => (
              <img src={p} height="150px" width="150px" object-Fit="cover" />
            ))}
          </span>
        </div>
        <button className="btn btn-success" onClick={handleNextClick}>
          Next
        </button>
      </CardLayout>
    </PageLayout>
  );
};

export default News;
