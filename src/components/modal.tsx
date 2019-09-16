import "bootstrap";
import $ from "jquery";
import React, { Component } from "react";
import { IModalControls } from "../models/modalControls";

interface IProps {
  onMount: (controls: IModalControls) => void;
}

interface IState {
  content: IContent;
}

interface IButton {
  name: string;
  color: "primary" | "secondary";
  action: () => void;
}

export interface IContent {
  id: string;
  title: string;
  message: string;
  buttons: IButton[];
}

export class ModalComponent extends Component<IProps, IState> {
  public state: IState = {
    content: {
      buttons: [],
      id: "",
      message: "",
      title: ""
    }
  };

  public componentDidMount() {
    this.props.onMount({
      show: () => $(`.modal`).modal("show"),
      hide: () => $(`.modal`).modal("hide"),
      setContent: (content: IContent) => this.setState({ content })
    });
  }

  public render() {
    return (
      <div
        className="modal fade"
        id={`modal-${this.state.content.id}`}
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
              <h5
                className="modal-title text-left"
                id="exampleModalCenterTitle"
              >
                {this.state.content.title}
              </h5>
            </div>
            <div className="modal-body text-left">
              {this.state.content.message}
            </div>
            <div className="modal-footer">
              {this.state.content.buttons.map(btn => (
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
  }
}
