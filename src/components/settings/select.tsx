import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ISelect, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";

interface IProps {
  map: ISelect;
  value: string;
  onChange?: (update: IUpdate) => any;
}

export const SelectComponent = (props: IProps) => {
  const vscode = getVSCode();

  const { name, options, correspondingSetting } = props.map;

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
    <Form.Group className="mb-3">
      <Form.Label>{name}</Form.Label>
      <Form.Control
        as="select"
        className="padded-input"
        id={`setting:${correspondingSetting}`}
        value={value}
        onChange={e => {
          const update: IUpdate = {
            setting: correspondingSetting,
            value: e.currentTarget.value
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
      </Form.Control>
    </Form.Group>
  );
};
