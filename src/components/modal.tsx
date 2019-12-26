import "bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IModalContent } from "~/models";

interface IProps {
  content: IModalContent;
  show: boolean;
  handleClose: () => any;
}

export const ModalComponent = (props: IProps) => (
  <Modal show={props.show} onHide={props.handleClose} centered>
    <div
      className={
        document.body.className.includes("vscode-light")
          ? "bg-light"
          : "bg-dark"
      }
    >
      <Modal.Header>
        <Modal.Title>{props.content.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content.message}</Modal.Body>
      <Modal.Footer>
        {props.content.buttons.map(btn => (
          <Button
            onClick={() => {
              props.handleClose();
              btn.action();
            }}
            key={btn.name}
            variant={btn.color}
          >
            {btn.name}
          </Button>
        ))}
      </Modal.Footer>
    </div>
  </Modal>
);
