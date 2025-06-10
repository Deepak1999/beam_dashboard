import React, { useEffect } from "react";

const DynamicModal = ({
  id,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  submitLabel = "Submit",
  submitClass = "btn-success",
  modalType,
  hideSubmit,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.getElementById(`${id}-open`)?.click();
    } else {
      if (document.getElementById(id)) {
        document.getElementById(`${id}-close`)?.click();
      }
    }
  });

  return (
    <>
      <button
        type="button"
        id={`${id}-open`}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target={`#${id}`}
      >
        Launch demo modal
      </button>

      <div
        className={`modal fade`}
        id={id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className={`modal-dialog  ${modalType} `}>
          <div className="modal-content">
            <div className="modal-header">
              {id == "create_expense1" ? (
                <h6 className="modal-title">{title}</h6>
              ) : (
                <h5 className="modal-title">{title}</h5>
              )}
              <button
                type="button"
                data-bs-dismiss="modal"
                id={`${id}-close`}
                className="btn-close"
                onClick={(e) => {
                  onClose(e);
                }}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  onClose(e);
                }}
              >
                Close
              </button>
              {!hideSubmit ? (
                <></>
              ) : (
                <button
                  type="submit"
                  className={`btn ${submitClass}`}
                  onClick={onSubmit}
                >
                  {submitLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicModal;
