import { h } from "preact";
import css from "csz";

const styles = {
	container: css`
		text-align: center;
		margin-bottom: 1.5rem;
	`,

	title: css`
		margin-bottom: 1.5rem;
		font-size: 3.5rem;
		line-height: 2.5rem;
		font-weight: 600;
	`,

	subtitle: css`
		font-weight: 600;
	`,
};

export const HeaderComponent = (): h.JSX.Element => (
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
