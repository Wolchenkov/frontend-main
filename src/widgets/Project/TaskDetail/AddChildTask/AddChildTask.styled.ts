import { Text, TextField } from 'reshaped/bundle';
import styled from 'styled-components';

export const AddFileContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	padding: 12px 0;
	cursor: pointer;
	width: 100%;
`;

export const PillInput = styled(TextField)`
	margin-bottom: 4px;
	border: none;

	&:focus-within {
		border-color: #cfd0d3;
		box-shadow: none;
	}
	input {
		font-weight: 500;
		letter-spacing: -0.02em;
	}
`;

export const PillDropdownMenuContentWrap = styled.div`
	max-height: 236px;
	overflow-y: auto;

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(207, 208, 211, 0.5);
	}
`;

export const PillDropdownItemContent = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
export const PillDropdownItemText = styled(Text)`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	padding-right: 26px;
	overflow: hidden;

	font-weight: 500;
	letter-spacing: -0.02em;
`;

export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
