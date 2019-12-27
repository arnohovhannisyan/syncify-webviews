import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ChangeEvent, INumberInput, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";

interface IProps {
  map: INumberInput;
  value: number;
  onChange?: (update: IUpdate) => any;
}

export const NumberInputComponent = (props: IProps) => {
  const vscode = getVSCode();

  const { name, placeholder, correspondingSetting, min, max } = props.map;

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
    <Form.Group className="mb-4">
      <Form.Label>{name}</Form.Label>
      <Form.Control
        type="number"
        value={value.toString()}
        className="padded-input"
        id={`setting:${correspondingSetting}`}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e: ChangeEvent) => {
          const update: IUpdate = {
            setting: correspondingSetting,
            value: Number(e.currentTarget.value)
          };

          setValue(update.value);

          subject.next(update);
          if (props.onChange) props.onChange(update);
        }}
      />
    </Form.Group>
  );
};
