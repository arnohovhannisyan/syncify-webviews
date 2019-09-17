import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IState {
  value: string[];
}

interface IProps {
  correspondingSetting: string;
  value: string[];
  name: string;
  placeholder: string;
}

export class TextAreaComponent extends Component<IProps, IState> {
  public state: IState = {
    value: this.props.value
  };

  public render() {
    return (
      <div className="form-group mb-3">
        <label htmlFor={`setting:${this.props.correspondingSetting}`}>
          {this.props.name}
        </label>
        <textarea
          className="form-control textarea"
          id={`setting:${this.props.correspondingSetting}`}
          rows={this.props.value.length}
          placeholder={this.props.placeholder}
          value={this.state.value.join("\n")}
          onChange={({ target }) => {
            this.setState({ value: target.value.split("\n") });
            vscode.postMessage({
              setting: this.props.correspondingSetting,
              value: target.value
                .split("\n")
                .filter(a => !!a && !/^\s*$/.test(a))
            });
          }}
        ></textarea>
      </div>
    );
  }
}
