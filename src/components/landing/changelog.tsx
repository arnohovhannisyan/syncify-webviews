import React, { Component, Fragment } from "react";
import { IChange } from "../../models";

const repoUrl = `https://github.com/arnohovhannisyan/vscode-syncify`;

function generateThanks({ pullRequest, author }: IChange) {
  return (
    <span>
      {" "}
      (Thanks to <a href={`https://github.com/${author}`}>@{author}</a> for PR{" "}
      <a href={`${repoUrl}/pull/${pullRequest}`}>#{pullRequest}</a>)
    </span>
  );
}

interface IProps {
  changes: IChange[];
  version: string;
}

export class ChangelogComponent extends Component<IProps> {
  public render() {
    return (
      <Fragment>
        <h3 className="mx-auto mt-2 text-left">
          What's New in&nbsp;
          <a
            id="current-version"
            href="https://github.com/arnohovhannisyan/vscode-syncify"
          >
            <b>Syncify {this.props.version}</b>
          </a>
        </h3>
        {this.props.changes.map(change => (
          <h5 className="change mx-auto mt-2 mb-2" key={change.details}>
            <span className={`badge badge-${change.color} mr-2`}>
              {change.type}
            </span>
            {change.details}
            {change.author && change.pullRequest && generateThanks(change)}
          </h5>
        ))}
      </Fragment>
    );
  }
}
