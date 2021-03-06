import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { h, Fragment } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { ObjectArray, Update } from "~/models";
import { getSettingComponent, getVSCode } from "~/utilities";
import styles from "./styles";
import compose from "~/css/compose";
import components from "~/css/components";

type Props = {
	map: ObjectArray;
	value: object[];
};

export const ObjectArrayComponent = (props: Props): h.JSX.Element => {
	const vscode = getVSCode();

	const { name, schema, newTemplate, correspondingSetting } = props.map;

	const [value, setValue] = useState(props.value);
	const subject = useRef(new Subject<Update>()).current;

	useEffect(() => {
		const subscription = subject
			.pipe(debounceTime(1000))
			.subscribe((update) => {
				vscode.postMessage(update);
			});

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
						<Fragment key={object}>
							<div class={styles.grid}>
								<div class={styles.indexCounter}>{index}</div>
								<div class={styles.fields}>
									{Object.keys(object).map((key) => (
										<div key={key}>
											{getSettingComponent(
												settings,
												{
													...schema.find(
														(s) => s.correspondingSetting === key,
													)!,
													correspondingSetting: `${rootPath}.${key}`,
												},
												(update) => {
													const path = update.setting.slice(
														rootPath.length + 1,
													);

													setValue((state) =>
														set([...state], `[${index}].${path}`, update.value),
													);
												},
											)}
										</div>
									))}
								</div>
								<button
									type="button"
									class={compose(components.button, `grid-area: b;`)}
									onClick={() => {
										setValue((state) => {
											const filteredList = state.filter((v) => v !== object);

											subject.next({
												setting: correspondingSetting,
												value: filteredList,
											});

											return filteredList;
										});
									}}
								>
									<span class={compose(styles.icon, styles.deleteIcon)} />
								</button>
							</div>
						</Fragment>
					);
				})}
				<button
					type="button"
					class={components.button}
					onClick={() =>
						setValue((state) => {
							const newList = [...state, cloneDeep(newTemplate)];

							subject.next({
								setting: correspondingSetting,
								value: newList,
							});

							return newList;
						})
					}
				>
					<span class={compose(styles.icon, styles.addIcon)} />
				</button>
			</div>
		</div>
	);
};
