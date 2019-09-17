import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.scss";
import "../../vendor/google/*.ttf";

import React, { Fragment } from "react";
import { render } from "react-dom";
import { HeaderComponent } from "../../components";
import { ChangelogComponent } from "../../components/landing/changelog";
import { IChange } from "../../models";
import { Utilities } from "../../services";

if (!Utilities.runningOnVSCode()) {
  document.body.classList.add("runningOnWeb");
}

const vscode = Utilities.getVSCode();

const changes: IChange[] = Utilities.runningOnVSCode()
  ? Utilities.getData("changes")
  : [
      {
        details: "Pragma Support",
        type: "NEW",
        color: "success"
      },
      {
        details: "Fix Repository Creation",
        type: "FIX",
        color: "danger"
      },
      {
        details: "GUI for Settings and Setup",
        type: "NEW",
        color: "success"
      }
    ];

const version = Utilities.runningOnVSCode()
  ? Utilities.getData("version")
  : "1.13.0";

render(
  <Fragment>
    <HeaderComponent></HeaderComponent>
    <div className="row content-row">
      <div className="col text-left mt-2 scrollable">
        <ChangelogComponent
          changes={changes}
          version={version}
        ></ChangelogComponent>
      </div>
      <div className="col mt-2 scrollable">
        <h3 className="mx-auto mt-2 text-left">Getting Started</h3>
        <p className="mx-auto mt-2 mb-3 text-left">
          Login via GitHub to setup Syncify, or configure the settings manually.
        </p>
        <div className="container p-0 mb-3">
          <div className="row">
            <div className="col">
              <a
                href="#"
                onClick={() => vscode.postMessage("loginWithGitHub")}
                title="Login with GitHub"
                className="btn btn-primary font-weight-bold"
              >
                Login with GitHub
              </a>
            </div>
            <div className="col">
              <a
                href="#"
                onClick={() => vscode.postMessage("editConfiguration")}
                title="Edit Configuration"
                className="btn btn-primary font-weight-bold"
              >
                Edit Configuration
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer row text-left">
      <div className="col col-one">
        <h3 className="mx-auto mb-3">Need Help?</h3>
        <a href="https://github.com/arnohovhannisyan/vscode-syncify/">
          Homepage
        </a>
        <br />
        <a href="https://github.com/arnohovhannisyan/vscode-syncify/issues">
          Questions & Issues
        </a>
        <br />
      </div>
    </footer>
  </Fragment>,
  document.querySelector("#root")
);
