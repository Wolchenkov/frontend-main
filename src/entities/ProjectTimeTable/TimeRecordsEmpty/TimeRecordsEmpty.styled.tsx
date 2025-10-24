import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const TimeRecordsEmpty = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	position: absolute;
	top: 125px;
	left: 0;
`;

export const TimeRecordsEmptyTitle = styled(Text)`
	margin: 20px 0 4px;
	font-weight: 600;
	letter-spacing: -0.02em;
`;

export const TimeRecordsEmptyText = styled(Text)`
	width: 300px;
	max-width: 100%;
	text-align: center;
	margin-bottom: 20px;
	letter-spacing: -0.02em;
`;
