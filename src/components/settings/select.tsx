import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { ISelect, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";
import * as styles from "./styles.scss";
import * as componentStyles from "~/styles/component.scss";

interface IProps {
	map: ISelect;
	value: string;
	onChange?: (update: IUpdate) => any;
}

export const SelectComponent = (props: IProps): h.JSX.Element => {
	const vscode = getVSCode();

	const { name, options, correspondingSetting } = props.map;

	const [value, setValue] = useState(props.value);
	const subject = useRef(new Subject<IUpdate>()).current;

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	useEffect(() => {
		const subscription = subject
			.pipe(debounceTime(1000))
			.subscribe(update => vscode.postMessage(update));

		return () => subscription.unsubscribe();
	}, []);

	return (
		<div class={styles.container}>
			<label for={`setting:${correspondingSetting}`}>{name}</label>
			<select
				class={componentStyles.input}
				id={`setting:${correspondingSetting}`}
				value={value}
				onChange={event => {
					const update: IUpdate = {
						setting: correspondingSetting,
						value: event.currentTarget.value
					};

					setValue(update.value);

					subject.next(update);

					props.onChange?.(update);
				}}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
};
