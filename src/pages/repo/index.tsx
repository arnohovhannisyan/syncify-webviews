import dashify from "dashify";
import Fuse from "fuse.js";
import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { HeaderComponent, ModalComponent } from "~/components";
import { ChangeEvent, IAuthData, IModalContent, IRepo } from "~/models";
import { Data } from "~/pages/repo/data";
import { getVSCode } from "~/utilities";

interface IProps {
  authData: IAuthData;
}

export const RepoPage = (props: IProps) => {
  const { authData } = props;

  const [repos, setRepos] = useState<IRepo[]>([]);
  const [filter, setFilter] = useState("");

  const [repoName, setRepoName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const [modalContent, setModalContent] = useState<IModalContent>({
    buttons: [],
    id: "",
    message: "",
    title: ""
  });

  const [showModal, setShowModal] = useState(false);

  const vscode = getVSCode();

  const getRepos = async () => setRepos(await Data.getRepos(authData));

  const createNew = async () => {
    if (!repoName) {
      setModalContent({
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

      return setShowModal(true);
    }

    const name = dashify(repoName);

    try {
      await Data.createNew(name, isPrivate, authData);

      sendMessage(name);

      setModalContent({
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

      setShowModal(true);
    } catch (err) {
      setModalContent({
        id: "created",
        title: "Error Creating Repository!",
        message: err.message,
        buttons: [
          {
            name: "Back",
            color: "secondary",
            action: () => null
          }
        ]
      });

      setShowModal(true);
    }
  };

  const useExisting = async (name: string) => {
    sendMessage(name);

    setModalContent({
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

    setShowModal(true);
  };

  const sendMessage = (name: string) => {
    const urls = {
      github: `https://${authData.user}:${authData.token}@github.com/${authData.user}/${name}`,
      gitlab: `https://oauth2:${authData.token}@gitlab.com/${authData.user}/${name}`,
      bitbucket: `https://x-token-auth:${authData.token}@bitbucket.org/${authData.user}/${name}`
    };

    vscode.postMessage(urls[authData.provider]);
  };

  const fuse = new Fuse(repos, { keys: ["name", "description"] });

  const formatRepos = () => (filter ? fuse.search(filter) : repos);

  return (
    <Fragment>
      <HeaderComponent />
      <ModalComponent
        content={modalContent}
        handleClose={() => setShowModal(false)}
        show={showModal}
      />
      <div>
        <h3>New Repository</h3>
        <Form.Group>
          <Form.Label>Repository Name</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            className="padded-input"
            placeholder="Enter New Repository Name"
            onChange={(e: ChangeEvent) => setRepoName(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Check
          custom
          className="custom-control-lg mb-3"
          defaultChecked
          label="Private"
          id="isPrivate"
          onChange={(e: ChangeEvent) => setIsPrivate(e.target.checked)}
        />
        <Button size="lg" onClick={createNew}>
          Create
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="mb-3">Existing Repository</h3>
        {!!repos.length && (
          <Fragment>
            <Form.Group>
              <Form.Control
                className="padded-input"
                type="text"
                size="lg"
                placeholder="Search Repositories"
                onChange={(e: ChangeEvent) => setFilter(e.currentTarget.value)}
              />
            </Form.Group>
            <ListGroup>
              {formatRepos().map(r => (
                <ListGroup.Item
                  className="d-flex flex-column flex-lg-row justify-content-between"
                  key={r.name}
                >
                  <div>
                    <h5 className="mb-1">{r.name}</h5>
                    <p className="mb-0 pr-2">
                      {r.description || "No description for this repository."}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button
                      href={r.url}
                      size="lg"
                      className="w-lg-auto mt-2 mt-lg-0 mr-2"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => useExisting(r.name)}
                      size="lg"
                      className="w-lg-auto mt-2 mt-lg-0 text-nowrap"
                    >
                      Use This
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
              {!formatRepos().length && (
                <ListGroup.Item>
                  <h5 className="mb-1">No Repositories Found</h5>
                  <p className="mb-0">
                    There are no repositories matching your search query.
                  </p>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Fragment>
        )}
        {!repos.length && (
          <Button size="lg" onClick={getRepos}>
            Load Repositories
          </Button>
        )}
      </div>
    </Fragment>
  );
};
