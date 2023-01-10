import React, { FC, ReactNode } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import ModalStyle from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
  title?: string;
  onSaveButton?: () => void;
  onResetButton?: () => void;
  showActionButton?: boolean;
}

const Modal: FC<ModalProps> = ({
  onClose,
  open,
  children,
  title,
  onSaveButton,
  onResetButton,
  showActionButton,
}) => {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} className={ModalStyle.overlay}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={ModalStyle.modalContainer}
        >
          <div className={ModalStyle.modalRight}>
            <div className={ModalStyle.modalHeader}>
              <h5>{title}</h5>
              <p onClick={onClose}>
                <AiFillCloseCircle size={30} color="red" />
              </p>
            </div>
            <hr />

            <div className={ModalStyle.childrenDesign}>{children}</div>

            {showActionButton && (
              <div className={ModalStyle.btnContainer}>
                <span
                  className={ModalStyle.resetButton}
                  onClick={onResetButton}
                >
                  Reset
                </span>

                <span className={ModalStyle.saveButton} onClick={onSaveButton}>
                  Save
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
