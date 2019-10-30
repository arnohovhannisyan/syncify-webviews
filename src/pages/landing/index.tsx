import React, { Fragment } from "react";
import { HeaderComponent } from "~/components";
import { useVSCode } from "~/utilities";

export const LandingPage = () => {
  const vscode = useVSCode();

  return (
    <Fragment>
      <HeaderComponent />
      <div className="row flex-lg-grow-1 align-content-start">
        <div className="col-lg overflow-auto">
          <h3 className="mx-auto mb-3">Getting Started</h3>
          <div className="row">
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("github")}
                className="btn btn-github"
              >
                <span className="icon-github mr-2" /> Login with GitHub
              </button>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("gitlab")}
                className="btn btn-gitlab"
              >
                <span className="icon-gitlab mr-2" /> Login with GitLab
              </button>
            </div>
            <div className="w-100"></div>
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("bitbucket")}
                className="btn btn-bitbucket"
              >
                <span className="icon-bitbucket mr-2" /> Login with BitBucket
              </button>
            </div>
            <div className="w-100"></div>
            <div className="col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("settings")}
                className="btn btn-primary"
              >
                <span className="icon-cog mr-2" /> Open Settings
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg overflow-auto">
          <h3 className="mx-auto mt-2 mt-lg-0 mb-3">Need Help?</h3>
          <div className="row">
            <div className="col-lg mb-2">
              <a
                href="https://github.com/arnohovhannisyan/vscode-syncify/wiki/Quick-Start"
                className="btn btn-primary"
              >
                Quick Start Guide
              </a>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <a
                href="https://github.com/arnohovhannisyan/vscode-syncify/issues/new/choose"
                className="btn btn-primary"
              >
                Create an Issue
              </a>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <a
                href="https://join.slack.com/t/vscode-syncify/shared_invite/enQtNzc5MjYyMjYyNzEwLWQ5MGMxNDljZjk5NmYwNWZlYTBmYjk0MjliNjgyYWRkM2NiYjU2YjExY2RmODg2MGIyZTUwY2YzYWM2YThjMmM"
                className="btn btn-primary"
              >
                Join the Slack Workspace
              </a>
            </div>
            <div className="w-100" />
            <div className="col-lg mb-2">
              <a href="https://discord.gg/DwFKj57" className="btn btn-primary">
                Join the Discord Server
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
