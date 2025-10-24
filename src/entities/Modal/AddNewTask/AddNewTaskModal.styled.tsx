import { Button, Modal, Text, TextField } from 'reshaped/bundle';
import styled from 'styled-components';
import { CustomTextInput } from '../../CustomInput/CustomTextInput';

export const PillsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4px;
	flex-wrap: wrap;
`;

export const PriorityBadge = styled.div<{ color: string; size: number }>`
	width: ${({ size }) => `calc(${size} * 4px)`};
	height: ${({ size }) => `calc(${size} * 4px)`};
	background-color: ${(props) => props.color};
	border-radius: 50%;
`;
export const PillButton = styled(Button)<{ active: boolean }>`
	background-color: ${({ active }) => active && '#E9E9EB !important'};
`;

export const MyModal = styled(Modal)`
	overflow: hidden;
`;

export const MyInput = styled(CustomTextInput)`
	height: 24px;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.02em;
	margin-bottom: 64px;
`;

//estimate
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

export const MyInputEstimate = styled(TextField)<{ active: boolean }>`
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
export const TriggerButton = styled(Button)`
	transform: none !important;
	padding: 0 4px !important;
	&:hover {
		background: transparent !important;
	}
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
