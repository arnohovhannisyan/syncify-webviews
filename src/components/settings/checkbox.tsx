import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: boolean;
  name: string;
}

export class CheckboxComponent extends Component<IProps> {
  public render() {
    return (
      <div className="custom-control custom-checkbox my-1 mr-sm-2 mb-4">
        <input
          className="custom-control-input checkbox"
          defaultChecked={this.props.value}
          type="checkbox"
          id={`setting:${this.props.correspondingSetting}`}
          onChange={({ target }) =>
            vscode.postMessage({
              setting: this.props.correspondingSetting,
              value: target.checked
            })
          }
        />
        <label
          htmlFor={`setting:${this.props.correspondingSetting}`}
          className="custom-control-label"
        >
          {this.props.name}
        </label>
      </div>
    );
  }
}
