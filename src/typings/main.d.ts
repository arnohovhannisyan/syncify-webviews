declare const acquireVsCodeApi: () => {
	postMessage: (message: any) => void;
};

declare module "csz" {
	const fn: (strings: TemplateStringsArray, ...values: string[]) => string;

	export default fn;
}

declare module "~/fonts/*" {
	const exported: string;

	export default exported;
}
