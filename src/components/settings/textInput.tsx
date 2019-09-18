import React from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: string;
  name: string;
  placeholder: string;
}

export const TextInputComponent = (props: IProps) => (
  <div className="form-group mb-4">
    <label htmlFor={`setting:${props.correspondingSetting}`}>
      {props.name}
    </label>
    <input
      type="text"
      className="form-control text"
      defaultValue={props.value}
      id={`setting:${props.correspondingSetting}`}
      placeholder={props.placeholder}
      onBlur={e => {
        vscode.postMessage({
          setting: props.correspondingSetting,
          value: e.target.value
        });
      }}
    />
  </div>
);
