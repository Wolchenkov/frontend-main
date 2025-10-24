import { Modal, Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const MyModal = styled(Modal)`
	max-height: 610px;
	padding: 0;
`;
export const ScrollableDiv = styled.div`
	max-height: 390px;
	overflow: overlay;
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
export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.02em;
`;
