import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IOption, IUpdate } from "~/models";
import { useVSCode } from "~/utilities";

interface IProps {
  correspondingSetting: string;
  value: string;
  name: string;
  options: IOption[];
  onChange?: (update: IUpdate) => any;
}

export const SelectComponent = (props: IProps) => {
  const vscode = useVSCode();

  const { name, options, correspondingSetting } = props;

  const [value, setValue] = useState(props.value);
  const [subject] = useState(new Subject<IUpdate>());

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const subscription = subject
      .pipe(debounceTime(1000))
      .subscribe(update => vscode.postMessage(update));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="form-group mb-3">
      <label htmlFor={`setting:${correspondingSetting}`}>{name}</label>
      <select
        className="form-control padded-input"
        id={`setting:${correspondingSetting}`}
        value={value}
        onChange={e => {
          const update: IUpdate = {
            setting: correspondingSetting,
            value: e.target.value
          };

          setValue(update.value);

          subject.next(update);
          if (props.onChange) props.onChange(update);
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
