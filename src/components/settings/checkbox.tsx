import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ChangeEvent, ICheckbox, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";

interface IProps {
  map: ICheckbox;
  value: boolean;
  onChange?: (update: IUpdate) => any;
}

export const CheckboxComponent = (props: IProps) => {
  const vscode = getVSCode();

  const { name, correspondingSetting } = props.map;

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
    <Form.Check
      custom
      className="custom-control-lg my-2"
      checked={value}
      id={`setting:${correspondingSetting}`}
      onChange={(e: ChangeEvent) => {
        const update: IUpdate = {
          setting: correspondingSetting,
          value: e.target.checked
        };

        setValue(update.value);

        subject.next(update);
        if (props.onChange) props.onChange(update);
      }}
      label={name}
    />
  );
};
