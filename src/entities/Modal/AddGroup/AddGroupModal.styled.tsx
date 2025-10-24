import styled from 'styled-components';
import { Modal } from 'reshaped/bundle';
import { CustomTextInput } from '../../CustomInput/CustomTextInput';

export const AddGroupModal = styled(Modal)`
	overflow: visible;
`;

export const AddGroupNameInput = styled(CustomTextInput)`
	height: 24px;
	font-family: 'Inter', sans-serif;
	font-size: 16px;
	line-height: 24px;
	font-weight: 500;
	letter-spacing: -0.02em;
	margin-bottom: 8px;

	&::placeholder {
		color: #898b8f;
	}
`;
