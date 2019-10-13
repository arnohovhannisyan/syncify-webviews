import React, { Fragment } from "react";
import { HeaderComponent } from "~/components";
import { getVSCode } from "~/utilities";

export const LandingPage = () => {
  const vscode = getVSCode();

  return (
    <Fragment>
      <HeaderComponent />
      <div className="row flex-sm-grow-1 align-content-start">
        <div className="col-lg overflow-auto">
          <h3 className="mx-auto mb-3">Getting Started</h3>
          <div className="row">
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("github")}
                title="Login with GitHub"
                className="btn btn-github font-weight-bold"
              >
                <span className="fab fa-github mr-2" /> Login with GitHub
              </button>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("gitlab")}
                title="Login with GitLab"
                className="btn btn-gitlab font-weight-bold"
              >
                <span className="fab fa-gitlab mr-2" /> Login with GitLab
              </button>
            </div>
            <div className="w-100"></div>
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("bitbucket")}
                title="Login with BitBucket"
                className="btn btn-bitbucket font-weight-bold"
              >
                <span className="fab fa-bitbucket mr-2" /> Login with BitBucket
              </button>
            </div>
            <div className="w-100"></div>
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("settings")}
                title="Open Settings"
                className="btn btn-primary font-weight-bold"
              >
                <span className="fas fa-cog mr-2" /> Open Settings
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg overflow-auto">
          <h3 className="mx-auto mt-2 mt-sm-0 mb-3">Need Help?</h3>
          <div className="row">
            <div className="col-lg mb-2">
              <a
                href="https://github.com/arnohovhannisyan/vscode-syncify/"
                title="Homepage"
                className="btn btn-primary font-weight-bold"
              >
                Homepage
              </a>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <a
                href="https://github.com/arnohovhannisyan/vscode-syncify/wiki/Quick-Start"
                title="Quick Start Guide"
                className="btn btn-primary font-weight-bold"
              >
                Quick Start Guide
              </a>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <a
                href="https://github.com/arnohovhannisyan/vscode-syncify/issues"
                title="Issues"
                className="btn btn-primary font-weight-bold"
              >
                Issues
              </a>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <a
                href="https://join.slack.com/t/vscode-syncify/shared_invite/enQtNzc5MjYyMjYyNzEwLWQ5MGMxNDljZjk5NmYwNWZlYTBmYjk0MjliNjgyYWRkM2NiYjU2YjExY2RmODg2MGIyZTUwY2YzYWM2YThjMmM"
                title="Join our Slack"
                className="btn btn-primary font-weight-bold"
              >
                Join our Slack
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
