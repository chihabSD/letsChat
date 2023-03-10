import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { CenterContext } from "../contexts";

import { useRedux } from "../hooks/useRedux";
import { handleImagePreview } from "../redux/reducers/friends";

import { _toggleMessageImagePrview } from "../redux/reducers/toggler";
const ImagePreview = () => {
  const { imagePreview, dispatch } = useRedux();

  const { toggleImagePreview } = useContext(CenterContext);

  let handleCloseModal = () => {
    dispatch(handleImagePreview([]));
    toggleImagePreview();
  };
  return (
    <div className="image-preview">
      <div className="image-preview-modal">
        <div className="modal-side left">
          <div>
            <div className="icon" onClick={handleCloseModal}>
              <GrClose size={19} />
            </div>
          </div>
        </div>
        <div className="image-content">
          <img src={imagePreview.imageUrl} alt="" />
        </div>

        <div className="modal-side">{/* <div>Rights</div> */}</div>
      </div>
    </div>
  );
};

export default ImagePreview;
