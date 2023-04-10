import React, { ReactNode, FC } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

import "./CardLayout.css";

interface IPropsCardLayout {
  title?: string;
  cardHeight?: string;
  children?: ReactNode;
  buttonColor?: string;
  backgroun_color?: string;
  closeButton?: () => void;
  closeButtonText?: string;
  postCount?: number;
  openModal?: () => void;
  headerTitle?: string;
  showAddIcon?: boolean;
}
const CardLayout: FC<IPropsCardLayout> = ({
  children,
  title,
  cardHeight,
  buttonColor,
  closeButton,
  closeButtonText,
  backgroun_color,
  postCount,
  openModal,
  headerTitle,
  showAddIcon,
}) => {
  return (
    <div
      className="card-layout-design"
      style={{ height: cardHeight, backgroundColor: backgroun_color }}
    >
      <div className="cardHeader">
        <h5>{headerTitle}</h5>
        {showAddIcon && (
          <span onClick={openModal}>
            <IoAddCircleSharp size={25} />
          </span>
        )}
      </div>
      <h5>
        {title} {postCount}
      </h5>
      {children}

      {closeButton && (
        <button
          type="submit"
          name="btnSubmit"
          style={{ color: buttonColor }}
          className="btn btn-danger"
          onClick={closeButton}
        >
          {closeButtonText}
        </button>
      )}
    </div>
  );
};

export default CardLayout;
