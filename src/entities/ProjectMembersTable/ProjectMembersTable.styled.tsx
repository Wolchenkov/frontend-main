import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Table = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 16px;
	margin-bottom: 12px;
`;
export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.02em;
`;
