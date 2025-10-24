import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const FilterPriorityButton = styled(Button)`
	transform: none !important;

	&:hover {
		background: transparent !important;
	}
`;

export const FilterPriorityText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	span {
		color: #898b8f;
	}
`;

export const FilterPriorityBadge = styled.div<{ color: string }>`
	width: 12px;
	height: 12px;
	background-color: ${(props) => props.color};
	border-radius: 50%;
`;
