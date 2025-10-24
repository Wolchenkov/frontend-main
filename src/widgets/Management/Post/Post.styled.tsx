import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const Title = styled(Text)`
	margin-bottom: 16px;
	letter-spacing: -0.015em;
`;

export const Description = styled(Text)`
	margin-bottom: 32px;
	line-height: 24px;
	letter-spacing: -0.02em;
`;

export const Table = styled.div``;

export const TableHead = styled.div`
	display: grid;
	grid-template-columns: 1fr 80px 28px;
	gap: 16px;
	border-bottom: 1px solid #e5e7ea;
`;

export const TableHeadCell = styled(Text)`
	padding: 0 8px 4px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	&:nth-child(2) {
		text-align: center;
	}
`;

export const AddButton = styled(Button)`
	padding: 10px 8px;
	transform: none !important;

	&:hover {
		background: transparent !important;
	}
`;

export const AddButtonText = styled(Text)`
	margin-left: 4px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;
