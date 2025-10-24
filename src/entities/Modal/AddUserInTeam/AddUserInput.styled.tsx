import styled from 'styled-components';
import { CustomTextInput } from '../../CustomInput/CustomTextInput';
import { Text } from 'reshaped/bundle';

export const MyInput = styled(CustomTextInput)<{ isValidEmail: string | undefined }>`
	height: 24px;
	width: 529px;
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: ${(props) =>
		props.isValidEmail === 'Введите уникальную корректную почту и заполните все поля' ||
		props.isValidEmail === 'Введите уникальную корректную почту'
			? '#E52020'
			: '#14171F'};
`;

export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
