import { Fragment, h } from "preact";
import { SectionComponent } from "~/components";
import { ISection } from "~/models";
import { getVSCode } from "~/utilities";
import * as styles from "./styles.scss";

interface IProps {
	settings: any;
	sections: ISection[];
}

export const SettingsPage = (props: IProps) => {
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
						name={section.name}
						map={section.settings}
						settings={settings}
						key={section.name}
					/>
				))}
			</div>
		</Fragment>
	);
};
