import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const TimeRecordsEmptyFilters = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	position: absolute;
	top: 125px;
	left: 0;
`;

export const TimeRecordsEmptyFiltersTitle = styled(Text)`
	margin: 20px 0 4px;
	font-weight: 600;
	letter-spacing: -0.02em;
	text-align: center;

	& span {
		display: block;
	}
`;
