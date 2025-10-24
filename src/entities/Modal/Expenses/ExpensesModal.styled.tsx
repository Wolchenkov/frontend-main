import { Modal, Text, TextArea, TextField } from 'reshaped/bundle';
import styled from 'styled-components';

export const MyModal = styled(Modal)`
	overflow: visible;
`;
export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.02em;
`;

export const MyInputCost = styled(TextField)`
	width: 143px;
	height: 20px;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	caret-color: #ff6633;
`;
export const MyInputDescription = styled(TextArea)`
	width: 100%;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	caret-color: #ff6633;
`;

export const TextError = styled(Text)`
	color: #e52020;
	letter-spacing: -0.01em;
	font-weight: 500;
	line-height: 20px;
	margin-top: 4px;
`;

export const InputWrapper = styled.div<{ error: boolean }>`
	padding: ${({ error }) => (error ? '16px 16px 0' : '16px 16px 24px')};
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: end;
	gap: 4px;
	padding: 8px 16px 16px;
`;
