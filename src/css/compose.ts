import css from "csz";

type Style = string | undefined | false;

const compose = (...styles: Style[]): string => {
	return styles
		.map((style) => {
			if (!style) return undefined;

			if (style.startsWith("csz-")) return style;

			return css`
				${style}
			`;
		})
		.filter(Boolean)
		.join(" ");
};

export default compose;
