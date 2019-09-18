import React, { Fragment } from "react";
import { IChange } from "../../models";

const repoUrl = `https://github.com/arnohovhannisyan/vscode-syncify`;

function generateThanks({ pullRequest, author }: IChange) {
  return (
    <span>
      &nbsp;(Thanks to <a href={`https://github.com/${author}`}>@{author}</a>{" "}
      for PR <a href={`${repoUrl}/pull/${pullRequest}`}>#{pullRequest}</a>)
    </span>
  );
}

interface IProps {
  changes: IChange[];
  version: string;
}

export const ChangelogComponent = (props: IProps) => (
  <Fragment>
    <h3 className="mx-auto mt-2 text-left whats-new">
      What's New in <a href={repoUrl}>Syncify {props.version}</a>
    </h3>
    {props.changes.map(change => (
      <h5 className="change mx-auto mt-2 mb-2" key={change.details}>
        <span className={`badge badge-${change.color} mr-2`}>
          {change.type}
        </span>
        <span>{change.details}</span>
        <span>
          {change.author && change.pullRequest && generateThanks(change)}
        </span>
      </h5>
    ))}
  </Fragment>
);
