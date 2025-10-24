import styled from 'styled-components';
import { TextField } from 'reshaped/bundle';

// export const PillTypeWorkStyledWrapper = styled(Actionable)`
// 	display: flex;
// 	padding-inline: 8px;
// 	width: 162px;
// 	border: 1px solid #e5e7ea;
// 	border-radius: 6px;
// 	justify-content: space-between;
// 	align-items: center;
// 	transition: all 0.3s ease;

// 	&:hover {
// 		background-color: rgba(244, 245, 247, 1);
// 	}
// `;

export const MyInput = styled(TextField)<{ active: boolean }>`
	width: 162px;
	& input {
		color: #52555d;
		cursor: pointer;
		letter-spacing: -0.02em;
	}
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
