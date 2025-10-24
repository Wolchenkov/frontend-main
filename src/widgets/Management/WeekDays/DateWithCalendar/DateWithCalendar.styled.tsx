import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const DropdownButton = styled(Button)<{ active: boolean }>`
	background-color: ${({ active }) => active && '#E9E9EB !important'};
	transform: none !important;
`;

export const DatePickerWrapper = styled.div`
	& .react-datepicker {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 2px 0;
		border: none;
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		line-height: 20px;
		font-weight: 500;
		letter-spacing: -0.01em;
	}

	& .react-datepicker__month-container {
		width: 100%;
	}

	& .react-datepicker__children-container {
		width: 100%;
		margin: 10px 0 0;
		padding: 0;
	}

	.react-datepicker__header {
		padding: 6px 0 0;
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
		margin: 12px 0 -6px;
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

		&--selected,
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
		&--disabled:not(.react-datepicker__day--selected) {
			color: #d2d5db;
		}

		&:not(.react-datepicker__day--disabled):hover {
			color: #ff6633;
			border: 2px solid #ff6633;
			background: none;
		}
	}
`;

export const DropdownMenuContentWrap = styled.div<{ maxHeight?: string }>`
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
