import { Button, Text } from 'reshaped/bundle';
import styled from 'styled-components';

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

export const MyButton = styled(Button)<{ margin?: string; activeBtn: boolean }>`
	margin: ${(props) => props.margin};
	background-color: ${(props) => props.activeBtn && '#E9E9EB'} !important;
`;

export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
