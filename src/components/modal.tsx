import { h } from "preact";
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
      class={
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
          <button
            onClick={() => {
              props.handleClose();
              btn.action();
            }}
            class={`btn btn-${btn.color}`}
            key={btn.name}
          >
            {btn.name}
          </button>
        ))}
      </Modal.Footer>
    </div>
  </Modal>
);
