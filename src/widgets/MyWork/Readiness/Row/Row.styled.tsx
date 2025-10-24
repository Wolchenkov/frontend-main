import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const Row = styled.div<{
	isHovered: boolean;
	isExpired: boolean;
}>`
	position: relative;
	display: grid;
	grid-template-columns: minmax(0, 2fr) minmax(0, 10fr) minmax(0, 4fr) minmax(0, 5fr) minmax(0, 4fr);
	gap: 16px;
	padding: 0 64px 0 12px;
	border-bottom: 1px solid #e5e7ea;
	background-color: ${({ isHovered }) => isHovered && '#F8F8F8'};

	& > div * {
		color: ${({ isExpired }) => isExpired && '#898B8F !important'};
	}
`;

export const RowCell = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 8px;
	text-align: center;

	&:nth-child(3),
	&:nth-child(4),
	&:nth-child(5) {
		justify-content: center;
	}
`;

export const RowCellText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	&:nth-child(3),
	&:nth-child(4),
	&:nth-child(5) {
		text-align: center;
	}
`;

export const RowButton = styled(Button)<{ isVisible?: boolean }>`
	position: absolute;
	top: 50%;
	transform: translateY(-50%) !important;
	right: 20px;
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};

	&:hover {
		background: transparent !important;
	}
`;
