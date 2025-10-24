import { Text } from 'reshaped/bundle';
import styled, { keyframes, css } from 'styled-components';
import InputMask from 'react-input-mask';

// one timer
export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	width: 400px;
`;
export const TaskName = styled(Text)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	display: block;
	letter-spacing: -0.02em;
`;

export const TimerWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px;
	background-color: #f4f5f7;
	width: 119px;
	height: 36px;
	border-radius: 8px;
`;

export const InputMaskWrapper = styled(InputMask)`
	width: 50px;
	caret-color: #ff6633;
	font-weight: 500;
	border: none;
	background-color: #f4f5f7;
	caret-color: #ff6633;
	position: absolute;
	transform: translateX(-50%);
	left: 61px;

	&::placeholder {
		color: rgba(137, 139, 143, 1);
	}

	&:focus {
		outline: none;
	}
`;

export const TimerCurrentTime = styled.div`
	font-size: 14px;
	font-weight: 500;
	padding: 4px 8px;
	transition: all 0.5s ease;
	border-radius: 6px;
	cursor: pointer;
	position: absolute;
	transform: translateX(-50%);
	left: 58px;
`;
const blink = keyframes`
  0% {opacity: 1;}
  50% {opacity: 0;}
  100% {opacity: 1;}
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

export const TimerTrackDropdownHeader = styled.div`
	padding: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const TruncatedText = styled(Text)`
	letter-spacing: -0.02em;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	display: block;
`;

export const TimerTrackDropdownWrapper = styled.div`
	padding: 12px;
`;

export const TimerTrackDropdownPillsWrapper = styled.div`
	display: flex;
	column-gap: 8px;
	margin-bottom: 12px;
`;

export const TimerTrackDropdownTextArea = styled.textarea`
	resize: none;
	border-radius: 6px;
	border: none;
	outline: 1px solid #cfd0d3;
	width: 100%;
	padding: 8px;
	margin-top: 4px;
	font-size: 12px;
	font-weight: 500;
	caret-color: #f63;
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	color: #52555d;

	&:focus {
		outline: 2px solid #f63;
	}
`;
export const TimerTrackDropdownBottomWrapper = styled.div`
	display: flex;
	justify-content: end;
	margin-top: 12px;
`;

export const ContentHeader = styled.div`
	padding: 12px 12px 16px 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ContentWrapper = styled.div`
	padding: 16px 12px 12px 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	gap: 4px;
`;
