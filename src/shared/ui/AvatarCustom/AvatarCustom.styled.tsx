import styled from 'styled-components';
import { ColorToBackground, ColorToTextColor } from './AvatarCustom';

export const AvatarCustom = styled.div<{
	size: number;
	color: string;
}>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ size }) => size * 4}px;
	height: ${({ size }) => size * 4}px;
	border-radius: 50%;
	overflow: hidden;
  background-color: ${({color}) => ColorToBackground[color as keyof typeof ColorToBackground]};
`;

export const AvatarCustomInitials = styled.span<{
	size: number;
	color: string;
}>`
	font-size: ${({ size }) => size * 4 / 3}px;
	line-height: 1;
	font-weight: 700;
	text-align: center;
	color: ${({color}) => ColorToTextColor[color as keyof typeof ColorToBackground]};
`;
