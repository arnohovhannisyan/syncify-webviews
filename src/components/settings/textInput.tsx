import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IState {
  value: string;
}

interface IProps {
  correspondingSetting: string;
  value: string;
  name: string;
  placeholder: string;
}

export class TextInputComponent extends Component<IProps, IState> {
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
          type="text"
          className="form-control text"
          value={this.state.value}
          id={`setting:${this.props.correspondingSetting}`}
          placeholder={this.props.placeholder}
          onChange={e => this.setState({ value: e.target.value })}
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
