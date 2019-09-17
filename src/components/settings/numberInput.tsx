import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IState {
  value: number;
}

interface IProps {
  correspondingSetting: string;
  value: number;
  name: string;
  placeholder: string;
}

export class NumberInputComponent extends Component<IProps, IState> {
  public state: IState = {
    value: this.props.value
  };

  public render() {
    return (
      <div className="form-group mb-4">
        <label htmlFor={`setting:${this.props.correspondingSetting}`}>
          {this.props.name}
        </label>
        <input
          type="number"
          value={this.state.value}
          className="form-control number"
          id={`setting:${this.props.correspondingSetting}`}
          placeholder={this.props.placeholder}
          onChange={({ target }) => {
            this.setState({ value: Number(target.value) });
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
