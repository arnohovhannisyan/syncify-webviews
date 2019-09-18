import React from "react";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: boolean;
  name: string;
}

export const CheckboxComponent = (props: IProps) => (
  <div className="custom-control custom-checkbox my-1 mr-sm-2 mb-4">
    <input
      className="custom-control-input checkbox"
      defaultChecked={props.value}
      type="checkbox"
      id={`setting:${props.correspondingSetting}`}
      onChange={({ target }) =>
        vscode.postMessage({
          setting: props.correspondingSetting,
          value: target.checked
        })
      }
    />
    <label
      htmlFor={`setting:${props.correspondingSetting}`}
      className="custom-control-label"
    >
      {props.name}
    </label>
  </div>
);
