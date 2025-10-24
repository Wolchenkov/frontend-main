import { Button, Text, TextField } from 'reshaped/bundle';
import styled from 'styled-components';

export const PillDropdownMenuContentWrap = styled.div`
	max-height: 236px;
	overflow-y: auto;

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
export const MyInput = styled(TextField)<{ active: boolean }>`
	width: 200px;
	& input {
		color: #52555d;
		cursor: pointer;
		letter-spacing: -0.02em;
	}
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
export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
export const TriggerButton = styled(Button)<{ isDisabled?: boolean }>`
	padding: 0 4px !important;
	background-color: ${({ isDisabled }) => isDisabled && 'transparent !important'};
	cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
`;

export const MyInputTime = styled(TextField)`
	width: 80px;
	height: 20px;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	caret-color: #ff6633;
`;
