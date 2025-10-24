import styled from 'styled-components';
import { Button, DropdownMenu, TextField, Text } from 'reshaped/bundle';

export const PillDropdownMenu = styled(DropdownMenu)`
	width: max-content;
	min-width: 272px;
	max-width: 400px;
`;

export const PillButton = styled(Button)<{ active: boolean; isRequired?: boolean }>`
	position: ${({ isRequired }) => isRequired && 'relative'};
	padding-right: ${({ isRequired }) => isRequired && '17px !important'};
	background-color: ${(props) => props.active && '#E9E9EB !important'};

	&:after {
		display: ${({ isRequired }) => !isRequired && 'none'};
		content: '*';
		position: absolute;
		top: 4px;
		right: 7px;
		color: #ff6633;
	}
`;

export const PillInput = styled(TextField)`
	border: none;

	&:focus-within {
		border-color: #cfd0d3;
		box-shadow: none;
	}
`;

export const PillDropdownItemContent = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const PillDropdownItemText = styled(Text)`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
`;

export const PillDropdownMenuContentWrap = styled.div<{ maxHeight?: string }>`
	height: 240px;
	max-height: ${(props) => (props.maxHeight ? props.maxHeight : 'none')};
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
