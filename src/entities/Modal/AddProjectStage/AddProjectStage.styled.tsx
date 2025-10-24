import { Modal, Text } from 'reshaped/bundle';
import styled from 'styled-components';
import { CustomTextInput } from '../../CustomInput/CustomTextInput';

export const MyModal = styled(Modal)`
	overflow: visible;
`;
export const MyText = styled(Text)`
	letter-spacing: -0.02em;
`;

export const MyInput = styled(CustomTextInput)`
	height: 24px;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.02em;
`;
