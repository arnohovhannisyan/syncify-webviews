import Markdown from "preact-markdown";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Descriptor } from "~/models";
import css from "csz";
import useSearchParam from "react-use/esm/useSearchParam";
import { runningOnVSCode } from "~/utilities";

const sheetId = `1nbbW74yPHti1SX4LSYgESKqLgMBmHUhwhS14wISwGHE`;
const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`;

const styles = {
	grid: css`
		display: grid;
		gap: 2rem;

		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	`,

	markdown: css`
		ul,
		ol,
		p {
			margin-bottom: 0.5rem;
			margin-top: 0.5rem;
		}

		ul,
		ol {
			padding-left: 1.25rem;
		}

		p,
		li {
			font-size: 1.2rem;
		}

		h2 {
			margin-top: 1rem;
		}
	`,

	code: css`
		color: var(--code-text) !important;
		padding: 1rem;
		background-color: var(--code-bg);
		border-radius: 0.5rem;
		white-space: pre-wrap;
	`,
};

const defaultDescriptor: Descriptor = {
	description: `No description found for this error`,
	matcher: /a/,
};

export const ErrorPage = ({ data }: { data: any }): h.JSX.Element => {
	const error = runningOnVSCode() ? data : useSearchParam("error") ?? "";

	const [descriptors, setDescriptors] = useState<Descriptor[]>([]);

	const getDescriptor = async (): Promise<void> => {
		const data = await fetch(url).then(async (result) => result.json());

		setDescriptors(
			[...data.feed.entry].map<Descriptor>((entry) => ({
				description: entry.gsx$description.$t,
				matcher: new RegExp(entry.gsx$matcher.$t, "gi"),
			})),
		);
	};

	useEffect((): void => {
		getDescriptor();
	}, []);

	const getDescription = (): string => {
		const desc = descriptors.find((d) => d.matcher.test(error));
		return (desc ?? defaultDescriptor).description;
	};

	return (
		<div class={styles.grid}>
			<div>
				<h2>Description</h2>
				<p class={styles.markdown}>
					{h(Markdown, { markdown: getDescription() })}
				</p>
			</div>
			<div>
				<h2>Error</h2>
				<pre class={styles.code}>
					<code>{error}</code>
				</pre>
			</div>
		</div>
	);
};
