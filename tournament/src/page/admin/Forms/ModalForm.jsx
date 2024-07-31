import React from "react";
import { Modal } from "react-bootstrap";

function ModalForm({ title, component, handleClose, show }) {

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{component}</Modal.Body>
    </Modal>
  );
}

export default ModalForm;
