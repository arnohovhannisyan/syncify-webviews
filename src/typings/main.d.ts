declare const acquireVsCodeApi: any;

declare module "csz" {
	const fn: (strings: TemplateStringsArray, ...values: string[]) => string;

	export default fn;
}

declare module "~/fonts/*" {
	const exported: string;

	export default exported;
}
