import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const TableRow = styled.div<{
	isHovered: boolean;
}>`
	display: grid;
	grid-template-columns: 1fr 80px 28px;
	align-items: center;
	gap: 16px;
	border-bottom: 1px solid #e5e7ea;
	background-color: ${({ isHovered }) => isHovered && '#F8F8F8'};
`;

export const TableRowCell = styled(Text)`
	padding: 12px 8px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	&:nth-child(2) {
		text-align: center;
	}
`;
