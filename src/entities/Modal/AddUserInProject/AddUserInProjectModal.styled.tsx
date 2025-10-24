import { Modal, Text } from 'reshaped/bundle';
import styled from 'styled-components';
import { CustomTextInput } from '../../CustomInput/CustomTextInput';

export const MyModal = styled(Modal)`
	overflow: visible;
`;
export const MyText = styled(Text)`
	letter-spacing: -0.02em;
`;

// width: calc(100% - 8px);
export const ScrollableDiv = styled.div`
	padding: 4px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-height: 390px;
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
export const MyInput = styled(CustomTextInput)`
	height: 24px;
	font-family: 'Inter', sans-serif;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
`;
