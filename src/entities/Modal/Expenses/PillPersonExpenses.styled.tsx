import styled from 'styled-components';
import { DropdownMenu, TextField, Text } from 'reshaped/bundle';

export const PillDropdownMenu = styled(DropdownMenu)`
	width: max-content;
	min-width: 272px;
	max-width: 400px;
`;

export const MyInput = styled(TextField)<{ active: boolean }>`
	width: 240px;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	border: none !important;
	caret-color: transparent;
	${({ active }) =>
		active
			? `
    outline: 2px solid #F63 !important;
  `
			: `
    outline: 1px solid #CFD0D3 !important;
    outline-offset: -1px;
    &:focus-within {
      box-shadow: none !important;
    }
  `}
`;

export const PillInput = styled(TextField)`
	border: none;

	&:focus-within {
		border-color: #cfd0d3;
		box-shadow: none;
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
`;

export const PillDropdownMenuContentWrap = styled.div<{ maxHeight?: string }>`
	height: 392px;
	height: auto;
	max-height: ${(props) => (props.maxHeight ? props.maxHeight : 'none')};
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
