import { h } from "preact";
import { getVSCode } from "~/utilities";
import * as styles from "./styles.scss";
import * as componentStyles from "~/styles/component.scss";

export const LandingPage = (): h.JSX.Element => {
	const vscode = getVSCode();

	return (
		<div class={styles.mainGrid}>
			<div>
				<h2>Getting Started</h2>
				<div class={styles.subGrid}>
					<button
						type="button"
						class={styles.githubButton}
						onClick={() => vscode.postMessage("github")}
					>
						<span class={styles.githubIcon} />
						&nbsp;Login with GitHub
					</button>
					<button
						type="button"
						class={styles.gitlabButton}
						onClick={() => vscode.postMessage("gitlab")}
					>
						<span class={styles.gitlabIcon} />
						&nbsp;Login with GitLab
					</button>
					<button
						type="button"
						class={styles.bitbucketButton}
						onClick={() => vscode.postMessage("bitbucket")}
					>
						<span class={styles.bitbucketIcon} />
						&nbsp;Login with BitBucket
					</button>
					<button
						type="button"
						class={componentStyles.button}
						onClick={() => vscode.postMessage("nologin")}
					>
						<span class={styles.downloadIcon} />
						&nbsp;Download Without Login
					</button>
					<button
						type="button"
						class={componentStyles.button}
						onClick={() => vscode.postMessage("settings")}
					>
						<span class={styles.settingsIcon} />
						&nbsp;Open Settings
					</button>
				</div>
			</div>
			<div>
				<h2>Need Help?</h2>
				<div class={styles.subGrid}>
					<a
						class={componentStyles.button}
						href="https://arnohovhannisyan.space/vscode-syncify/docs/getting-started/prerequisites"
					>
						Getting Started Guide
					</a>
					<a
						class={componentStyles.button}
						href="https://github.com/arnohovhannisyan/vscode-syncify/issues/new/choose"
					>
						Create an Issue
					</a>
					<a
						class={componentStyles.button}
						href="https://spectrum.chat/vscode-syncify"
					>
						Join the Spectrum Community
					</a>
					<a class={componentStyles.button} href="https://discord.gg/DwFKj57">
						Join the Discord Server
					</a>
				</div>
			</div>
		</div>
	);
};
