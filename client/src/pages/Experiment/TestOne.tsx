import React, { useState, useEffect } from "react";
//Custom
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";


const TestOne = () => {

  // Input state..

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>("");

  const [postList, setPostList] = useState<any>([
    { title: "First title", description: "First Description" },
  ]);

  // to update post
  const [postId, setPostId] = useState(Number);
  const [toogle, setToggle] = useState<boolean>(false);
  // to create post when user click on the submit button..

  const onSubmitCreatePost = () => {
    // to add item in the list

    if (!title && !description) {
    } else {
      if (toogle === false) {
        const payload = {
          title: title,
          description: description,
        };
        setPostList([...postList, payload]);
        setTitle("");
        setDescription("");

      }
    }

    // to update one single item from the list
    if (toogle === true) {
      setPostList(
        postList &&
          postList.map((listelement: any, index: any) => {
            if (index === postId) {
              return { ...listelement, title, description };
            }
            return listelement;
          })
      );
      setTitle("");
      setDescription("");
      setToggle(!toogle);
    }
  };

  // Edit list post

  const onSubmitEditPost = (
    title: string,
    description: string,
    index: number
  ) => {
    setTitle(title);
    setDescription(description);
    setPostId(index);
    setToggle(!toogle);
  };

  return (
    <PageLayout>
      {postId}

      <CardLayout backgroun_color="white">

        <div>
          <div style={{ width: "750px" }}>
            <label>Title:</label>

            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ width: "750px" }}>
            <label>Description:</label>

            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            onClick={onSubmitCreatePost}
            style={{ marginTop: "15px" }}
            className="btn btn-info"
          >
            {toogle ? "Update" : "Submit"}
          </button>
        </div>
      </CardLayout>

      <CardLayout backgroun_color="white">
        <h1>Post List</h1>
        <hr />
        {postList &&
          postList.map((list: any, index: any) => (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <p>{list.title}</p>
              <p>{list.description}</p>
              <p>{index}</p>
              <button
                className="btn btn-success"
                onClick={() =>
                  onSubmitEditPost(list.title, list.description, index)
                }
              >
                Edit
              </button>
            </div>
          ))}
      </CardLayout>
    </PageLayout>
  );
};

export default TestOne;
