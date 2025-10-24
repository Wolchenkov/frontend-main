import styled from 'styled-components';
import { Button, TextField } from 'reshaped/bundle';

export const PillButton = styled(Button)<{ active: boolean; isRequired?: boolean }>`
	position: ${({ isRequired }) => isRequired && 'relative'};
	padding-right: ${({ isRequired }) => isRequired && '17px !important'};
	background-color: ${({ active }) => active && '#E9E9EB !important'};

	&:after {
		display: ${({ isRequired }) => !isRequired && 'none'};
		content: '*';
		position: absolute;
		top: 4px;
		right: 7px;
		color: #ff6633;
	}
`;

export const PillInput = styled(TextField)`
	caret-color: #ff6633;

	&:focus-within {
		border-color: #cfd0d3;
		box-shadow: none;
	}
`;
