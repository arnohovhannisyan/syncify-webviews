import "bootstrap/dist/css/bootstrap.min.css";
import "~/styles";

import React from "react";
import { render } from "react-dom";
import { defaultSections, defaultSettings } from "~/defaults";
import { PageType } from "~/models";
import { LandingPage, RepoPage, SettingsPage } from "~/pages";
import Utilities from "~/utilities";

if (!Utilities.runningOnVSCode()) {
  document.body.classList.add("runningOnWeb");
}

const page: PageType = Utilities.runningOnVSCode()
  ? Utilities.getData("page")
  : window.location.pathname.slice(1);

const PageElement = () => {
  switch (page) {
    case PageType.Landing:
      return <LandingPage />;
    case PageType.Repo:
      const params = new URLSearchParams(location.search.slice(1));
      const data = Utilities.runningOnVSCode()
        ? Utilities.getData("auth")
        : {
            token: params.get("token"),
            user: params.get("user"),
            provider: params.get("provider")
          };

      return <RepoPage authData={data} />;
    case PageType.Settings:
      return (
        <SettingsPage
          sections={
            Utilities.runningOnVSCode()
              ? Utilities.getData("sections")
              : defaultSections
          }
          settings={
            Utilities.runningOnVSCode()
              ? Utilities.getData("settings")
              : defaultSettings
          }
        />
      );
    default:
      return <LandingPage />;
  }
};

render(<PageElement />, document.querySelector("#root"));
