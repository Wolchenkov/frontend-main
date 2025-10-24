import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const MenuButton = styled(Button)<{ rowHover: boolean }>`
	display: ${({ rowHover }) => (rowHover ? 'inline-flex' : 'none')};

	&:hover {
		background: transparent !important;
	}
`;
