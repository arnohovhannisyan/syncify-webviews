import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { HeaderComponent } from "~/components";
import { getVSCode } from "~/utilities";

export const LandingPage = () => {
  const vscode = getVSCode();

  return (
    <Fragment>
      <HeaderComponent />
      <Row>
        <Col lg>
          <h3 className="mx-auto mb-3">Getting Started</h3>
          <Row>
            <Col lg className="mb-2">
              <Button
                onClick={() => vscode.postMessage("github")}
                className="btn-github"
              >
                <span className="icon-github mr-2" /> Login with GitHub
              </Button>
            </Col>
            <div className="w-100" />
            <Col lg className="mb-2">
              <Button
                className="btn-gitlab"
                onClick={() => vscode.postMessage("gitlab")}
              >
                <span className="icon-gitlab mr-2" /> Login with GitLab
              </Button>
            </Col>
            <div className="w-100" />
            <Col lg className="mb-2">
              <Button
                onClick={() => vscode.postMessage("bitbucket")}
                className="btn-bitbucket"
              >
                <span className="icon-bitbucket mr-2" /> Login with BitBucket
              </Button>
            </Col>
            <div className="w-100" />
            <Col lg className="mb-2">
              <Button onClick={() => vscode.postMessage("nologin")}>
                <span className="icon-arrow-down mr-2" /> Download Without Login
              </Button>
            </Col>
            <div className="w-100" />
            <Col lg className="mb-2">
              <Button onClick={() => vscode.postMessage("settings")}>
                <span className="icon-cog mr-2" /> Open Settings
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg>
          <h3 className="mx-auto mt-2 mt-lg-0 mb-3">Need Help?</h3>
          <Row>
            <Col lg className="mb-2">
              <Button href="https://github.com/arnohovhannisyan/vscode-syncify/wiki/Quick-Start">
                Quick Start Guide
              </Button>
            </Col>
            <div className="w-100" />
            <Col lg className="mb-2">
              <Button href="https://github.com/arnohovhannisyan/vscode-syncify/issues/new/choose">
                Create an Issue
              </Button>
            </Col>
            <div className="w-100" />
            <Col lg className="mb-2">
              <Button href="https://join.slack.com/t/vscode-syncify/shared_invite/enQtNzc5MjYyMjYyNzEwLWQ5MGMxNDljZjk5NmYwNWZlYTBmYjk0MjliNjgyYWRkM2NiYjU2YjExY2RmODg2MGIyZTUwY2YzYWM2YThjMmM">
                Join the Slack Workspace
              </Button>
            </Col>
            <div className="w-100" />
            <Col lg className="mb-2">
              <Button href="https://discord.gg/DwFKj57">
                Join the Discord Server
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};
