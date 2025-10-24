import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const Item = styled.div<{ active?: boolean }>`
	position: relative;
	padding: 10px 68px 10px 12px;
	border-radius: 6px;
	transition: background-color 0.3s ease;
	cursor: pointer;
	cursor: ${({ active }) => (active ? 'default' : 'pointer')};
	background-color: ${({ active }) => active && '#E9E9EB'};

	&:hover {
		background-color: ${({ active }) => (active ? '#E9E9EB' : '#F4F5F7')};
	}
`;

export const ItemText = styled(Text)`
	display: block;
	max-width: 100%;
	font-weight: 500;
	letter-spacing: -0.02em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const ItemButtons = styled.div<{ isVisible?: boolean }>`
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-50%);
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	transition: opacity 0.3s ease;
`;

export const ItemButton = styled(Button)`
	&:hover {
		background: transparent !important;
	}
`;
