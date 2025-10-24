import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const Table = styled.div`
	margin-bottom: 52px;
`;

export const TableHead = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 2fr) minmax(0, 10fr) minmax(0, 4fr) minmax(0, 5fr) minmax(0, 4fr);
	gap: 16px;
	padding: 0 64px 0 12px;
	border-bottom: 1px solid #e5e7ea;
`;

export const TableHeadText = styled(Text)`
	padding: 0 8px 4px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	&:nth-child(3),
	&:nth-child(4),
	&:nth-child(5) {
		text-align: center;
	}
`;

export const AddButton = styled(Button)`
	padding: 11px 8px 10px 21px;
	transform: none !important;

	&:hover {
		background: transparent !important;
	}
`;

export const AddButtonText = styled(Text)`
	margin-left: 6px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;
