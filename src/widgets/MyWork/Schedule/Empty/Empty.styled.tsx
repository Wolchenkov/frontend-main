import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const TableHead = styled.div`
	display: grid;
	grid-template-columns: repeat(8, 64px);
	justify-content: end;
	padding-right: 20px;
	border-bottom: 1px solid #e5e7ea;
`;

export const TableHeadText = styled(Text)<{ isWeekend?: boolean }>`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
	color: ${({ isWeekend }) => isWeekend === true && '#D2D5DB'};
	color: ${({ isWeekend }) => isWeekend === false && '#898B8F'};
	text-align: center;
`;

export const TableRowTotal = styled.div`
	display: grid;
	grid-template-columns: 1fr repeat(8, 64px);
	padding: 0 20px 0 56px;
	border-bottom: 1px solid #e5e7ea;
`;

export const TableRowTotalCell = styled.div<{ isWeekend?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px 0;
	background: repeating-linear-gradient(
		-45deg,
		rgba(0, 0, 0, 0),
		rgba(0, 0, 0, 0) 5px,
		rgb(215, 215, 218) 5px,
		rgb(215, 215, 218) 5.7px
	);
	background: ${({ isWeekend }) => !isWeekend && 'none'};

	&:nth-child(1) {
		justify-content: flex-start;
	}
`;

export const TableRowTotalText = styled(Text)`
	font-size: 12px;
	letter-spacing: -0.01em;
`;
