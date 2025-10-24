import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const Empty = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 124px;
`;

export const EmptyTitle = styled(Text)`
	margin: 20px 0 4px;
	font-weight: 600;
	letter-spacing: -0.02em;
`;

export const EmptyText = styled(Text)`
	max-width: 330px;
	margin-bottom: 20px;
	text-align: center;
	letter-spacing: -0.02em;
`;
