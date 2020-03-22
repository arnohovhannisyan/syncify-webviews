import css from "csz";

export default {
	container: css`
		display: grid;

		label {
			margin-bottom: 0.5rem;
		}
	`,

	heading: css`
		margin: 0;
	`,

	grid: css`
		display: grid;
		gap: 1rem;
		margin-left: 1.5rem;
		position: relative;

		grid-template-areas:
			"f f"
			"b b";

		@media (min-width: 992px) {
			grid-template-areas:
				"f b"
				"f b";

			grid-template-columns: auto 3rem;
		}
	`,

	indexCounter: css`
		position: absolute;
		left: -1.2rem;
		color: rgb(116, 116, 116);
	`,

	icon: css`
		font-family: Icons;
	`,

	addIcon: css`
		&:before {
			content: "${"\uEA0A"}";
		}
	`,

	deleteIcon: css`
		&:before {
			content: "${"\uEA0F"}";
		}
	`,

	fields: css`
		display: grid;
		gap: 1rem;
		grid-area: f;
	`,

	items: css`
		display: grid;
		gap: 1rem;
	`
};
