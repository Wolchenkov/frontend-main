import { Avatar, Text, TextField } from 'reshaped/bundle';
import styled from 'styled-components';

export const PillIconsWrap = styled.div`
	display: flex;
	div:not(:first-child) {
		margin-left: -6px;
	}
`;
export const MyAvatar = styled(Avatar)`
	background-color: white !important;
	& div {
		font-size: 10px;
	}
`;
export const PillDropdownMenuContentWrap = styled.div<{ maxHeight?: string }>`
	height: 392px;
	height: auto;
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

export const PillInput = styled(TextField)`
	margin-bottom: 4px;
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
	padding-right: 26px;
	overflow: hidden;
`;
