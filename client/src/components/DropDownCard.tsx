import React, { FC, useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";

import DropDownCardStyle from "./DropDownCard.module.css";

interface DropDownCardProps {
  handleUpdateOnOpenModal?: () => void;
  deleteSingleItem?: () => void;
  save?: () => void;
}

const DropDownCard: FC<DropDownCardProps> = ({
  handleUpdateOnOpenModal,
  deleteSingleItem,
  save
}) => {
  // to show dropdown card details
  const [showDropDown, setShowDropDown] = useState(false);
  const handleDropDownCard = () => {
    setShowDropDown(!showDropDown);
    console.log("clicked count" + showDropDown);
  };
  return (
    <div className={DropDownCardStyle.dropDownMoreIconRow}>
      <p>
        <FiMoreVertical size={25} onClick={handleDropDownCard} />
      </p>
      {showDropDown && (
        <div className={DropDownCardStyle.dropDownCard}>
          <p
            onClick={() => {
              deleteSingleItem?.();
              handleDropDownCard();
            }}
          >
           <AiFillDelete size={20} color="red" /> Delete 
          </p>
          <hr />
          <p
            onClick={() => {
              handleUpdateOnOpenModal?.();
              handleDropDownCard();
            }}
          >
           <RiEdit2Fill size={20} color="green" /> Update 
          </p>
          <hr />
          <p
            onClick={() => {
              save?.();
              handleDropDownCard();
            }}
          >
          <MdOutlineLibraryAdd size={20} color="green" />  Save 
          </p>
          <hr />
        </div>
      )}
    </div>
  );
};

export default DropDownCard;
