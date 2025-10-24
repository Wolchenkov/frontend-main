import styled, { keyframes, css } from 'styled-components';
import InputMask from 'react-input-mask';

const blink = keyframes`
  0% {opacity: 1;}
  50% {opacity: 0;}
  100% {opacity: 1;}
`;

export const InputMaskWrapper = styled(InputMask)`
	height: 20px;
	text-align: center;
	caret-color: #ff6633;
	transition: all 0.5s ease;
	border: none;
	border-radius: 4px;

	&::placeholder {
		color: #898B8F;
	}

	&:focus {
	  background: #FDEDE7;
		outline: none;
	}

	&:focus::placeholder {
	  color: transparent;
	}
`;

export const Timer = styled.div<{ isRunning: boolean }>`
	position: relative;
	border-radius: 6px;
	border: ${({isRunning}) => `1px solid ${isRunning ? '#ff6633' : 'transparent'}`};
	background-color: #ffffff;
	padding: 4px 0 4px 4px;
	display: flex;
	align-items: center;
	margin-right: 4px;
	width: 179px;
	column-gap: ${(props) => !props.isRunning && '40px'};
	justify-content: ${(props) => props.isRunning && 'space-between'};
`;

export const TimerInputWrapper = styled.div`
	position: absolute;
	transform: translateX(-50%);
	left: 49%;
	height: 20px;
	display: grid;
	grid-template-columns: 24px 4px 24px;
	gap: 2px;
	font-size: 14px;
	font-weight: 500;
	letter-spacing: -0.02em;
	color: #898B8F;
`;

export const TimerCurrentTime = styled.div<{ isEmpty: boolean }>`
	position: absolute;
	transform: translateX(-50%);
	left: 49%;
	height: 20px;
	display: grid;
	grid-template-columns: 24px 4px 24px;
	gap: 2px;
	font-size: 14px;
	font-weight: 500;
	letter-spacing: -0.02em;
	color: ${({isEmpty}) => isEmpty ? '#898B8F' : '#14171F'};
	cursor: pointer;

	span {
	  display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const TimerDotted = styled.span<{ running: boolean }>`
	animation: ${(props) =>
		props.running
			? css`
					${blink} 1s linear infinite
			  `
			: 'none'};

	transition: all 0.5s ease;
`;
