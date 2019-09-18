import React from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: number;
  name: string;
  placeholder: string;
}

export const NumberInputComponent = (props: IProps) => (
  <div className="form-group mb-4">
    <label htmlFor={`setting:${props.correspondingSetting}`}>
      {props.name}
    </label>
    <input
      type="number"
      defaultValue={props.value.toString()}
      className="form-control number"
      id={`setting:${props.correspondingSetting}`}
      placeholder={props.placeholder}
      onBlur={({ target }) => {
        vscode.postMessage({
          setting: props.correspondingSetting,
          value: Number(target.value)
        });
      }}
    />
  </div>
);
