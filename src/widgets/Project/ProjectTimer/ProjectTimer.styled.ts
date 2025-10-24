import styled, { keyframes, css } from 'styled-components';

export const ContentHeader = styled.div`
	padding: 12px 12px 16px 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ContentWrapper = styled.div`
	padding: 16px 12px 12px 12px;
	max-height: 268px;
	overflow: auto;
	::-webkit-scrollbar {
		width: 4px;
	}
	::-webkit-scrollbar-thumb {
		background: rgba(207, 208, 211, 0.5);
		border-radius: 8px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #ff6633;
	}
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
