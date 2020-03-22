import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { INumberInput, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";
import styles from "./styles";
import components from "~/css/components";

interface IProps {
	map: INumberInput;
	value: number;
	onChange?: (update: IUpdate) => any;
}

export const NumberInputComponent = (props: IProps): h.JSX.Element => {
	const vscode = getVSCode();

	const { name, placeholder, correspondingSetting, min, max } = props.map;

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
			<input
				type="number"
				value={value.toString()}
				class={components.input}
				id={`setting:${correspondingSetting}`}
				placeholder={placeholder}
				min={min}
				max={max}
				onChange={event => {
					const update: IUpdate = {
						setting: correspondingSetting,
						value: Number(event.currentTarget.value)
					};

					setValue(update.value);

					subject.next(update);

					props.onChange?.(update);
				}}
			/>
		</div>
	);
};
