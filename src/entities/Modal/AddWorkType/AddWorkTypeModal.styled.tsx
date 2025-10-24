import styled from 'styled-components';
import { Modal, Text } from 'reshaped/bundle';
import { CustomTextInput } from '../../../entities';

export const AddWorkTypeModal = styled(Modal)`
	overflow: visible;
`;

export const AddWorkTypeNameInput = styled(CustomTextInput)`
	height: 24px;
	font-family: 'Inter', sans-serif;
	font-size: 16px;
	line-height: 24px;
	font-weight: 500;
	letter-spacing: -0.02em;

	&::placeholder {
		color: #898b8f;
	}
`;

export const AddWorkTypeNameError = styled(Text)`
	position: absolute;
	top: 24px;
	left: 0;
	margin-top: 8px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;
