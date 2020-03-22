import css from "csz";
import Inter from "~/fonts/Inter.woff2";
import Icons from "~/fonts/icons.woff";
import { getData } from "~/utilities";

const pwd = getData<string>("pwd") === "@PWD" ? "." : getData<string>("pwd");

export default css`
	@font-face {
		font-family: "Inter";
		src: url("${pwd}/${Inter}");
		font-style: normal;
		font-weight: normal;
		font-display: swap;
	}

	@font-face {
		font-family: "Inter";
		src: url("${pwd}/${Inter}");
		font-style: normal;
		font-weight: 600;
		font-display: swap;
	}

	@font-face {
		font-family: Icons;
		src: url("${pwd}/${Icons}");
		font-style: normal;
		font-weight: normal;
		font-display: swap;
	}

	:global(body) {
		--text: #e9e9e9;
		--bg: #343a40;

		--link-primary: #99ded5;
		--link-hover: #6ab7ad;

		--btn-text: #e9e9e9;
		--btn-primary: #488a81;
		--btn-hover: #356d65;

		--input-text: #495057;
		--input-bg: #e9e9e9;

		--checkbox-bg-checked: #2196f3;
		--checkbox-bg-unchecked: #e9e9e9;

		--code-text: #e83e8c;
		--code-bg: #282c34;

		&.vscode-light {
			--text: #343a40;
			--bg: #fff;

			--link-primary: #346962;

			--code-bg: #e9e9e9;
		}

		margin: 0;
		background-color: var(--bg);
		color: var(--text);
	}

	:global(a) {
		color: var(--link-primary);
		text-decoration: none;

		&:focus,
		&:hover {
			color: var(--link-hover);
		}
	}

	:global(html, body) {
		font-family: Inter;
		font-size: 16px;
		letter-spacing: 0.0625em;
		height: 100%;
		width: 100%;
	}

	:global(#root) {
		padding: 2rem;

		margin-right: auto;
		margin-left: auto;

		@media (min-width: 768px) {
			max-width: 720px;
		}

		@media (min-width: 992px) {
			max-width: 960px;
		}

		@media (min-width: 1200px) {
			max-width: 1140px;
		}

		@media (min-width: 1600px) {
			max-width: 1500px;
		}
	}

	:global(h2) {
		margin-top: 0;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
`;
