import { Button, Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const ChildRow = styled.div<{ isHover: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	padding-left: 2px;
	background-color: ${({ isHover }) => (isHover ? '#F8F8F8' : 'transparent')};
`;

export const MyText = styled(Text)<{ isCompleted: string | null }>`
	font-weight: 500;
	letter-spacing: -0.01em;
	padding: 12px 0;
	max-width: 400px;
	cursor: pointer;
	color: ${({ isCompleted }) => (isCompleted ? '#D2D5DB' : '#14171F')};
`;

export const LeftSide = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const RightSide = styled.div`
	display: flex;
	align-items: center;
`;

export const DelButton = styled(Button)`
	&:hover {
		background: transparent !important;
	}
`;

export const CalendarContainer = styled.div`
	width: 49px;
	display: flex;
	justify-content: center;
`;
