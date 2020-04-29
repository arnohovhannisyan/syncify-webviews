import { Provider } from "~/models";

export type AuthData = {
	token: string;
	user: string;
	provider: Provider;
};
