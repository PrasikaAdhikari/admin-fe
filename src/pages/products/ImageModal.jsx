import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ImageModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img src={props.image} alt="product image" width="100%" />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
