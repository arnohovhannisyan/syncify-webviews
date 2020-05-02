import "~/css/global";

import { h, render, Fragment } from "preact";
import { PageType } from "~/models";
import { ErrorPage, LandingPage, RepoPage, SettingsPage } from "~/pages";
import { getData, runningOnVSCode } from "~/utilities";
import { HeaderComponent } from "~/components";

document.querySelector("#_defaultStyles")?.remove();

const data = getData("data");

const page: PageType = runningOnVSCode()
	? getData("page")
	: (window.location.pathname.slice(1) as any);

const App = (): h.JSX.Element => {
	return (
		<Fragment>
			<HeaderComponent />
			{(() => {
				switch (page) {
					default:
					case "landing":
						return <LandingPage />;
					case "repo":
						return <RepoPage data={data} />;
					case "settings":
						return <SettingsPage data={data} />;
					case "error":
						return <ErrorPage data={data} />;
				}
			})()}
		</Fragment>
	);
};

render(<App />, document.querySelector("#root")!);
