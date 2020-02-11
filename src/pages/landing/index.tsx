import { Fragment, h } from "preact";
import { HeaderComponent } from "~/components";
import { getVSCode } from "~/utilities";

export const LandingPage = () => {
  const vscode = getVSCode();

  return (
    <Fragment>
      <HeaderComponent />
      <div class="row">
        <div class="col col-lg">
          <h3 class="mx-auto mb-3">Getting Started</h3>
          <div class="row">
            <div class="col col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("github")}
                class="btn btn-github"
              >
                <span class="icon-github mr-2" /> Login with GitHub
              </button>
            </div>
            <div class="w-100" />
            <div class="col col-lg mb-2">
              <button
                class="btn btn-gitlab"
                onClick={() => vscode.postMessage("gitlab")}
              >
                <span class="icon-gitlab mr-2" /> Login with GitLab
              </button>
            </div>
            <div class="w-100" />
            <div class="col col-lg mb-2">
              <button
                onClick={() => vscode.postMessage("bitbucket")}
                class="btn btn-bitbucket"
              >
                <span class="icon-bitbucket mr-2" /> Login with BitBucket
              </button>
            </div>
            <div class="w-100" />
            <div class="col col-lg mb-2">
              <button
                class="btn btn-primary"
                onClick={() => vscode.postMessage("nologin")}
              >
                <span class="icon-arrow-down mr-2" /> Download Without Login
              </button>
            </div>
            <div class="w-100" />
            <div class="col col-lg mb-2">
              <button
                class="btn btn-primary"
                onClick={() => vscode.postMessage("settings")}
              >
                <span class="icon-cog mr-2" /> Open Settings
              </button>
            </div>
          </div>
        </div>
        <div class="col col-lg">
          <h3 class="mx-auto mt-2 mt-lg-0 mb-3">Need Help?</h3>
          <div class="row">
            <div class="col col-lg mb-2">
              <a
                class="btn btn-primary"
                href="https://github.com/arnohovhannisyan/vscode-syncify/wiki/Quick-Start"
              >
                Quick Start Guide
              </a>
            </div>
            <div class="w-100" />
            <div class="col col-lg mb-2">
              <a
                class="btn btn-primary"
                href="https://github.com/arnohovhannisyan/vscode-syncify/issues/new/choose"
              >
                Create an Issue
              </a>
            </div>
            <div class="w-100" />
            <div class="col col-lg mb-2">
              <a
                class="btn btn-primary"
                href="https://join.slack.com/t/vscode-syncify/shared_invite/enQtNzc5MjYyMjYyNzEwLWQ5MGMxNDljZjk5NmYwNWZlYTBmYjk0MjliNjgyYWRkM2NiYjU2YjExY2RmODg2MGIyZTUwY2YzYWM2YThjMmM"
              >
                Join the Slack Workspace
              </a>
            </div>
            <div class="w-100" />
            <div class="col col-lg mb-2">
              <a class="btn btn-primary" href="https://discord.gg/DwFKj57">
                Join the Discord Server
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
