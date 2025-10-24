import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const ChildRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding-left: 2px;
`;

export const ChildRowText = styled(Text)`
	max-width: 400px;
	padding: 12px 0;
	font-weight: 500;
	letter-spacing: -0.01em;
	cursor: pointer;
`;
