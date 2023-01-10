import React, { FC } from "react";
import { PhotoLibraryInfo } from "../../Dataprovider";
import style from "./PhotoLibraryCard.module.scss";

interface PhotoLibraryCardProps {
  photo: PhotoLibraryInfo;
  selectPhoto?: (url: string)=> void;
  photoLibraryPhotoID?:[String] 
}

const PhotoLibraryCard: FC<PhotoLibraryCardProps> = ({ photo,selectPhoto,photoLibraryPhotoID }) => {
  return (
    <div className={photoLibraryPhotoID?.includes(photo.imageUrl)? style.selectedPhotoCardContiner:style.photoCardContainer} onClick={()=>selectPhoto?.(photo.imageUrl)}>
        <span>
        <img src={photo.imageUrl}  />

        </span>
    </div>
  );
};

export default PhotoLibraryCard;
