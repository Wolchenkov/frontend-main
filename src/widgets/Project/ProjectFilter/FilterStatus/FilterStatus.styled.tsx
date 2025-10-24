import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const FilterStatusButton = styled(Button)`
	transform: none !important;

	&:hover {
		background: transparent !important;
	}
`;

export const FilterStatusText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	span {
		color: #898b8f;
	}
`;
