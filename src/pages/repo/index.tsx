import Fuse from "fuse.js";
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { IAuthData, IRepo } from "~/models";
import * as Data from "~/pages/repo/data";
import { getVSCode } from "~/utilities";
import css from "csz";
import components from "~/css/components";
import Notifications, { notify } from "react-notify-toast";
import compose from "~/css/compose";

interface IProps {
	authData: IAuthData;
}

const styles = {
	gappedGrid: css`
		display: grid;
		gap: 1rem;
	`,

	grid: css`
		display: grid;
		gap: 2rem;

		grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
	`,

	listItem: css`
		display: grid;
		gap: 1rem;

		grid-template-areas:
			"n n n n"
			"d d d d"
			"b b b b";

		grid-template-columns: auto auto auto auto;

		@media (min-width: 992px) {
			grid-template-areas:
				"n n n b"
				"d d d b";

			grid-template-columns: auto auto auto 300px;
		}

		& > div {
			grid-area: b;
		}

		& > h3 {
			grid-area: n;
			margin: 0;
			font-weight: 600;
		}

		& > p {
			grid-area: d;
			margin: 0;
		}

		padding: 1rem;
		background-color: #e9e9e9;
		border-radius: 0.3rem;
		color: #343a40;
	`
};

export const RepoPage = (props: IProps): h.JSX.Element => {
	const { authData } = props;

	const [repos, setRepos] = useState<IRepo[]>([]);
	const [filter, setFilter] = useState("");

	const [repoName, setRepoName] = useState("");
	const [isPrivate, setIsPrivate] = useState(true);

	const vscode = getVSCode();

	const getRepos = async (): Promise<void> => {
		try {
			setRepos(await Data.getRepos(authData));
		} catch (error) {
			notify.show(
				`Error fetching repositories: ${String(error.message)}`,
				"error",
				2000
			);
		}
	};

	const createNew = async (): Promise<void> => {
		if (!repoName) {
			return notify.show(
				"The name of the repository must not be empty.",
				"error",
				2000
			);
		}

		try {
			await Data.createNew(repoName, isPrivate, authData);

			sendMessage(repoName);

			return notify.show(
				"Repository created! You may now close this tab.",
				"success",
				2000
			);
		} catch (error) {
			return notify.show(
				`Error creating repository: ${String(error.message)}`,
				"error",
				2000
			);
		}
	};

	const sendMessage = (name: string): void => {
		const urls = {
			github: `https://${authData.user}:${authData.token}@github.com/${authData.user}/${name}`,
			gitlab: `https://oauth2:${authData.token}@gitlab.com/${authData.user}/${name}`,
			bitbucket: `https://x-token-auth:${authData.token}@bitbucket.org/${authData.user}/${name}`
		};

		vscode.postMessage(urls[authData.provider]);
	};

	const saveExisting = (name: string): void => {
		sendMessage(name);

		return notify.show(
			"Repository registered! You may now close this tab.",
			"success",
			2000
		);
	};

	const fuse = new Fuse(repos, { keys: ["name", "description"] });

	const formatRepos = (): IRepo[] => (filter ? fuse.search(filter) : repos);

	return (
		<Fragment>
			<Notifications />
			<div class={styles.grid}>
				<div>
					<h2>New Repository</h2>
					<div class={styles.gappedGrid}>
						<form class={styles.gappedGrid}>
							<input
								type="text"
								class={components.input}
								value={repoName}
								placeholder="Enter New Repository Name"
								onChange={event => setRepoName(event.currentTarget.value)}
							/>
							<label class={components.checkbox}>
								Private
								<input
									type="checkbox"
									checked={isPrivate}
									onChange={event => setIsPrivate(event.currentTarget.checked)}
								/>
								<span />
							</label>
						</form>
						<button type="button" class={components.button} onClick={createNew}>
							Create
						</button>
					</div>
				</div>
				<div>
					<h2>Existing Repository</h2>
					{repos.length === 0 ? (
						<button type="button" class={components.button} onClick={getRepos}>
							Load Repositories
						</button>
					) : (
						<div class={compose(styles.gappedGrid, `margin-bottom: 1rem;`)}>
							<input
								class={components.input}
								type="text"
								placeholder="Search Repositories"
								onChange={event => setFilter(event.currentTarget.value)}
							/>
							{formatRepos().map(repo => (
								<div key={repo.name} class={styles.listItem}>
									<h3>{repo.name}</h3>
									<p>
										{repo.description || "No description for this repository."}
									</p>
									<div
										class={compose(
											styles.gappedGrid,
											`grid-template-columns: 1fr 1fr;`
										)}
									>
										<a class={components.button} href={repo.url}>
											View
										</a>
										<button
											type="button"
											class={components.button}
											onClick={async () => saveExisting(repo.name)}
										>
											Use This
										</button>
									</div>
								</div>
							))}
							{!formatRepos().length && (
								<div class={styles.listItem}>
									<h3>No Repositories Found</h3>
									<p>There are no repositories matching your search query.</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};
