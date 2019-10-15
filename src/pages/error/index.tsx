import axios from "axios";
import { sanitize } from "dompurify";
import marked from "marked";
import React, { Fragment, useEffect, useState } from "react";
import { HeaderComponent } from "~/components";
import { IDescriptor } from "~/models";

const sheetId = `1nbbW74yPHti1SX4LSYgESKqLgMBmHUhwhS14wISwGHE`;
const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`;

interface IProps {
  error: string;
}

const defaultDescriptor: IDescriptor = {
  description: `No description found for this error`,
  matcher: /a/
};

export const ErrorPage = (props: IProps) => {
  const { error } = props;

  const [descriptors, setDescriptors] = useState<IDescriptor[]>([]);

  const getDescriptor = async () => {
    const { data } = await axios.get(url);

    setDescriptors(
      [...data.feed.entry].map<IDescriptor>(e => ({
        description: marked(sanitize(e.gsx$description.$t)),
        matcher: new RegExp(e.gsx$matcher.$t, "gi")
      }))
    );
  };

  useEffect(() => {
    getDescriptor();
  }, []);

  const getDescription = () => {
    const desc = descriptors.find(d => d.matcher.test(error));
    return (desc || defaultDescriptor).description;
  };

  return (
    <Fragment>
      <HeaderComponent />
      <div className="row flex-lg-grow-1 align-content-start">
        <div className="col-lg overflow-auto">
          <h3 className="mx-auto mb-3">Description</h3>
          <p
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: getDescription()
            }}
          />
        </div>
        <div className="col-lg overflow-auto">
          <h3 className="mx-auto mt-2 mt-lg-0 mb-3">Error</h3>
          <pre>
            <code>{error}</code>
          </pre>
        </div>
      </div>
    </Fragment>
  );
};
