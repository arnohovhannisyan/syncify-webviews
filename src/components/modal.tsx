import "bootstrap";
import $ from "jquery";
import React, { useState } from "react";
import { IModalContent, IModalControls } from "../models";

interface IProps {
  onMount: (controls: IModalControls) => void;
}

export const ModalComponent = (props: IProps) => {
  const [content, setContent] = useState<IModalContent>({
    buttons: [],
    id: "",
    message: "",
    title: ""
  });

  props.onMount({
    show: () => $(".modal").modal("show"),
    hide: () => $(".modal").modal("hide"),
    setContent: (c: IModalContent) => setContent(c)
  });

  return (
    <div
      className="modal fade"
      id={`modal-${content.id}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className={`modal-content ${
            document.body.className.includes("vscode-light")
              ? "bg-light"
              : "bg-dark"
          }`}
        >
          <div className="modal-header">
            <h5 className="modal-title text-left" id="exampleModalCenterTitle">
              {content.title}
            </h5>
          </div>
          <div className="modal-body text-left">{content.message}</div>
          <div className="modal-footer">
            {content.buttons.map(btn => (
              <button
                type="button"
                className={`btn btn-${btn.color}`}
                data-dismiss="modal"
                onClick={() => btn.action()}
                key={btn.name}
              >
                {btn.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
