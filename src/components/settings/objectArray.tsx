import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ISettingMap, IUpdate } from "~/models";
import { getSettingComponent, useVSCode } from "~/utilities";

interface IProps {
  correspondingSetting: string;
  schema: ISettingMap[];
  value: object[];
  name: string;
  newTemplate: object;
}

export const ObjectArrayComponent = (props: IProps) => {
  const vscode = useVSCode();

  const { name, schema, newTemplate, correspondingSetting } = props;

  const [value, setValue] = useState(props.value);
  const [subject] = useState(new Subject<IUpdate>());

  useEffect(() => {
    const subscription = subject
      .pipe(debounceTime(1000))
      .subscribe(update => vscode.postMessage(update));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="form-group mb-4">
      <label htmlFor={`setting:${correspondingSetting}`}>{name}</label>
      {value.map((val, i) => {
        const rootPath = `${correspondingSetting}[${i}]`;
        const settings = set({}, rootPath, val);

        return (
          <div className="mb-4 mb-sm-0" key={i}>
            <div className="d-flex flex-wrap">
              <div className="flex-grow-1">
                <p className="element-counter mb-1">Element {i}</p>
                {Object.keys(val).map(key => (
                  <div key={key}>
                    {getSettingComponent(
                      settings,
                      {
                        ...schema.filter(
                          s => s.correspondingSetting === key
                        )[0],
                        correspondingSetting: `${rootPath}.${key}`
                      },
                      update => {
                        const path = update.setting.slice(rootPath.length + 1);

                        setValue(prev =>
                          set([...prev], `[${i}].${path}`, update.value)
                        );
                      }
                    )}
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary w-sm-auto w-100 h-auto ml-sm-4 mb-sm-4"
                onClick={() => {
                  setValue(prev => {
                    const newVal = prev.filter(v => v !== val);

                    subject.next({
                      setting: correspondingSetting,
                      value: newVal
                    });

                    return newVal;
                  });
                }}
              >
                <span className="icon-close"></span>
              </button>
            </div>
          </div>
        );
      })}
      <button
        className="btn btn-primary"
        onClick={() =>
          setValue(prev => {
            const newVal = [...prev, cloneDeep(newTemplate)];

            subject.next({
              setting: correspondingSetting,
              value: newVal
            });

            return newVal;
          })
        }
      >
        <span className="icon-plus"></span>
      </button>
    </div>
  );
};