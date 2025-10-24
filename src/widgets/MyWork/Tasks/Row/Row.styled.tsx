import styled from 'styled-components';
import { Icon, Text } from 'reshaped/bundle';

export const TableRow = styled.div<{
	isHovered: boolean;
}>`
	display: grid;
	grid-template-columns: 1fr 80px 80px;
	align-items: center;
	gap: 16px;
	padding: 0 20px 0 22px;
	border-bottom: 1px solid #e5e7ea;
	background-color: ${({ isHovered }) => isHovered && '#F8F8F8'};
`;

export const TableRowCell = styled(Text)`
	padding: 12px 8px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&:nth-child(1) {
		position: relative;
		padding-left: 26px;
	}

	&:nth-child(2),
	&:nth-child(3) {
		text-align: center;
	}
`;

export const TableRowFinishIcon = styled(Icon)`
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
`;
