import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const ProjectFilterButton = styled(Button)<{ active: boolean }>`
	background: ${({ active }) => active && '#FDEDE7'};

	&:hover {
		background: ${({ active }) => active && '#FDEDE7 !important'};
	}
`;
