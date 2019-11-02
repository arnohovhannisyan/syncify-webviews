import { isJSON } from "~/utilities";

export function getData(name: string) {
  const receiver = document.querySelector("data-receiver");

  if (!receiver) return;

  const attr = receiver.getAttribute(`data-${name}`);

  if (!attr) return;

  const data = decodeURIComponent(attr);

  if (isJSON(data)) return JSON.parse(data);

  return data as any;
}
