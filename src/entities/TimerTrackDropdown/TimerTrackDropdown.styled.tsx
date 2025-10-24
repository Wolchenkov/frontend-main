import styled from 'styled-components';

export const TimerTrackDropdownWrapper = styled.div`
	padding: 12px;
`;

export const TimerTrackDropdownPillsWrapper = styled.div`
	display: flex;
	column-gap: 8px;
	margin-bottom: 12px;
`;

export const TimerTrackDropdownBottomWrapper = styled.div`
	display: flex;
	justify-content: end;
	margin-top: 12px;
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
