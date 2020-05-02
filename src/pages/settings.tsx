import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { SectionComponent } from "~/components";
import { Section } from "~/models";
import { getVSCode, runningOnVSCode } from "~/utilities";
import css from "csz";
import { defaultSettings, defaultSections } from "~/defaults";

const styles = {
	openFile: css`
		margin-bottom: 1rem;
	`,

	grid: css`
		display: grid;
		gap: 1rem;
	`,
};

export const SettingsPage = ({ data }: { data: any }): h.JSX.Element => {
	const [{ sections, settings }] = useState<{
		sections: Section[];
		settings: any;
	}>(
		runningOnVSCode()
			? data
			: {
					settings: defaultSettings,
					sections: defaultSections,
			  },
	);

	const vscode = getVSCode();

	return (
		<Fragment>
			<div class={styles.openFile}>
				<a href="#" onClick={() => vscode.postMessage("edit")}>
					Open file in editor
				</a>
			</div>
			<div class={styles.grid}>
				{sections.map((section) => (
					<SectionComponent
						key={section.name}
						name={section.name}
						map={section.settings}
						settings={settings}
					/>
				))}
			</div>
		</Fragment>
	);
};
