import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const ItemRow = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) repeat(8, 64px);
	padding: 0 20px 0 28px;
	border-bottom: 1px solid #e5e7ea;
`;

export const ItemRowCell = styled.div<{ isWeekend?: boolean }>`
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

export const ItemLink = styled.a`
	color: #14171f;
	text-decoration: none;
	cursor: pointer;
`;

export const ItemRowText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;

export const Table = styled.div<{ isExpanded: boolean }>`
	overflow: hidden;
	max-height: ${({ isExpanded }) => (isExpanded ? '1000vh' : 0)};
	transition: ${({ isExpanded }) =>
		isExpanded ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)'};
`;
