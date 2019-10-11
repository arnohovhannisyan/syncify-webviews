import React from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUpdate } from "~/models";
import { getVSCode } from "~/utilities";

const vscode = getVSCode();

interface IProps {
  correspondingSetting: string;
  value: number;
  name: string;
  placeholder: string;
}

export const NumberInputComponent = (props: IProps) => {
  const subject = new Subject<IUpdate>();

  subject
    .pipe(debounceTime(1000))
    .subscribe(update => vscode.postMessage(update));

  return (
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
        onChange={e => {
          subject.next({
            setting: props.correspondingSetting,
            value: Number(e.target.value)
          });
        }}
      />
    </div>
  );
};
