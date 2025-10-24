import styled from 'styled-components';
import { Button, Text, TextField } from 'reshaped/bundle';

export const FilterUserButton = styled(Button)`
	transform: none !important;

	&:hover {
		background: transparent !important;
	}
`;

export const FilterUserText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	span {
		color: #898b8f;
	}
`;

export const FilterUserInput = styled(TextField)`
	border: none;

	&:focus-within {
		border-color: #cfd0d3;
		box-shadow: none;
	}
`;

export const FilterUserDropdownItemContent = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const FilterUserDropdownItemText = styled(Text)`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	padding-right: 26px;
	overflow: hidden;
`;

export const FilterUserDropdownMenuContentWrap = styled.div`
	height: auto;
	max-height: 392px;
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
