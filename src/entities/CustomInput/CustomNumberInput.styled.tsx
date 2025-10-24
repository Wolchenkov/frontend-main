import styled from 'styled-components';

// text-align: right;
export const StyledInput = styled.input`
	width: 34px;
	height: 20px;
	border: none;
	outline: none;
	padding: 0;
	background-color: transparent;
	color: #14171f;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 20px;
	caret-color: #ff6633;

	/* Chrome, Safari, Edge, Opera */
	::-webkit-inner-spin-button,
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	-moz-appearance: textfield;

	&:focus {
		outline: none;
		background-color: transparent;
	}
`;
