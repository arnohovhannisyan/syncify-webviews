import css from "csz";

const components = {
	button: css`
		font-family: Inter;
		box-shadow: 0 0.1875rem 0.1875rem 0 rgba(0, 0, 0, 0.1) !important;
		padding: 1.4rem 1rem;
		text-transform: uppercase;
		letter-spacing: 0.15rem;
		border: 0;
		width: 100%;
		font-weight: 600;
		color: var(--btn-text) !important;
		border-radius: 0.3rem;
		cursor: pointer;
		font-size: 1rem;
		background-color: var(--btn-primary);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

		&:hover,
		&:active {
			background-color: var(--btn-hover);
		}
	`,

	input: css`
		width: 100%;
		font-size: 1.2rem;
		font-family: inherit;
		line-height: 1.5;
		color: var(--input-text);
		background-color: var(--input-bg);
		border-radius: 0.3rem;
		box-shadow: 0 0.1875rem 0.1875rem 0 rgba(0, 0, 0, 0.1);
		padding: 1.25rem 2rem;
		height: auto;
		border: 0;
		outline: none;
		resize: none;
	`,

	checkbox: css`
		display: flex;
		align-items: center;
		position: relative;
		padding-left: 2rem;
		height: 1.5rem;
		cursor: pointer;

		input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			height: 0;
			width: 0;
		}

		span {
			position: absolute;
			top: 0;
			left: 0;
			height: 1.5rem;
			width: 1.5rem;
			background-color: var(--checkbox-bg-unchecked);
			border-radius: 5px;
			display: flex;
			align-items: center;
			justify-content: center;

			&::after {
				content: "";
				display: none;
				width: 5px;
				height: 10px;
				border: solid white;
				border-width: 0 3px 3px 0;
				transform: translateY(-1px) rotate(45deg);
			}
		}

		input:checked ~ span {
			background-color: var(--checkbox-bg-checked);

			&::after {
				display: block;
			}
		}
	`,
};

export default components;
