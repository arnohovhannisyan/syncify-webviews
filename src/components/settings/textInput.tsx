import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { ITextInput, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";
import * as styles from "./styles.scss";
import * as componentStyles from "~/styles/component.scss";

interface IProps {
	map: ITextInput;
	value: string;
	onChange?: (update: IUpdate) => any;
}

export const TextInputComponent = (props: IProps): h.JSX.Element => {
	const vscode = getVSCode();

	const { name, placeholder, correspondingSetting } = props.map;

	const [value, setValue] = useState(props.value);
	const [subject] = useState(new Subject<IUpdate>());

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
			<input
				type="text"
				class={componentStyles.input}
				value={value}
				id={`setting:${correspondingSetting}`}
				placeholder={placeholder}
				onChange={event => {
					const update: IUpdate = {
						setting: correspondingSetting,
						value: event.currentTarget.value
					};

					setValue(update.value);

					subject.next(update);

					props.onChange?.(update);
				}}
			/>
		</div>
	);
};
