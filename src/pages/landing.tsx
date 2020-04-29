import { h } from "preact";
import { getVSCode } from "~/utilities";
import css from "csz";
import components from "~/css/components";
import compose from "~/css/compose";

const styles = {
	mainGrid: css`
		display: grid;
		gap: 2rem;

		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	`,

	subGrid: css`
		display: grid;
		gap: 1rem;

		grid-template-columns: 1fr;
	`,

	icon: css`
		font-family: Icons;
	`,

	githubIcon: css`
		&::before {
			content: "${"\uE901"}";
		}
	`,

	gitlabIcon: css`
		&::before {
			content: "${"\uE902"}";
		}
	`,

	bitbucketIcon: css`
		&::before {
			content: "${"\uE900"}";
		}
	`,

	settingsIcon: css`
		&::before {
			content: "${"\uE994"}";
		}
	`,

	downloadIcon: css`
		&::before {
			content: "${"\uEA3E"}";
		}
	`,

	githubButton: css`
		&,
		&:focus {
			background-color: #4f5a58 !important;
		}

		&:hover,
		&:active {
			background-color: #3f4746 !important;
		}
	`,

	gitlabButton: css`
		&,
		&:focus {
			background-color: #dd8929 !important;
		}

		&:hover,
		&:active {
			background-color: #a36a29 !important;
		}
	`,

	bitbucketButton: css`
		&,
		&:focus {
			background-color: #1f9bcc !important;
		}

		&:hover,
		&:active {
			background-color: #327e9c !important;
		}
	`,
};

export const LandingPage = (): h.JSX.Element => {
	const vscode = getVSCode();

	return (
		<div class={styles.mainGrid}>
			<div>
				<h2>Getting Started</h2>
				<div class={styles.subGrid}>
					<button
						type="button"
						class={compose(components.button, styles.githubButton)}
						onClick={() => vscode.postMessage("github")}
					>
						<span class={compose(styles.icon, styles.githubIcon)} />
						&nbsp;Login with GitHub
					</button>
					<button
						type="button"
						class={compose(components.button, styles.gitlabButton)}
						onClick={() => vscode.postMessage("gitlab")}
					>
						<span class={compose(styles.icon, styles.gitlabIcon)} />
						&nbsp;Login with GitLab
					</button>
					<button
						type="button"
						class={compose(components.button, styles.bitbucketButton)}
						onClick={() => vscode.postMessage("bitbucket")}
					>
						<span class={compose(styles.icon, styles.bitbucketIcon)} />
						&nbsp;Login with BitBucket
					</button>
					<button
						type="button"
						class={components.button}
						onClick={() => vscode.postMessage("nologin")}
					>
						<span class={compose(styles.icon, styles.downloadIcon)} />
						&nbsp;Download Without Login
					</button>
					<button
						type="button"
						class={components.button}
						onClick={() => vscode.postMessage("settings")}
					>
						<span class={compose(styles.icon, styles.settingsIcon)} />
						&nbsp;Open Settings
					</button>
				</div>
			</div>
			<div>
				<h2>Need Help?</h2>
				<div class={styles.subGrid}>
					<a
						class={components.button}
						href="https://arnohovhannisyan.space/vscode-syncify/docs/getting-started/prerequisites"
					>
						Getting Started Guide
					</a>
					<a
						class={components.button}
						href="https://github.com/arnohovhannisyan/vscode-syncify/issues/new/choose"
					>
						Create an Issue
					</a>
					<a
						class={components.button}
						href="https://spectrum.chat/vscode-syncify"
					>
						Join the Spectrum Community
					</a>
					<a class={components.button} href="https://discord.gg/DwFKj57">
						Join the Discord Server
					</a>
				</div>
			</div>
		</div>
	);
};
