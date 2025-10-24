import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const Empty = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 209px;
	margin: 156px auto 0;
`;

export const EmptyTitle = styled(Text)`
	margin: 20px 0 4px;
	text-align: center;
	line-height: 20px;
	font-weight: 600;
	letter-spacing: -0.02em;
`;
