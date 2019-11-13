import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUpdate } from "~/models";
import { useVSCode } from "~/utilities";

interface IProps {
  correspondingSetting: string;
  value: boolean;
  name: string;
  onChange?: (update: IUpdate) => any;
}

export const CheckboxComponent = (props: IProps) => {
  const vscode = useVSCode();

  const { name, correspondingSetting } = props;

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
    <div className="custom-control custom-control-lg custom-checkbox my-2">
      <input
        className="custom-control-input"
        checked={value}
        type="checkbox"
        id={`setting:${correspondingSetting}`}
        onChange={e => {
          const update: IUpdate = {
            setting: correspondingSetting,
            value: e.target.checked
          };

          setValue(update.value);

          subject.next(update);
          if (props.onChange) props.onChange(update);
        }}
      />
      <label
        htmlFor={`setting:${correspondingSetting}`}
        className="custom-control-label"
      >
        {name}
      </label>
    </div>
  );
};
