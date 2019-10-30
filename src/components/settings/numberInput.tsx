import React, { useEffect } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUpdate } from "~/models";
import { useVSCode } from "~/utilities";

interface IProps {
  correspondingSetting: string;
  value: number;
  name: string;
  placeholder: string;
}

export const NumberInputComponent = (props: IProps) => {
  const vscode = useVSCode();

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
        type="number"
        defaultValue={value.toString()}
        className="form-control padded-input"
        id={`setting:${correspondingSetting}`}
        placeholder={placeholder}
        onChange={e => {
          subject.next({
            setting: correspondingSetting,
            value: Number(e.target.value)
          });
        }}
      />
    </div>
  );
};
