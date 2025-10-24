import styled from 'styled-components';
import { Actionable, Text } from 'reshaped/bundle';

export const DateWrapper = styled(Actionable)`
	display: flex;
	align-items: center;
	margin-left: 28px;
`;

export const TextAll = styled(Text)`
	color: #898b8f;
	padding-left: 3px;
`;

export const ArrowDownWrapper = styled.span`
	padding-left: 6px;
	display: flex;
	align-items: center;
`;

export const DatePickerWrapper = styled.div`
	.react-datepicker {
		width: 100%;
		padding: 2px 0;
		border: none;
		display: flex;
	}

	.react-datepicker__month-container {
		width: 100%;
	}

	.react-datepicker__header {
		background: none;
		border: none;
	}

	.react-datepicker__current-month {
		color: #14171f;

		&::first-letter {
			text-transform: capitalize;
		}
	}

	.react-datepicker__day-names {
		margin: 17px 0 -8px;
	}

	.react-datepicker__day-name {
		width: 36px;
		margin: 0;
		color: #14171f;

		&::first-letter {
			text-transform: capitalize;
		}
	}

	.react-datepicker__week {
		display: flex;
		justify-content: center;
	}

	.react-datepicker__day {
		width: 36px;
		height: 36px;
		margin: 0;
		border-radius: 6px;
		color: #14171f;

		& div {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&--today {
			position: relative;
			font-weight: 500;

			&::after {
				content: '';
				position: absolute;
				bottom: 4px;
				left: calc(50% - 2px);
				width: 4px;
				height: 4px;
				border-radius: 50%;
				background: #ff6633;
			}
		}

		&--selected div {
			color: #ffffff;
			border: 2px solid #ff6633;
			background: #ff6633;
			border-radius: 6px;
		}

		&--in-range {
			background: var(--rs-color-background-neutral-faded);
			border: 0;
			border-radius: 0;
		}

		&--range-start {
			border-radius: 6px 0 0 6px;
		}

		&--range-end {
			border-radius: 0 6px 6px 0;
		}

		&--range-start div,
		&--range-end div {
			color: #ffffff;
			border: 2px solid #ff6633;
			background: #ff6633;
			border-radius: 6px;
		}

		&--in-selecting-range {
			background: var(--rs-color-background-neutral-faded);
			border-radius: 0;
		}

		&--disabled {
			color: #d2d5db;
		}

		&--outside-month {
			visibility: hidden;
		}

		&:not(.react-datepicker__day--disabled):hover div {
			color: #ff6633;
			border: 2px solid #ff6633;
			background: #ffffff;
			border-radius: 6px;
		}
	}
`;
