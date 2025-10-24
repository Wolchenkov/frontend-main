import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const MenuButton = styled(Button)<{ isVisible?: boolean }>`
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	min-height: 18px;
	height: 18px;

	&:hover {
		background: transparent !important;
	}
`;
