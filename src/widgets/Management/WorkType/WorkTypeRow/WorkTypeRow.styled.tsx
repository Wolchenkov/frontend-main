import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const TableRow = styled.div<{
	isHovered: boolean;
}>`
	display: grid;
	grid-template-columns: 1fr 120px 28px;
	align-items: center;
	gap: 16px;
	border-bottom: 1px solid #e5e7ea;
	background-color: ${({ isHovered }) => isHovered && '#F8F8F8'};
`;

export const TableRowCell = styled.div`
	position: relative;
	padding: 12px 8px;

	&:nth-child(2) {
		position: relative;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 12px 40px 12px 8px;
	}
`;

export const TableRowCellText = styled(Text)`
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;

export const TableRowInput = styled.input`
	width: 67px;
	height: 20px;
	margin: 0;
	padding: 0;
	background-image: none;
	background-color: transparent;
	box-shadow: none;
	border: none;
	outline: none;
	resize: none;
	text-align: right;
	font-family: 'Inter', sans-serif;
	font-size: 12px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
	color: #14171f;
	caret-color: #ff6633;

	&::placeholder {
		color: #898b8f;
	}

	&:focus {
		outline: none;
		background-color: transparent;
	}
`;

export const TableRowButton = styled(Button)`
	position: absolute;
	right: 2px;
`;
