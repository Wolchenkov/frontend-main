import styled from 'styled-components';
import { TextField } from 'reshaped/bundle';

export const MyInput = styled(TextField)<{ active: boolean }>`
	width: 89px;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	border: none !important;
	caret-color: transparent;
	${({ active }) =>
		active
			? `
    outline: 2px solid #F63 !important;
  `
			: `
    outline: 1px solid #CFD0D3 !important;
    outline-offset: -1px;
    &:focus-within {
      box-shadow: none !important;
    }
  `}
`;

export const PillDatePickerWrapper = styled.div`
	.react-datepicker {
		width: 100%;
		padding: 2px 0;
		border: none;
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
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36px;
		height: 36px;
		margin: 0;
		border: 2px solid transparent;
		border-radius: 6px;
		color: #14171f;

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

		&--keyboard-selected[aria-selected='false'],
		&--selected[aria-selected='false'] {
			background: none;
		}

		&--keyboard-selected[aria-selected='true']:not(.react-datepicker__day--disabled),
		&--selected[aria-selected='true']:not(.react-datepicker__day--disabled) {
			color: #ffffff;
			border: 2px solid #ff6633;
			background: #ff6633;

			&:hover {
				color: #ffffff;
				border: 2px solid #ff6633;
				background: #ff6633;
			}
		}

		&--outside-month,
		&--disabled {
			color: #d2d5db;
		}

		&:not(.react-datepicker__day--disabled):hover {
			color: #ff6633;
			border: 2px solid #ff6633;
			background: none;
		}
	}
`;

export const PillDropdownMenuContentWrap = styled.div<{ maxHeight?: string }>`
	height: 392px;
	height: auto;
	max-height: ${(props) => (props.maxHeight ? props.maxHeight : 'none')};
	margin: 4px;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: white;

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(207, 208, 211, 0.5);
	}
`;
