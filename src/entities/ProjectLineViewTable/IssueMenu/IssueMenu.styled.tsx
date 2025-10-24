import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const MenuButton = styled(Button)<{ isFinishedIssue?: boolean; isRowHovered: boolean }>`
	display: ${({ isRowHovered, isFinishedIssue }) => (isRowHovered && !isFinishedIssue ? 'inline-flex' : 'none')};

	&:hover {
		background: transparent !important;
	}
`;

export const PriorityBadge = styled.div<{ color: string; size: number }>`
	width: ${({ size }) => `calc(${size} * 4px)`};
	height: ${({ size }) => `calc(${size} * 4px)`};
	background-color: ${(props) => props.color};
	border-radius: 50%;
`;
