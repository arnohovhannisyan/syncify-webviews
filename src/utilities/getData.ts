import { isJSON } from "~/utilities";

const receiver = document.querySelector<HTMLElement>("data-receiver")!;

export function getData<T = any>(name: string): T {
	const data = decodeURIComponent(receiver.dataset[name] ?? "");

	if (!data) return undefined!;

	if (isJSON(data)) return JSON.parse(data);

	return data as any;
}
