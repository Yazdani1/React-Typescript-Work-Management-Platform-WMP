import { FC, useState } from "react";
import moment from "moment";

import { OnlineStoreInfo } from "../../Dataprovider";
import style from "./OnlineStoreCard.module.scss";
import ModalBox from "../../components/Modal Package/ModalBox";

interface OnlineStoreCardProps {
  online_store: OnlineStoreInfo;
}

const OnlineStoreCard: FC<OnlineStoreCardProps> = ({ online_store }) => {
  /****************************************/
  /**Show New or Old Tag based on date*******/
  /****************************************/

  // new or old tag
  const getPostTag = (date: any) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 1);

    if (date >= twoDaysAgo) {
      return "New";
    } else {
      return "Old";
    }
  };

  /****************************************/
  /***Open Modal to Show Image Slide*******/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(Number);

  // to select the image index positin and at the same time open the modal to show the image

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  // to close modal box
  const handleCloseModal = () => {
    setOpen(false);
  };

  // to handle index position of photo and based on this positin to show in the modal box image
  const handleNext = () => {
    setCurrentImageIndex(
      currentImageIndex + 1 >= online_store.photo?.length
        ? 0
        : currentImageIndex + 1
    );
  };

  // to handle previous button to show previous photo

  const handlePrevious = () => {
    setCurrentImageIndex(
      currentImageIndex - 1 >= online_store.photo?.length
        ? 0
        : currentImageIndex - 1
    );
  };

  return (
    <div className={style.onlineStoreCardContainer}>
      <div className={style.onlineStorePhoto}>
        {online_store.photo.map((p, index) => (
          <img src={p} onClick={() => handleImageSelect(index)} />
        ))}
      </div>

      <div className={style.onlineStoreDetailsInfo}>
        <h6>{online_store.title}</h6>
        <p>{online_store.des.substring(0, 700)}</p>

        <h3>{online_store.price}.EUR</h3>
        <p>{moment(online_store.date).format("MMMM Do YYYY, h:mm:ss a")}</p>

        <div className={style.tagDesign}>
          {getPostTag(new Date(online_store.date))}
        </div>
      </div>
      {/* // Modal to show image slide when user click on the image */}

      <ModalBox open={open} onCloseModal={handleCloseModal}>
        <div className={style.imageSliderDesign}>
          <span>
            {currentImageIndex <= 0 ? (
              <button
                disabled
                className="btn btn-success"
                onClick={handlePrevious}
              >
                Previous
              </button>
            ) : (
              <button className="btn btn-success" onClick={handlePrevious}>
                Previous
              </button>
            )}
          </span>
          <span>{currentImageIndex}/{online_store.photo.length}</span>
          <img
            src={online_store.photo[currentImageIndex]}
            height="400px"
            width="350px"
          />
          <span>
            <button className="btn btn-success" onClick={handleNext}>
              Next
            </button>
          </span>
        </div>
      </ModalBox>
    </div>
  );
};

export default OnlineStoreCard;
