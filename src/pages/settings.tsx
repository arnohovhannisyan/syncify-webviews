import { Fragment, h } from "preact";
import { SectionComponent } from "~/components";
import { ISection } from "~/models";
import { getVSCode } from "~/utilities";
import css from "csz";

interface IProps {
	settings: any;
	sections: ISection[];
}

const styles = {
	openFile: css`
		margin-bottom: 1rem;
	`,

	grid: css`
		display: grid;
		gap: 1rem;
	`
};

export const SettingsPage = (props: IProps): h.JSX.Element => {
	const { sections, settings } = props;

	const vscode = getVSCode();

	return (
		<Fragment>
			<div class={styles.openFile}>
				<a href="#" onClick={() => vscode.postMessage("edit")}>
					Open file in editor
				</a>
			</div>
			<div class={styles.grid}>
				{sections.map(section => (
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
