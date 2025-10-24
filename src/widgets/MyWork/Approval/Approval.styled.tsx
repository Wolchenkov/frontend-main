import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const YearTable = styled.div`
	margin-bottom: 52px;
`;

export const MonthTable = styled.div`
	&:not(:last-child) {
		margin-bottom: 40px;
	}
`;

export const TableHead = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 2fr) minmax(0, 7fr) minmax(0, 4fr) minmax(0, 4fr) minmax(0, 3fr) minmax(0, 3fr) minmax(
			0,
			3fr
		);
	gap: 16px;
	padding: 0 12px;
	border-bottom: 1px solid #e5e7ea;
`;

export const TableHeadText = styled(Text)`
	padding: 0 8px 4px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	&:nth-child(5),
	&:nth-child(6) {
		text-align: center;
	}
`;
