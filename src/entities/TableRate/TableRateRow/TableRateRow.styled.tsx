import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const TableRateRow = styled.div<{ hover: boolean }>`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 40px 12px 8px;
	border-top: 1px solid #e5e7ea;
	background-color: ${(props) => props.hover && '#F8F8F8 '};
`;

export const TableRateRowButton = styled(Button)`
	position: absolute;
	right: 8px;
`;

export const TableRateRowInput = styled.input`
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
	font-size: 14px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.02em;
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
