import { isJSON } from "~/utilities";

export function getData(name: string): any {
  const data = decodeURIComponent(
    document.querySelector("data-receiver")?.getAttribute(`data-${name}`) ?? ""
  );

  if (!data) return;

  if (isJSON(data)) return JSON.parse(data);

  return data;
}
