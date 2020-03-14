import Fuse from "fuse.js";
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { IAuthData, IRepo } from "~/models";
import { Data } from "~/pages/repo/data";
import { getVSCode } from "~/utilities";
import * as styles from "./styles.scss";
import * as componentStyles from "~/styles/component.scss";
import classnames from "classnames";
import Notifications, { notify } from "react-notify-toast";

interface IProps {
	authData: IAuthData;
}

export const RepoPage = (props: IProps) => {
	const { authData } = props;

	const [repos, setRepos] = useState<IRepo[]>([]);
	const [filter, setFilter] = useState("");

	const [repoName, setRepoName] = useState("");
	const [isPrivate, setIsPrivate] = useState(true);

	const vscode = getVSCode();

	const getRepos = async () => {
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

	const createNew = async () => {
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

	const sendMessage = (name: string) => {
		const urls = {
			github: `https://${authData.user}:${authData.token}@github.com/${authData.user}/${name}`,
			gitlab: `https://oauth2:${authData.token}@gitlab.com/${authData.user}/${name}`,
			bitbucket: `https://x-token-auth:${authData.token}@bitbucket.org/${authData.user}/${name}`
		};

		vscode.postMessage(urls[authData.provider]);
	};

	const useExisting = (name: string) => {
		sendMessage(name);

		return notify.show(
			"Repository registered! You may now close this tab.",
			"success",
			2000
		);
	};

	const fuse = new Fuse(repos, { keys: ["name", "description"] });

	const formatRepos = () => (filter ? fuse.search(filter) : repos);

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
								class={classnames(
									componentStyles.input,
									!repoName && styles.isInvalid
								)}
								value={repoName}
								placeholder="Enter New Repository Name"
								onChange={event => setRepoName(event.currentTarget.value)}
							/>
							<label class={componentStyles.checkbox}>
								Private
								<input
									type="checkbox"
									checked={isPrivate}
									onChange={event => setIsPrivate(event.currentTarget.checked)}
								/>
								<span class={componentStyles.checkmark} />
							</label>
						</form>
						<button class={componentStyles.button} onClick={createNew}>
							Create
						</button>
					</div>
				</div>
				<div>
					<h2>Existing Repository</h2>
					{!!repos.length && (
						<Fragment>
							<div class={styles.listGrid}>
								<input
									class={componentStyles.input}
									type="text"
									placeholder="Search Repositories"
									onChange={event => setFilter(event.currentTarget.value)}
								/>
								{formatRepos().map(repo => (
									<div class={styles.listItem} key={repo.name}>
										<h3>{repo.name}</h3>
										<p>
											{repo.description ||
												"No description for this repository."}
										</p>
										<div class={styles.listButtons}>
											<button
												class={componentStyles.button}
												onClick={() => open(repo.url)}
											>
												View
											</button>
											<button
												onClick={async () => useExisting(repo.name)}
												class={componentStyles.button}
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
						</Fragment>
					)}
					{!repos.length && (
						<button class={componentStyles.button} onClick={getRepos}>
							Load Repositories
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};
