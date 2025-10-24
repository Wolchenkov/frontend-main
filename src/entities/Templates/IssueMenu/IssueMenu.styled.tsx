import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const MenuButton = styled(Button)<{ isRowHovered: boolean }>`
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-50%) !important;
	display: ${({ isRowHovered }) => (isRowHovered ? 'inline-flex' : 'none')};

	&:hover {
		background: transparent !important;
	}
`;
