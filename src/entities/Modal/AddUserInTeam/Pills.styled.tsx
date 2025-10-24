import { Button } from 'reshaped/bundle';
import styled from 'styled-components';

export const MyButton = styled(Button)<{ isInvalid: boolean; active: boolean }>`
	background-color: ${(props) => props.active && '#E9E9EB !important'};
	border-color: ${(props) => (props.isInvalid ? '#CB101D' : '#E5E7EA')}!important;
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
