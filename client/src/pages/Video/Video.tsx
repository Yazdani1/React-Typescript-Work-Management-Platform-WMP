import React, { useEffect, useState } from "react";

import { getVideoList } from "../../API";
import PageLayout from "../../Pagelayout/PageLayout";

const Video = () => {
  const [allVideoList, setAllVideoList] = useState<any[]>([]);

  const loadVideoPost = async () => {
    try {
      const res = await getVideoList();

      if (res) {
        setAllVideoList(res.data);
      }
    } catch (error: any) {}
  };

  // To calculate the duration of a video.
  // Duration for each video. it counts the duration from a video url

  const handleMetadataLoad =
    (index: number) => (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      const target = e.target as HTMLVideoElement;
      allVideoList[index].duration = target.duration;
      setAllVideoList([...allVideoList]);
    };

  useEffect(() => {
    loadVideoPost();
  }, []);

  return (
    <PageLayout>
      <div className="container-fluid">
        <div className="row">
          {allVideoList &&
            allVideoList.map((video: any, index: any) => (
              <div className="col-xl-4 col-lg-4 card">
                <h5>{video.title}</h5>

                {/* To show video duration from video url as a string without adding video playr.
                For example- video duration will be shown only on the thumbnail image. */}

                <div className="video-duration">
                  Duration Test: {Math.floor(video.duration / 60)}:
                  {Math.floor(video.duration % 60)
                    .toString()
                    .padStart(2, "0")}
                </div>

                {/* End */}


                <div className="video-player" style={{ margin: "10px" }}>
                  <video
                    src={video && video?.video}
                    onLoadedMetadata={handleMetadataLoad(index)}
                    controls
                    height="400"
                    width="400"
                  />
                </div>
                <div>
                  Duration: {Math.floor(video.duration / 60)}:
                  {Math.floor(video.duration % 60)
                    .toString()
                    .padStart(2, "0")}
                </div>
              </div>
            ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Video;
