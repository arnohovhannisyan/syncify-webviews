import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

export interface IOption {
  value: string;
  name: string;
}

interface IProps {
  correspondingSetting: string;
  value: string;
  name: string;
  options: IOption[];
}

export class SelectComponent extends Component<IProps> {
  public render() {
    return (
      <div className="form-group mb-3">
        <label htmlFor={`setting:${this.props.correspondingSetting}`}>
          {this.props.name}
        </label>
        <select
          className="form-control select"
          id={`setting:${this.props.correspondingSetting}`}
          defaultValue={this.props.value}
          onChange={({ target }) => {
            this.setState({ value: target.value });
            vscode.postMessage({
              setting: this.props.correspondingSetting,
              value: target.value
            });
          }}
        >
          {this.props.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
