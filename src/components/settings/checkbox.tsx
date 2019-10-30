import React, { useEffect } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUpdate } from "~/models";
import { getVSCode } from "~/utilities";

const vscode = getVSCode();

interface IProps {
  correspondingSetting: string;
  value: boolean;
  name: string;
}

export const CheckboxComponent = (props: IProps) => {
  const { name, value, correspondingSetting } = props;

  const subject = new Subject<IUpdate>();

  useEffect(() => {
    const subscription = subject
      .pipe(debounceTime(1000))
      .subscribe(update => vscode.postMessage(update));

    return () => subscription.unsubscribe();
  });

  return (
    <div className="custom-control custom-control-lg custom-checkbox my-2">
      <input
        className="custom-control-input"
        defaultChecked={value}
        type="checkbox"
        id={`setting:${correspondingSetting}`}
        onChange={e =>
          subject.next({
            setting: correspondingSetting,
            value: e.target.checked
          })
        }
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
