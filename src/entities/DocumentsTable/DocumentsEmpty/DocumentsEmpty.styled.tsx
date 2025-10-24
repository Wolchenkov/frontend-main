import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const DocumentsEmpty = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 125px;

	& span {
		aspect-ratio: unset;
		height: unset;
	}
`;

export const DocumentsEmptyTitle = styled(Text)`
	margin: 20px 0 4px;
	font-weight: 600;
	letter-spacing: -0.02em;
`;

export const DocumentsEmptyText = styled(Text)`
	width: 300px;
	max-width: 100%;
	text-align: center;
	margin-bottom: 24px;
	letter-spacing: -0.02em;
`;
