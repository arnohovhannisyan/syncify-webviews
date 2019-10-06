import React from "react";
import { Utilities } from "../../utilities";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: string[];
  name: string;
  placeholder: string;
}

export const TextAreaComponent = (props: IProps) => (
  <div className="form-group mb-3">
    <label htmlFor={`setting:${props.correspondingSetting}`}>
      {props.name}
    </label>
    <textarea
      className="form-control textarea"
      id={`setting:${props.correspondingSetting}`}
      rows={props.value.length}
      placeholder={props.placeholder}
      defaultValue={props.value.join("\n")}
      onBlur={e => {
        vscode.postMessage({
          setting: props.correspondingSetting,
          value: e.target.value.split("\n").filter(a => !!a && !/^\s*$/.test(a))
        });
      }}
    />
  </div>
);
