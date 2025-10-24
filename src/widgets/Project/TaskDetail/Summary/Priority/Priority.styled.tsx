import { Badge, Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const TriggerBadge = styled(Badge)<{ isNeutral: boolean; active: boolean }>`
	background: ${({ isNeutral, active }) =>
		isNeutral && active ? 'rgba(var(--rs-color-rgb-background-neutral),.5) !important' : undefined};
	&:hover {
		background: ${({ isNeutral }) =>
			isNeutral ? 'rgba(var(--rs-color-rgb-background-neutral),.5)' : undefined} !important;
	}
`;
export const MyText = styled(Text)`
	font-weight: 500 !important;
	letter-spacing: -0.01em;
	line-height: 20px;
`;
export const PriorityBadge = styled.div<{ color: string; size: number }>`
	width: ${({ size }) => `calc(${size} * 4px)`};
	height: ${({ size }) => `calc(${size} * 4px)`};
	background-color: ${(props) => props.color};
	border-radius: 50%;
`;
