import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const Row = styled.div<{
	isExpired: boolean;
}>`
	position: relative;
	display: grid;
	grid-template-columns: minmax(0, 2fr) minmax(0, 7fr) minmax(0, 4fr) minmax(0, 4fr) minmax(0, 3fr) minmax(0, 3fr) minmax(
			0,
			3fr
		);
	gap: 16px;
	min-height: 45px;
	padding: 0 12px;
	border-bottom: 1px solid #e5e7ea;

	& > div * {
		color: ${({ isExpired }) => isExpired && '#898B8F !important'};
	}
`;

export const RowCell = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 0 8px 8px;

	&:nth-child(5),
	&:nth-child(6),
	&:nth-child(7) {
		justify-content: center;
		padding: 8px 0;
	}
`;

export const RowCellText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;
