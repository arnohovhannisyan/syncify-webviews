import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUpdate } from "~/models";
import { useVSCode } from "~/utilities";

interface IProps {
  correspondingSetting: string;
  value: string[];
  name: string;
  placeholder: string;
  onChange?: (update: IUpdate) => any;
}

export const TextAreaComponent = (props: IProps) => {
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
    <div className="form-group mb-3">
      <label htmlFor={`setting:${correspondingSetting}`}>{name}</label>
      <textarea
        className="form-control padded-input"
        id={`setting:${correspondingSetting}`}
        rows={value.length}
        placeholder={placeholder}
        value={value.join("\n")}
        onChange={e => {
          const update: IUpdate = {
            setting: correspondingSetting,
            value: e.target.value
              .split("\n")
              .filter(a => !!a && !/^\s*$/.test(a))
          };

          setValue(update.value);

          subject.next(update);
          if (props.onChange) props.onChange(update);
        }}
      />
    </div>
  );
};
