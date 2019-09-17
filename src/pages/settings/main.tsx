import "../../vendor/fontawesome/css/fontawesome.min.css";
import "../../vendor/fontawesome/css/solid.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.scss";
import "../../vendor/google/*.ttf";

import React, { Fragment } from "react";
import { render } from "react-dom";
import { HeaderComponent, SectionComponent } from "../../components";
import { ISection, ISettingType } from "../../models";
import { Utilities } from "../../services";

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
    <HeaderComponent></HeaderComponent>
    <div className="row content-row text-left">
      <div className="col mt-2 scrollable">
        <form>
          {sections.map(section => (
            <SectionComponent
              name={section.name}
              map={section.settings}
              settings={settings}
              key={section.name}
            ></SectionComponent>
          ))}
        </form>
        <button
          className="btn btn-secondary btn-lg"
          id="edit"
          onClick={() => vscode.postMessage("edit")}
        >
          <i className="fa fa-pen"></i>
        </button>
      </div>
    </div>
  </Fragment>,
  document.querySelector("#root")
);
