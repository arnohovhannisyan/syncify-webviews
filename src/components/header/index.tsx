import { h } from "preact";
import * as styles from "./styles.scss";

export const HeaderComponent = () => (
	<div class={styles.container}>
		<h1 class={styles.title}>Syncify</h1>
		<h2 class={styles.subtitle}>
			A reliable way of syncing your VSCode settings and extensions
		</h2>
		<h2 class={styles.subtitle}>
			by <a href="https://github.com/arnohovhannisyan">@arnohovhannisyan</a>
		</h2>
	</div>
);
