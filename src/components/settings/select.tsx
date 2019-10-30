import React, { useEffect } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IOption, IUpdate } from "~/models";
import { useVSCode } from "~/utilities";

interface IProps {
  correspondingSetting: string;
  value: string;
  name: string;
  options: IOption[];
}

export const SelectComponent = (props: IProps) => {
  const vscode = useVSCode();

  const { name, value, options, correspondingSetting } = props;

  const subject = new Subject<IUpdate>();

  useEffect(() => {
    const subscription = subject
      .pipe(debounceTime(1000))
      .subscribe(update => vscode.postMessage(update));

    return () => subscription.unsubscribe();
  });
  return (
    <div className="form-group mb-3">
      <label htmlFor={`setting:${correspondingSetting}`}>{name}</label>
      <select
        className="form-control padded-input"
        id={`setting:${correspondingSetting}`}
        defaultValue={value}
        onChange={e => {
          subject.next({
            setting: correspondingSetting,
            value: e.target.value
          });
        }}
      >
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
