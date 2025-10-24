import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const TableBody = styled.div``;

export const TableButton = styled(Button)`
	&:hover {
		background: transparent !important;
	}
`;

export const UnderRow = styled.div`
	height: 45px;
	border-bottom: 1px solid #e5e7ea;
	background-color: #f8f8f8;

	&:nth-child(1) {
		height: 46px;
		border-top: 1px solid #e5e7ea;
	}
`;
