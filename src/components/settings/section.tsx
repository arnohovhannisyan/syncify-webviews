import { h, Fragment } from "preact";
import { ISettingMap } from "~/models";
import { getSettingComponent } from "~/utilities";
import * as styles from "./styles.scss";

interface IProps {
	name: string;
	map: ISettingMap[];
	settings: any;
}

export const SectionComponent = (props: IProps): h.JSX.Element => (
	<Fragment>
		<h2 class={styles.heading}>{props.name}</h2>
		{props.map.map(setting => getSettingComponent(props.settings, setting))}
	</Fragment>
);
