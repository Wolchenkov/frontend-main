import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const TriggerButton = styled(Button)`
	padding: 0 4px !important;
`;

export const PillButton = styled(Button)<{ active: boolean }>`
	background-color: ${({ active }) => active && '#E9E9EB !important'};
`;
export const MyText = styled(Text)`
	letter-spacing: -0.02em;
	font-weight: 500;
`;

export const FilterCalendarButton = styled(Button)`
	transform: none !important;

	&:hover {
		background: transparent !important;
	}
`;

export const FilterCalendarText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	span {
		color: #898b8f;
	}
`;

export const FilterCalendarDatePickerWrapper = styled.div`
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
		width: 50%;
	}

	& .react-datepicker__children-container {
		width: 100%;
	}

	& .react-datepicker__header {
		background: none;
		border: none;
	}

	& .react-datepicker__current-month {
		color: #14171f;

		&::first-letter {
			text-transform: capitalize;
		}
	}

	& .react-datepicker__day-names {
		margin: 17px 0 -8px;
	}

	& .react-datepicker__day-name {
		width: 36px;
		margin: 0;
		color: #14171f;

		&::first-letter {
			text-transform: capitalize;
		}
	}

	& .react-datepicker__week {
		display: flex;
		justify-content: center;
	}

	& .react-datepicker__day {
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
			background: none;

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

		&--keyboard-selected {
			background: none;
		}

		&--in-range,
		&--in-selecting-range {
			background: #f4f5f7;
			border-radius: 0;
		}

		&--range-start,
		&--selecting-range-start,
		&--range-end,
		&--selecting-range-end {
			color: #ffffff;
			border: 2px solid #ff6633;
			border-radius: 6px;
			background: #ff6633;
		}

		&--outside-month,
		&--disabled {
			color: #d2d5db;
			background: none;
			border: none;
		}

		&--outside-month:empty,
		&--disabled:empty {
			pointer-events: none;
		}

		&:hover {
			color: #ffffff;
			border: 2px solid #ff6633;
			border-radius: 6px;
			background: #ff6633;
		}

		&--outside-month:hover,
		&--disabled:hover {
			color: #d2d5db;
			background: none;
			border: none;
		}
	}
`;

export const FilterCalendarDropdownMenuContentWrap = styled.div`
	margin: 4px;
	background-color: white;
`;
