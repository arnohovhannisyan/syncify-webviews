import React from "react";
import { Utilities } from "../../utilities";

const vscode = Utilities.getVSCode();

interface IProps {
  correspondingSetting: string;
  value: boolean;
  name: string;
}

export const CheckboxComponent = (props: IProps) => (
  <div className="custom-control custom-checkbox my-2">
    <input
      className="custom-control-input checkbox"
      defaultChecked={props.value}
      type="checkbox"
      id={`setting:${props.correspondingSetting}`}
      onChange={e =>
        vscode.postMessage({
          setting: props.correspondingSetting,
          value: e.target.checked
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
