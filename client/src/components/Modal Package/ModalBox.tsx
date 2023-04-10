import { FC, ReactNode } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import modalBoxStyle from "./ModalBox.module.scss";

interface ModalBoxProps {
  open: boolean;
  onCloseModal: () => void;
  title?: string;
  children: ReactNode;
  onSaveButton?: () => void;
  onResetButton?: () => void;
  showSelectPhotoFromLibaryButton?: boolean;
  showActionButton?: boolean;
  selectedImageList?:[];
}

const ModalBox: FC<ModalBoxProps> = ({
  open,
  onCloseModal,
  title,
  children,
  onSaveButton,
  onResetButton,
  showActionButton,
  showSelectPhotoFromLibaryButton,
  selectedImageList
}) => {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{
        overlay: `${modalBoxStyle.customOverlay}`,
        modal: `${modalBoxStyle.customModal}`,
      }}
    >
      <h6>{title}</h6>
      <hr />

      {children}

      {showActionButton && (
        <div className={modalBoxStyle.modalActionButton}>
          <button onClick={onResetButton} className="btn btn-danger">
            Reset
          </button>
          <button onClick={onSaveButton} className="btn btn-success">
            Save
          </button>
        </div>
      )}

      {showSelectPhotoFromLibaryButton && (
        <div className={modalBoxStyle.modalActionButton}>
          <button onClick={onResetButton} className="btn btn-danger">
            Remove all
          </button>
          <button onClick={()=>{onSaveButton?.();onCloseModal()}} className="btn btn-info">
            Select {selectedImageList?.length}
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ModalBox;
