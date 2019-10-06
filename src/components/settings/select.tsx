import React from "react";
import { Utilities } from "../../utilities";

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

export const SelectComponent = (props: IProps) => (
  <div className="form-group mb-3">
    <label htmlFor={`setting:${props.correspondingSetting}`}>
      {props.name}
    </label>
    <select
      className="form-control select"
      id={`setting:${props.correspondingSetting}`}
      defaultValue={props.value}
      onChange={e => {
        vscode.postMessage({
          setting: props.correspondingSetting,
          value: e.target.value
        });
      }}
    >
      {props.options.map(option => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);
