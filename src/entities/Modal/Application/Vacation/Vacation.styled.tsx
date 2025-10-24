import styled from 'styled-components';
import { Button } from 'reshaped/bundle';

export const VacationButton = styled(Button)`
	flex-grow: 1;
	padding: 7px;
	background-color: #ffffff !important;
	transform: none !important;

	& *:last-child {
		margin-left: auto;
	}
`;
