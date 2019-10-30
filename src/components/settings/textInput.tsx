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
  const { name, value, placeholder, correspondingSetting } = props;

  const subject = new Subject<IUpdate>();

  useEffect(() => {
    const subscription = subject
      .pipe(debounceTime(1000))
      .subscribe(update => vscode.postMessage(update));

    return () => subscription.unsubscribe();
  });

  return (
    <div className="form-group mb-4">
      <label htmlFor={`setting:${correspondingSetting}`}>{name}</label>
      <input
        type="text"
        className="form-control padded-input"
        defaultValue={value}
        id={`setting:${correspondingSetting}`}
        placeholder={placeholder}
        onChange={e => {
          subject.next({
            setting: correspondingSetting,
            value: e.target.value
          });
        }}
      />
    </div>
  );
};
