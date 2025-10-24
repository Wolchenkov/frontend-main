import styled from 'styled-components';

export const InputWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
`;
export const MainContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	text-align: center;
	margin: 96px auto 0 auto;
`;
export const Container = styled.div`
	width: 360px;
	text-align: center;
`;
