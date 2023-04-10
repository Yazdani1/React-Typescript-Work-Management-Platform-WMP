import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import { getOnlineStore } from "../../API";
import ModalBox from "../../components/Modal Package/ModalBox";
import { OnlineStoreInfo } from "../../Dataprovider";

const PostList = () => {
  //////////////////////////////////////////////////////
  // Show onlin store info in this file       //////////
  //////////////////////////////////////////////////////

  // To implement how to show a post in a modal box from a list of post.
  // then by clicking next button show the post one by one.

  const [allPosts, setAllPosts] = useState<OnlineStoreInfo[]>([]);

  const loadAllOnlineStorePost = async () => {
    try {
      const res = await getOnlineStore();

      setAllPosts(res.data);
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /*** Modal Box to Show Single Post *****/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  // To show the single post in the modal box and next click option
  // Based on the index position will show the post in the modal box and when click on the next button,
  // it should show the next position post..

  const [currentPost, setCurrentPost] = useState<any>(null);

  // This function is to select the post that need to show in the modal box.
  // it's pick the entire post and then set into a state

  const handlePostClick = (post: any) => {
    setCurrentPost(post);
    setOpen(true);
  };

  // this function is to change the post while click on the next button

  const handleNextClick = () => {
    const currentIndex = allPosts.indexOf(currentPost);
    const nextIndex =
      currentIndex + 1 >= allPosts.length ? 0 : currentIndex + 1;
    setCurrentPost(allPosts[nextIndex]);
  };

  // this function is to change the post and to show the previous position post by clicking on the previous button

  const handlePreviousClick = () => {
    const currentIndex = allPosts.indexOf(currentPost);
    const nextIndex =
      currentIndex - 1 >= allPosts.length ? 0 : currentIndex - 1;
    setCurrentPost(allPosts[nextIndex]);
  };

  useEffect(() => {
    loadAllOnlineStorePost();
  }, []);

  return (
    <PageLayout>
      {allPosts &&
        allPosts.map((post, index: any) => (
          <div onClick={() => handlePostClick(post)}>
            <CardLayout backgroun_color="white">
              <h2>{post.title}</h2>
              <p>{post.des}</p>
              <h6>{post.price}</h6>
              <span>
                {post.photo.map((p: any) => (
                  <span style={{ margin: "10px", objectFit: "cover" }}>
                    <img src={p} height="150px" width="150px" />
                  </span>
                ))}
              </span>
            </CardLayout>
          </div>
        ))}

      {/* Modal box to show single post and next button click option */}

      <ModalBox open={open} onCloseModal={onCloseModal}>
        <div>
          <h1>{currentPost?.title}</h1>
          <p>{currentPost?.des}</p>
          <h4>{currentPost?.price}</h4>
          <span>
            {currentPost?.photo.map((p: any) => (
              <span style={{ margin: "10px" }}>
                <img src={p} height="100px" width="100px" />
              </span>
            ))}
          </span>
          <p>{currentPost?._id}</p>

          <span style={{ margin: "10px" }}>
            <button className="btn btn-success" onClick={handlePreviousClick}>
              Previous
            </button>
            <button className="btn btn-info" onClick={handleNextClick}>
              Next
            </button>
          </span>
        </div>
      </ModalBox>
    </PageLayout>
  );
};

export default PostList;
