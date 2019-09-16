import React, { Fragment } from "react";

const headerComponent = () => (
  <Fragment>
    <h1 className="pb-4 header-h1">Syncify</h1>
    <h2 className="mx-auto pt-2">
      Sync your <b>settings</b> and <b>extensions</b> across multiple machines
    </h2>
    <h2 className="mx-auto pb-4">
      by <a href="https://github.com/arnohovhannisyan">@arnohovhannisyan</a>
    </h2>
  </Fragment>
);

export { headerComponent as HeaderComponent };
