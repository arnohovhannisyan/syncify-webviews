import React, { Component } from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: string[];
  name: string;
  placeholder: string;
}

export class TextAreaComponent extends Component<IProps> {
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
          defaultValue={this.props.value.join("\n")}
          onBlur={e => {
            vscode.postMessage({
              setting: this.props.correspondingSetting,
              value: e.target.value
                .split("\n")
                .filter(a => !!a && !/^\s*$/.test(a))
            });
          }}
        ></textarea>
      </div>
    );
  }
}
