import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const ItemLink = styled.a`
	color: #14171f;
	text-decoration: none;
	cursor: pointer;
`;

export const Table = styled.div<{ isExpanded: boolean }>`
	overflow: hidden;
	margin-bottom: ${({ isExpanded }) => (isExpanded ? '32px' : 0)};
	max-height: ${({ isExpanded }) => (isExpanded ? '1000vh' : 0)};
	transition: ${({ isExpanded }) =>
		isExpanded ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)'};
`;

export const TableHead = styled.div`
	display: grid;
	grid-template-columns: 1fr 80px 80px;
	gap: 16px;
	padding: 0 20px 0 48px;
	border-bottom: 1px solid #e5e7ea;
`;

export const TableHeadCell = styled(Text)`
	padding: 0 0 4px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;

	&:nth-child(2),
	&:nth-child(3) {
		text-align: center;
	}
`;
