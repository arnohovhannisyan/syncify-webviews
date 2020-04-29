import { isJSON } from "~/utilities";

const receiver = document.querySelector<HTMLElement>("data-receiver")!;

export const getData = (name: string): any => {
	const data = decodeURIComponent(receiver.dataset[name] ?? "");

	if (!data) return;

	if (isJSON(data)) return JSON.parse(data) as unknown;

	return data;
};
