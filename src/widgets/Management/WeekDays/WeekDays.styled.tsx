import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const Title = styled(Text)`
	margin-bottom: 16px;
	letter-spacing: -0.015em;
`;

export const Description = styled(Text)`
	margin-bottom: 32px;
	line-height: 24px;
	letter-spacing: -0.02em;
`;

export const Group = styled.div`
	&:not(:last-child) {
		margin-bottom: 40px;
	}
`;

export const GroupTitle = styled(Text)`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 20px;
	letter-spacing: -0.02em;
`;
