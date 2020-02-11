import { sanitize } from "dompurify";
import marked from "marked";
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
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
    const data = await fetch(url).then(res => res.json());

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
      <div class="row">
        <div class="col col-lg">
          <h3 class="mx-auto mb-3">Description</h3>
          <p
            class="markdown"
            dangerouslySetInnerHTML={{
              __html: getDescription()
            }}
          />
        </div>
        <div class="col col-lg">
          <h3 class="mx-auto mt-2 mt-lg-0 mb-3">Error</h3>
          <pre>
            <code>{error}</code>
          </pre>
        </div>
      </div>
    </Fragment>
  );
};
