import React, { ReactNode, FC } from "react";
import "./ConfirmModal.module.css";
import ModalStyle from "./Modal.module.css";
import ConfirmModalStyle from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  onCloseModal: () => void;
  openConfirmModal: boolean;
  children: ReactNode;
  message?: string;
  onConfirmButton?: () => void;
  showActionButton?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  onCloseModal,
  openConfirmModal,
  children,
  message,
  onConfirmButton,
  showActionButton,
}) => {
  if (!openConfirmModal) return null;

  return (
    <>
      <div onClick={onCloseModal} className={ConfirmModalStyle.overlay}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={ConfirmModalStyle.modalContainer}
        >
          <div className={ConfirmModalStyle.modalRight}>
            <div className={ConfirmModalStyle.childrenDesign}>{children}</div>
            {showActionButton && (
              <div className={ConfirmModalStyle.btnContainer}>
                <span
                  className={ConfirmModalStyle.resetButton}
                  onClick={onCloseModal}
                >
                  Cancel
                </span>
                <span className={ConfirmModalStyle.confirmButton} onClick={()=>{onConfirmButton?.();onCloseModal?.()}}>
                  Confirm
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
