import { parse as parseMarkdown } from "marked";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IDescriptor } from "~/models";
import * as styles from "./styles.scss";

const sheetId = `1nbbW74yPHti1SX4LSYgESKqLgMBmHUhwhS14wISwGHE`;
const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`;

interface IProps {
	error: string;
}

const defaultDescriptor: IDescriptor = {
	description: `No description found for this error`,
	matcher: /a/
};

export const ErrorPage = (props: IProps) => {
	const { error } = props;

	const [descriptors, setDescriptors] = useState<IDescriptor[]>([]);

	const getDescriptor = async () => {
		const data = await fetch(url).then(async result => result.json());

		setDescriptors(
			[...data.feed.entry].map<IDescriptor>(entry => ({
				description: parseMarkdown(entry.gsx$description.$t),
				matcher: new RegExp(entry.gsx$matcher.$t, "gi")
			}))
		);
	};

	useEffect(() => {
		getDescriptor();
	}, []);

	const getDescription = () => {
		const desc = descriptors.find(d => d.matcher.test(error));
		return (desc ?? defaultDescriptor).description;
	};

	return (
		<div class={styles.grid}>
			<div>
				<h2>Description</h2>
				<p
					class={styles.markdown}
					dangerouslySetInnerHTML={{
						__html: getDescription()
					}}
				/>
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
