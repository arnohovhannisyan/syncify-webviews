import React, { Fragment } from "react";
import { ISettingMap } from "~/models";
import { getSettingComponent } from "~/utilities";

interface IProps {
  name: string;
  map: ISettingMap[];
  settings: any;
}

export const SectionComponent = (props: IProps) => (
  <Fragment>
    <h3 className="mt-2">{props.name}</h3>
    {props.map.map(setting => getSettingComponent(props.settings, setting))}
  </Fragment>
);
