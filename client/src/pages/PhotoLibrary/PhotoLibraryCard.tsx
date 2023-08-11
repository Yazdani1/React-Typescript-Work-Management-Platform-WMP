import React, { FC, useState } from 'react';

import { PhotoLibraryInfo, OnlineStoreInfo } from '../../Dataprovider';
import style from './PhotoLibraryCard.module.scss';
import ModalBox from '../../components/Modal Package/ModalBox';

interface PhotoLibraryCardProps {
  photo: PhotoLibraryInfo;
  selectPhoto?: (url: string) => void;
  photoLibraryPhotoID?: [String];
}

const PhotoLibraryCard: FC<PhotoLibraryCardProps> = ({ photo, selectPhoto, photoLibraryPhotoID }) => {
  /****************************************/
  /***Slider for photo Library ***********/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(Number);

  // to select the image index positin and at the same time open the modal to show the image

  // const handleImageSelect = (index: number) => {
  //   setCurrentImageIndex(index);
  //   setOpen(true);
  // };

  // to close modal box
  // const handleCloseModal = () => {
  //   setOpen(false);
  // };

  // to handle index position of photo and based on this positin to show in the modal box image
  // const handleNext = () => {
  //   setCurrentImageIndex(
  //     currentImageIndex + 1 >= allPhotos.photo?.length
  //       ? 0
  //       : currentImageIndex + 1
  //   );
  // };

  // to handle previous button to show previous photo

  // const handlePrevious = () => {
  //   setCurrentImageIndex(
  //     currentImageIndex - 1 >= allPhotos.photo?.length
  //       ? 0
  //       : currentImageIndex - 1
  //   );
  // };

  return (
    <div
      className={photoLibraryPhotoID?.includes(photo.imageUrl) ? style.selectedPhotoCardContiner : style.photoCardContainer}
      onClick={() => selectPhoto?.(photo.imageUrl)}
    >
      <span>
        <img src={photo.imageUrl} />
      </span>

      {/* Modal Box -To create Photo Library  */}

      {/* // Modal to show image slide when user click on the image */}

      {/* <ModalBox open={open} onCloseModal={handleCloseModal}>
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


          <img
            src={allPhotos.photo[currentImageIndex]}
            height="400px"
            width="350px"
          />
          <span>
            <button className="btn btn-success" onClick={handleNext}>
              Next
            </button>
          </span>
        </div>
      </ModalBox> */}
    </div>
  );
};

export default PhotoLibraryCard;
