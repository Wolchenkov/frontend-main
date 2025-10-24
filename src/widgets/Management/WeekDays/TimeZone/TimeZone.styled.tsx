import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const DropdownMenuButton = styled(Button)<{ width: string }>`
	justify-content: space-between;
	width: ${({ width }) => width};
	padding: 7px;
	color: #52555d;
	background-color: #ffffff;
	letter-spacing: -0.02em;
	transform: none !important;
`;

export const DropdownMenuContentWrap = styled.div`
	height: 235px;
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
