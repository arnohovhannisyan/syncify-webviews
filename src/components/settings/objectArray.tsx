import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { IObjectArray, IUpdate } from "~/models";
import { getSettingComponent, getVSCode } from "~/utilities";
import * as styles from "./styles.scss";

interface IProps {
	map: IObjectArray;
	value: object[];
}

export const ObjectArrayComponent = (props: IProps) => {
	const vscode = getVSCode();

	const { name, schema, newTemplate, correspondingSetting } = props.map;

	const [value, setValue] = useState(props.value);
	const [subject] = useState(new Subject<IUpdate>());

	useEffect(() => {
		const subscription = subject
			.pipe(debounceTime(1000))
			.subscribe(update => vscode.postMessage(update));

		return () => subscription.unsubscribe();
	}, []);

	return (
		<div class={styles.container}>
			<label for={`setting:${correspondingSetting}`}>{name}</label>
			<div class={styles.items}>
				{value.map((object, index) => {
					const rootPath = `${correspondingSetting}[${index}]`;
					const settings = set({}, rootPath, object);

					return (
						<Fragment key={index}>
							<div class={styles.grid}>
								<div class={styles.indexCounter}>{index}</div>
								<div class={styles.fields}>
									{Object.keys(object).map(key => (
										<div key={key}>
											{getSettingComponent(
												settings,
												{
													...schema.find(s => s.correspondingSetting === key)!,
													correspondingSetting: `${rootPath}.${key}`
												},
												update => {
													const path = update.setting.slice(
														rootPath.length + 1
													);

													setValue(state =>
														set([...state], `[${index}].${path}`, update.value)
													);
												}
											)}
										</div>
									))}
								</div>
								<button
									class={styles.deleteButton}
									onClick={() => {
										setValue(state => {
											const filteredList = state.filter(v => v !== object);

											subject.next({
												setting: correspondingSetting,
												value: filteredList
											});

											return filteredList;
										});
									}}
								>
									<span class={styles.deleteIcon} />
								</button>
							</div>
						</Fragment>
					);
				})}
				<button
					class={styles.addButton}
					onClick={() =>
						setValue(state => {
							const newList = [...state, cloneDeep(newTemplate)];

							subject.next({
								setting: correspondingSetting,
								value: newList
							});

							return newList;
						})
					}
				>
					<span class={styles.addIcon} />
				</button>
			</div>
		</div>
	);
};
