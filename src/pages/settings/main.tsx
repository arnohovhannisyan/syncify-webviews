import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles";

import React, { Fragment } from "react";
import { render } from "react-dom";
import { HeaderComponent, SectionComponent } from "../../components";
import { ISection, ISettingType } from "../../models";
import { Utilities } from "../../utilities";

if (!Utilities.runningOnVSCode()) {
  document.body.classList.add("runningOnWeb");
}

const vscode = Utilities.getVSCode();

const settings = Utilities.runningOnVSCode()
  ? Utilities.getData("settings")
  : {
      testNumber: 10,
      testString: "Hello!",
      testArray: ["1!", "2!", "3!"],
      testSelect: "1",
      testBool: true
    };

const sections: ISection[] = Utilities.runningOnVSCode()
  ? Utilities.getData("sections")
  : [
      {
        name: "General",
        settings: [
          {
            name: "Test Number",
            correspondingSetting: "testNumber",
            type: ISettingType.NumberInput,
            placeholder: "Enter a number!"
          },
          {
            name: "Test String",
            correspondingSetting: "testString",
            type: ISettingType.TextInput,
            placeholder: "Enter a string!"
          },
          {
            name: "Test Array",
            correspondingSetting: "testArray",
            type: ISettingType.TextArea,
            placeholder: "Enter multiple strings!"
          },
          {
            name: "Test Select",
            correspondingSetting: "testSelect",
            type: ISettingType.Select,
            placeholder: "Choose one!",
            options: [
              { name: "One", value: "1" },
              { name: "Two", value: "2" },
              { name: "Three", value: "3" }
            ]
          },
          {
            name: "Test Boolean",
            correspondingSetting: "testBool",
            type: ISettingType.Checkbox
          }
        ]
      }
    ];

render(
  <Fragment>
    <HeaderComponent />
    <a href="#" onClick={() => vscode.postMessage("edit")}>
      Open file in editor
    </a>
    {sections.map(section => (
      <SectionComponent
        name={section.name}
        map={section.settings}
        settings={settings}
        key={section.name}
      />
    ))}
  </Fragment>,
  document.querySelector("#root")
);
