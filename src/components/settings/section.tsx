import { h, Fragment } from "preact";
import { SettingMap } from "~/models";
import { getSettingComponent } from "~/utilities";
import styles from "./styles";

type Props = {
	name: string;
	map: SettingMap[];
	settings: any;
};

export const SectionComponent = (props: Props): h.JSX.Element => (
	<Fragment>
		<h2 class={styles.heading}>{props.name}</h2>
		{props.map.map((setting) => getSettingComponent(props.settings, setting))}
	</Fragment>
);
