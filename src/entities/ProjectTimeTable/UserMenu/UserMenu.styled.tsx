import styled from 'styled-components';
import { Actionable, Text, TextField } from 'reshaped/bundle';

export const UserFilter = styled(Actionable)`
	display: flex;
	align-items: center;
`;

export const TextAll = styled(Text)`
	color: #898b8f;
	padding-left: 3px;
	padding-right: 6px;
`;

export const SearchInput = styled(TextField)`
	border: none;

	&:focus-within {
		border-color: #cfd0d3;
		box-shadow: none;
	}
`;
