import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const ProjectsTable = styled.div`
	width: calc(100% + 40px);
	margin: 0 -20px;
`;

export const ProjectsAddButton = styled(Button)`
	margin: 5px 20px;
	font-size: 12px !important;
	line-height: 20px !important;
	font-weight: 500 !important;
	letter-spacing: -0.01em;
	color: #52555d;

	& + div {
		border-top: 1px solid #ebebeb;
	}
`;

export const TableButton = styled(Button)`
	display: flex;

	&:hover {
		background: transparent !important;
	}
`;
