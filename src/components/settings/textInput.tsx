import React, { useEffect } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUpdate } from "~/models";
import { getVSCode } from "~/utilities";

const vscode = getVSCode();

interface IProps {
  correspondingSetting: string;
  value: string;
  name: string;
  placeholder: string;
}

export const TextInputComponent = (props: IProps) => {
  const subject = new Subject<IUpdate>();

  useEffect(() => {
    const subscription = subject
      .pipe(debounceTime(1000))
      .subscribe(update => vscode.postMessage(update));

    return () => subscription.unsubscribe();
  });

  return (
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
        onChange={e => {
          subject.next({
            setting: props.correspondingSetting,
            value: e.target.value
          });
        }}
      />
    </div>
  );
};
