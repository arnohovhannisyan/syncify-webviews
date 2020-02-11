import "bootstrap/dist/css/bootstrap.min.css";
import "~/styles";

import { h, render } from "preact";
import { defaultSections, defaultSettings } from "~/defaults";
import { PageType } from "~/models";
import { ErrorPage, LandingPage, RepoPage, SettingsPage } from "~/pages";
import { getData, runningOnVSCode } from "~/utilities";
import useSearchParam from "react-use/esm/useSearchParam";

if (!runningOnVSCode()) {
  document.body.classList.add("runningOnWeb");
}

const page: PageType = runningOnVSCode()
  ? getData("page")
  : window.location.pathname.slice(1);

const PageElement = () => {
  switch (page) {
    case "repo":
      const data = runningOnVSCode()
        ? getData("auth")
        : {
            token: useSearchParam("token"),
            user: useSearchParam("user"),
            provider: useSearchParam("provider")
          };

      return <RepoPage authData={data} />;
    case "settings":
      return (
        <SettingsPage
          sections={runningOnVSCode() ? getData("sections") : defaultSections}
          settings={runningOnVSCode() ? getData("settings") : defaultSettings}
        />
      );
    case "error":
      const err = runningOnVSCode()
        ? getData("error")
        : useSearchParam("error") || "";

      return <ErrorPage error={err} />;
    default:
    case "landing":
      return <LandingPage />;
  }
};

render(<PageElement />, document.querySelector("#root") ?? document.body);
