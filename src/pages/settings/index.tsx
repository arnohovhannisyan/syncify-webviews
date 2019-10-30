import React, { Fragment } from "react";
import { HeaderComponent, SectionComponent } from "~/components";
import { ISection } from "~/models";
import { useVSCode } from "~/utilities";

interface IProps {
  settings: any;
  sections: ISection[];
}

export const SettingsPage = (props: IProps) => {
  const { sections, settings } = props;

  const vscode = useVSCode();

  return (
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
    </Fragment>
  );
};
