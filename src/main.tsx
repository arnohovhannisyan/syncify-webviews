import "~/css/global";

import { h, render, Fragment } from "preact";
import { defaultSections, defaultSettings } from "~/defaults";
import { PageType, AuthData } from "~/models";
import { ErrorPage, LandingPage, RepoPage, SettingsPage } from "~/pages";
import { getData, runningOnVSCode } from "~/utilities";
import useSearchParam from "react-use/esm/useSearchParam";
import { HeaderComponent } from "~/components";

document.querySelector("#_defaultStyles")?.remove();

const page: PageType = runningOnVSCode()
	? getData("page")
	: (window.location.pathname.slice(1) as any);

const App = (): h.JSX.Element => {
	const pages: { [key in PageType]: () => h.JSX.Element } = {
		landing: LandingPage,
		repo: () => {
			const data: AuthData = runningOnVSCode()
				? getData("auth")
				: {
						token: useSearchParam("token"),
						user: useSearchParam("user"),
						provider: useSearchParam("provider"),
				  };

			return <RepoPage authData={data} />;
		},
		settings: () => (
			<SettingsPage
				sections={runningOnVSCode() ? getData("sections") : defaultSections}
				settings={runningOnVSCode() ? getData("settings") : defaultSettings}
			/>
		),
		error: () => {
			const error: string = runningOnVSCode()
				? getData("error")
				: useSearchParam("error") ?? "";

			return <ErrorPage error={error} />;
		},
	};

	const Page = pages[page] ?? pages.landing;

	return (
		<Fragment>
			<HeaderComponent />
			<Page />
		</Fragment>
	);
};

render(<App />, document.querySelector("#root")!);
