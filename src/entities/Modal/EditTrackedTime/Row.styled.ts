import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
export const NameContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	width: 180px;
	padding: 10px 8px;
`;

export const TypeWorkContainer = styled.div`
	display: flex;
	align-items: center;
	width: 131px;
	padding: 12px 8px;
	justify-content: end;
`;

export const CommentContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20px;
	padding: 0 2px;
`;
export const BilliableContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 33px;
	padding: 12px 8px;
`;
export const TimeContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 48px;
	padding: 12px 8px;
`;
export const EditButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
`;

export const MainContainer = styled.div<{ isHover: boolean; isApproved: boolean }>`
	transition: all 0.5s ease;
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 0 12px;
	background-color: ${({ isHover }) => isHover && '#F8F8F8'};
	opacity: ${({ isApproved }) => (isApproved ? '1' : '0.5')};
`;

export const TimerTrackDropdownWrapper = styled.div`
	padding: 20px 40px;
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
	gap: 4px;
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
