import axios from "axios";
import Fuse from "fuse.js";
import React, { Fragment, useState } from "react";
import { HeaderComponent, ModalComponent } from "~/components";
import { IModalControls } from "~/models";
import { getVSCode } from "~/utilities";

interface IGitHubData {
  token: string;
  user: string;
}

interface IRepo {
  name: string;
  description: string;
  url: string;
}

interface IProps {
  githubData: IGitHubData;
}

export const RepoPage = (props: IProps) => {
  const { githubData } = props;

  const [repos, setRepos] = useState<IRepo[]>([]);
  const [filter, setFilter] = useState("");

  const vscode = getVSCode();

  let modalControls: IModalControls;

  async function getRepos() {
    const { data } = await axios.get(`https://api.github.com/user/repos`, {
      headers: {
        Authorization: `token ${githubData.token}`
      }
    });

    setRepos(
      [...data].map<IRepo>(r => ({
        name: r.name,
        description: r.description,
        url: r.html_url
      }))
    );
  }

  const createNew = async () => {
    const nameInput = document.querySelector<HTMLInputElement>("#name");

    if (!nameInput) return;

    const name = nameInput.value;

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
      });

      return modalControls.show();
    }

    const privateCheckbox = document.querySelector<HTMLInputElement>(
      "#isPrivate"
    );

    if (!privateCheckbox) return;

    const isPrivate = privateCheckbox.checked;

    const body = {
      name,
      owner: githubData.user,
      description: `${githubData.user}'s Syncify Settings Repository`,
      private: isPrivate
    };

    try {
      await axios.post(`https://api.github.com/user/repos`, {
        data: body,
        headers: {
          Authorization: `token ${githubData.token}`
        }
      });

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
      });

      modalControls.show();
    } catch (err) {
      modalControls.setContent({
        id: "created",
        title: "Error Creating Repository!",
        message: err,
        buttons: [
          {
            name: "Back",
            color: "secondary",
            action: () => null
          }
        ]
      });

      modalControls.show();
    }
  };

  const useExisting = async (name: string) => {
    const url = `https://api.github.com/repos/${githubData.user}/${name}`;

    await axios.get(url, {
      headers: {
        Authorization: `token ${githubData.token}`
      }
    });

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
    });

    modalControls.show();
  };

  const sendMessage = (name: string) => {
    vscode.postMessage(
      `https://${githubData.user}:${githubData.token}@github.com/${githubData.user}/${name}`
    );
  };

  const fuse = new Fuse(repos, { keys: ["name", "description"] });

  const formatRepos = () => (filter ? fuse.search(filter) : repos);

  return (
    <Fragment>
      <HeaderComponent />
      <ModalComponent
        onMount={controls => {
          modalControls = controls;
        }}
      />
      <div>
        <h3>New Repository</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Repository Name</label>
            <input
              type="text"
              className="form-control form-control-lg text"
              id="name"
              placeholder="Enter New Repository Name"
            />
          </div>
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="isPrivate"
              defaultChecked
            />
            <label className="custom-control-label" htmlFor="isPrivate">
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
      <div className="mt-4">
        <h3 className="mb-3">Existing Repository</h3>
        {!!repos.length && (
          <Fragment>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg text"
                id="filter"
                placeholder="Search Repositories"
                onChange={e => setFilter(e.target.value)}
              />
            </div>
            <div className="list-group">
              {formatRepos().map(r => (
                <span
                  className="list-group-item d-flex flex-column flex-sm-row justify-content-between"
                  key={r.name}
                >
                  <div>
                    <h5 className="mb-1">{r.name}</h5>
                    <p className="mb-0">
                      {r.description || "No description for this repository."}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-primary btn-lg w-sm-auto mt-2 mt-sm-0 mr-2"
                    >
                      View
                    </a>
                    <button
                      onClick={() => useExisting(r.name)}
                      className="btn btn-primary btn-lg w-sm-auto mt-2 mt-sm-0"
                    >
                      Use This
                    </button>
                  </div>
                </span>
              ))}
              {!formatRepos().length && (
                <span className="list-group-item">
                  <h5 className="mb-1">No Repositories Found</h5>
                  <p className="mb-0">
                    There are no repositories matching your search query.
                  </p>
                </span>
              )}
            </div>
          </Fragment>
        )}
        {!repos.length && (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => getRepos()}
          >
            Load Repositories
          </button>
        )}
      </div>
    </Fragment>
  );
};
