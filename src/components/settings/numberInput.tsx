import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUpdate } from "~/models";
import { useVSCode } from "~/utilities";

interface IProps {
  correspondingSetting: string;
  value: number;
  name: string;
  placeholder: string;
  onChange?: (update: IUpdate) => any;
}

export const NumberInputComponent = (props: IProps) => {
  const vscode = useVSCode();

  const { name, placeholder, correspondingSetting } = props;

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
    <div className="form-group mb-4">
      <label htmlFor={`setting:${correspondingSetting}`}>{name}</label>
      <input
        type="number"
        value={value.toString()}
        className="form-control padded-input"
        id={`setting:${correspondingSetting}`}
        placeholder={placeholder}
        onChange={e => {
          const update: IUpdate = {
            setting: correspondingSetting,
            value: Number(e.target.value)
          };

          setValue(update.value);

          subject.next(update);
          if (props.onChange) props.onChange(update);
        }}
      />
    </div>
  );
};
