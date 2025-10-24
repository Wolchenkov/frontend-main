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

export const Switchers = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
