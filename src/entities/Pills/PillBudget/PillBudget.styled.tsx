import styled from 'styled-components';
import { Button, TextField } from 'reshaped/bundle';

export const PillButton = styled(Button)<{ active: boolean }>`
	background-color: ${(props) => props.active && '#E9E9EB !important'};
`;

export const PillTabInput = styled(TextField)`
	margin-top: 8px;
	caret-color: #ff6633;

	&:focus-within {
		border-color: #cfd0d3;
		box-shadow: none;
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
