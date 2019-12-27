import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ITextArea, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";

interface IProps {
  map: ITextArea;
  value: string[];
  onChange?: (update: IUpdate) => any;
}

export const TextAreaComponent = (props: IProps) => {
  const vscode = getVSCode();

  const { name, placeholder, correspondingSetting } = props.map;

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
        as="textarea"
        className="padded-input"
        id={`setting:${correspondingSetting}`}
        rows={value.length}
        placeholder={placeholder}
        value={value.join("\n")}
        onChange={e => {
          const update: IUpdate = {
            setting: correspondingSetting,
            value: e.currentTarget.value
              .split("\n")
              .filter(a => !!a && !/^\s*$/.test(a))
          };

          setValue(update.value);

          subject.next(update);
          if (props.onChange) props.onChange(update);
        }}
      ></Form.Control>
    </Form.Group>
  );
};
