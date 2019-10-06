import React from "react";
import { getVSCode } from "~/utilities";

const vscode = getVSCode();

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
      onBlur={e => {
        vscode.postMessage({
          setting: props.correspondingSetting,
          value: Number(e.target.value)
        });
      }}
    />
  </div>
);
