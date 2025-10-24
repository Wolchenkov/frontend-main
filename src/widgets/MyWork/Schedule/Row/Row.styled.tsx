import styled from 'styled-components';
import { Text } from 'reshaped/bundle';

export const Row = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) repeat(8, 64px);
	padding: 0 20px 0 56px;
	border-bottom: 1px solid #e5e7ea;
`;

export const RowCell = styled.div<{ isWeekend?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 14px 0;
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

export const RowText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
