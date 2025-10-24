import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
	font-family: 'Inter', sans-serif;
	width: 100%;
	border: none;
	outline: none;
	padding: 0;
	background-color: transparent;
	color: #14171f;
	caret-color: #ff6633;
	resize: none;

	/* Firefox */
	-moz-appearance: textfield;

	&:focus {
		outline: none;
		background-color: transparent;
	}
`;
