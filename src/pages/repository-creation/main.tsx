import "../../vendor/fontawesome/css/fontawesome.min.css";
import "../../vendor/fontawesome/css/solid.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.scss";
import "../../vendor/google/*.ttf";

import $ from "jquery";
import React, { Fragment } from "react";
import { render } from "react-dom";
import { IContent, ModalComponent } from "../../components";
import { IModalControls } from "../../models";
import { Utilities } from "../../services";

const vscode = Utilities.getVSCode();

const githubData = Utilities.getData("github");

let modalControls: IModalControls;

render(
  <Fragment>
    <ModalComponent
      onMount={controls => {
        modalControls = controls;
      }}
    ></ModalComponent>
    <div className="row content-row text-left">
      <div className="col mt-2 scrollable">
        <h3 className="mx-auto mt-2 text-center">New Repository</h3>
        <form>
          <div className="form-group">
            <label htmlFor="new-text">Repository Name</label>
            <input
              type="text"
              className="form-control form-control-lg text"
              id="new-text"
              placeholder="Enter New Repository Name"
            />
          </div>
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="new-private"
              defaultChecked
            />
            <label className="custom-control-label" htmlFor="new-private">
              Private
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => createNew()}
          >
            Create
          </button>
        </form>
      </div>
    </div>
    <div className="row content-row text-left">
      <div className="col mt-2 scrollable">
        <h3 className="mx-auto mt-2 text-center">Existing Repository</h3>
        <form>
          <div className="form-group">
            <label htmlFor="existing">Repository Name</label>
            <input
              type="text"
              className="form-control form-control-lg text"
              id="existing"
              placeholder="Enter Existing Repository Name"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => useExisting()}
          >
            Use This
          </button>
        </form>
      </div>
    </div>
  </Fragment>,
  document.querySelector("#root")
);

async function createNew() {
  const name = $("#new-text").val() as string;
  if (!name) {
    modalControls.setContent({
      id: "invalidName",
      title: "Invalid Repository Name!",
      message: `The name of the repository must not be empty.`,
      buttons: [
        {
          name: "Back",
          color: "secondary",
          action: () => null
        }
      ]
    } as IContent);

    return modalControls.show();
  }

  const isPrivate = $("#new-private").is(":checked");

  console.log(isPrivate);

  const host = new URL(githubData.host).hostname;

  const res = await fetch(`https://api.${host}/user/repos`, {
    body: JSON.stringify({
      name,
      owner: githubData.user,
      description: `${githubData.user}'s Syncify Settings Repository`,
      private: isPrivate
    }),
    method: "POST",
    headers: {
      Authorization: `token ${githubData.token}`
    }
  });

  const repo = await res.json();

  if (repo.name) {
    sendMessage(name);

    modalControls.setContent({
      id: "created",
      title: "Repository Created!",
      message: `The repository has been created and registered with Syncify! You may now lose
      this tab.`,
      buttons: [
        {
          name: "Close",
          color: "primary",
          action: () => vscode.postMessage({ close: true })
        }
      ]
    } as IContent);

    modalControls.show();
  } else {
    modalControls.setContent({
      id: "errorCreating",
      title: "Error Creating Repository!",
      message: repo.message,
      buttons: [
        {
          name: "Back",
          color: "secondary",
          action: () => null
        }
      ]
    } as IContent);

    return modalControls.show();
  }
}

async function useExisting() {
  const name = $("#existing").val() as string;

  if (!name) {
    modalControls.setContent({
      id: "invalidRepo",
      title: "Invalid Repository Name!",
      message: `The name of the repository must not be empty.`,
      buttons: [
        {
          name: "Back",
          color: "secondary",
          action: () => null
        }
      ]
    } as IContent);

    return modalControls.show();
  }

  const host = new URL(githubData.host).hostname;

  const res = await fetch(
    `https://api.${host}/repos/${githubData.user}/${name}`,
    {
      headers: {
        Authorization: `token ${githubData.token}`
      }
    }
  );

  const repo = await res.json();
  if (repo.message !== "Not Found") {
    sendMessage(name);

    modalControls.setContent({
      id: "registered",
      title: "Repository Registered!",
      message: `The repository has been registered with Syncify! You may now lose
      this tab.`,
      buttons: [
        {
          name: "Close",
          color: "primary",
          action: () => vscode.postMessage({ close: true })
        }
      ]
    } as IContent);

    modalControls.show();
  } else {
    modalControls.setContent({
      id: "errorRegistering",
      title: "Error Registering Repository!",
      message: `The repository you requested was not found.`,
      buttons: [
        {
          name: "Back",
          color: "secondary",
          action: () => null
        }
      ]
    } as IContent);

    modalControls.show();
  }
}

function sendMessage(name: string) {
  const host = new URL(githubData.host).hostname;
  vscode.postMessage(
    `https://${githubData.user}:${githubData.token}@${host}/${githubData.user}/${name}`
  );
}