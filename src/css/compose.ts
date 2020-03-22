import css from "csz";

type Style = string | undefined | null | false;

export default function compose(...styles: Style[]): string {
	return styles
		.map(style => {
			if (!style) return null;

			if (style.startsWith("csz-")) return style;

			return css`
				${style}
			`;
		})
		.filter(Boolean)
		.join(" ");
}
