import { h } from "preact";
import { getVSCode } from "~/utilities";
import * as styles from "./styles.scss";
import * as componentStyles from "~/styles/component.scss";

export const LandingPage = () => {
	const vscode = getVSCode();

	return (
		<div class={styles.mainGrid}>
			<div>
				<h2>Getting Started</h2>
				<div class={styles.subGrid}>
					<button
						onClick={() => vscode.postMessage("github")}
						class={styles.githubButton}
					>
						<span class={styles.githubIcon} /> Login with GitHub
					</button>
					<button
						class={styles.gitlabButton}
						onClick={() => vscode.postMessage("gitlab")}
					>
						<span class={styles.gitlabIcon} /> Login with GitLab
					</button>
					<button
						onClick={() => vscode.postMessage("bitbucket")}
						class={styles.bitbucketButton}
					>
						<span class={styles.bitbucketIcon} /> Login with BitBucket
					</button>
					<button
						class={componentStyles.button}
						onClick={() => vscode.postMessage("nologin")}
					>
						<span class={styles.downloadIcon} /> Download Without Login
					</button>
					<button
						class={componentStyles.button}
						onClick={() => vscode.postMessage("settings")}
					>
						<span class={styles.settingsIcon} /> Open Settings
					</button>
				</div>
			</div>
			<div>
				<h2>Need Help?</h2>
				<div class={styles.subGrid}>
					<button
						class={componentStyles.button}
						href="https://github.com/arnohovhannisyan/vscode-syncify/wiki/Quick-Start"
					>
						Quick Start Guide
					</button>
					<button
						class={componentStyles.button}
						href="https://github.com/arnohovhannisyan/vscode-syncify/issues/new/choose"
					>
						Create an Issue
					</button>
					<button
						class={componentStyles.button}
						href="https://join.slack.com/t/vscode-syncify/shared_invite/enQtNzc5MjYyMjYyNzEwLWQ5MGMxNDljZjk5NmYwNWZlYTBmYjk0MjliNjgyYWRkM2NiYjU2YjExY2RmODg2MGIyZTUwY2YzYWM2YThjMmM"
					>
						Join the Slack Workspace
					</button>
					<button
						class={componentStyles.button}
						href="https://discord.gg/DwFKj57"
					>
						Join the Discord Server
					</button>
				</div>
			</div>
		</div>
	);
};
