import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const TruncatedText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	display: block;
`;

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const FlexContainerAlignItems = styled.div`
	display: flex;
	align-items: center;
`;
export const DropdopdownContent = styled.div`
	max-height: 315px;
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

export const MyTr = styled.tr<{ hover: boolean }>`
	transition: all 0.5s ease;
	background-color: ${(props) => props.hover && '#F8F8F8 !important'};
`;
