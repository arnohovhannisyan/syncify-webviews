import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: string;
  name: string;
  placeholder: string;
}

export class TextInputComponent extends Component<IProps> {
  public render() {
    return (
      <div className="form-group mb-4">
        <label htmlFor={`setting:${this.props.correspondingSetting}`}>
          {this.props.name}
        </label>
        <input
          type="text"
          className="form-control text"
          defaultValue={this.props.value}
          id={`setting:${this.props.correspondingSetting}`}
          placeholder={this.props.placeholder}
          onBlur={e => {
            vscode.postMessage({
              setting: this.props.correspondingSetting,
              value: e.target.value
            });
          }}
        />
      </div>
    );
  }
}
