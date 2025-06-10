import React, { useEffect } from "react";
import { Modal } from "bootstrap";

const DetailModal = ({ isOpen, onClose = () => {}, details }) => {
  useEffect(() => {
    const modalElement = document.getElementById("detailModal");
    if (modalElement) {
      if (isOpen) {
        modalElement.click();
      } else {
        modalElement.click();
      }
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        id="detailModal"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal61"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal61"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  const modalElement = document.getElementById("detailModal");
                  const modalInstance = new Modal(modalElement);
                  modalInstance.hide();
                  onClose();
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <strong>Month:</strong> {details.month}
                  </div>
                  <div className="col-md-3">
                    <strong>Year:</strong> {details.year}
                  </div>
                  <div className="col-md-3">
                    <strong>Cost Center Name:</strong> {details.costCenterName}
                  </div>
                  <div className="col-md-3">
                    <strong>Head:</strong> {details.head}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-3">
                    <strong>Ledger Name:</strong> {details.ledgerName}
                  </div>
                  <div className="col-md-3">
                    <strong>Business Type:</strong> {details.businessType}
                  </div>
                  <div className="col-md-3">
                    <strong>Quantity:</strong> {details.quantity}
                  </div>
                  <div className="col-md-3">
                    <strong>Rate per Unit:</strong> {details.ratePerUnit}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-3">
                    <strong>Total Amount:</strong> {details.totalAmount}
                  </div>
                  <div className="col-md-3">
                    <strong>Upload ID:</strong> {details.uploadId}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailModal;
