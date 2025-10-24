import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const MyText = styled(Text)<{ margin: number }>`
	margin-bottom: ${(props) => props.margin}px;
	font-weight: 700;
	letter-spacing: -0.015em;
`;
