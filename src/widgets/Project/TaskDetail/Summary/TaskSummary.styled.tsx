import { Avatar, Button, Text, TextField } from 'reshaped/bundle';
import styled from 'styled-components';

export const Row = styled.div<{ isAvatar: boolean }>`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	height: ${({ isAvatar }) => (isAvatar ? '24px' : '20px')};
`;

export const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const Right = styled.div`
	position: absolute;
	left: 136px;
	right: 0;
`;
export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
export const PriorityBadge = styled.div<{ color: string; size: number }>`
	width: ${({ size }) => `calc(${size} * 4px)`};
	height: ${({ size }) => `calc(${size} * 4px)`};
	background-color: ${(props) => props.color};
	border-radius: 50%;
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

export const PillDropdownItemText = styled(Text)`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	padding-right: 26px;
	overflow: hidden;
`;
export const PillDropdownItemContent = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

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

export const TriggerButton = styled(Button)`
	max-width: 100%;
	justify-content: start !important;
	padding: 0 !important;

	span {
		width: 100%;
	}

	div {
		width: 100%;
		padding: 0 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const HideContainer = styled.div`
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 20px;
	right: 86px;
`;
