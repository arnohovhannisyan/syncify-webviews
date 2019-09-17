import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: number;
  name: string;
  placeholder: string;
}

export class NumberInputComponent extends Component<IProps> {
  public render() {
    return (
      <div className="form-group mb-4">
        <label htmlFor={`setting:${this.props.correspondingSetting}`}>
          {this.props.name}
        </label>
        <input
          type="number"
          defaultValue={this.props.value.toString()}
          className="form-control number"
          id={`setting:${this.props.correspondingSetting}`}
          placeholder={this.props.placeholder}
          onBlur={({ target }) => {
            vscode.postMessage({
              setting: this.props.correspondingSetting,
              value: Number(target.value)
            });
          }}
        />
      </div>
    );
  }
}
