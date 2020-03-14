import { Provider } from "~/models";

export interface IAuthData {
	token: string;
	user: string;
	provider: Provider;
}
