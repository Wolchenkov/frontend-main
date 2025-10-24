import React, { FC } from 'react';
import { Button, Text, TextField } from 'reshaped/bundle';
import { useSecretKeyFormController } from './SecretKeyFormController';
import { AuthHeader } from '../../../entities';
import { SvgComponent } from '../../../shared';
import * as S from './SecretKeyForm.styled';

interface IFormInput {
	email: string | null;
	password: string;
	remember: boolean;
}
interface ISecretKeyProps {
	data: IFormInput;
	back: () => void;
}
export const SecretKeyForm: FC<ISecretKeyProps> = ({ data, back }) => {
	const {
		timerSeconds,
		inputsDisabled,
		handleOnChange,
		handleOnKeyDown,
		otpIndex,
		inputRef,
		otp,
		email,
		handleOnKeyPress,
		serverError,
		retrySeconds,
		isLoading,
		sendNewCode,
	} = useSecretKeyFormController();
	return (
		<S.MainContainer>
			<AuthHeader svgName='lock-password' marginBottom={32} text='Введите 4-х значный проверочный код' />
			<S.Container>
				<S.InputWrapper>
					{otp.map((_, index) => {
						return (
							<React.Fragment key={index}>
								<TextField
									hasError={serverError}
									disabled={inputsDisabled}
									name={'name' + index.toString()}
									inputAttributes={{
										ref: index === otpIndex ? inputRef : null,
										type: 'text',
										inputMode: 'decimal',
										onKeyDown: (e) => handleOnKeyDown(e, index),
										onKeyPress: (e) => handleOnKeyPress(e),
										style: { textAlign: 'center', color: '#52555D' },
									}}
									attributes={{
										style: { padding: '14px 12px', width: '48px', height: '48px', margin: '0 2px 12px' },
									}}
									onChange={(e) => handleOnChange(e)}
									value={otp[index]}
								/>
								{index === otp.length - 1 ? null : <span></span>}
							</React.Fragment>
						);
					})}
				</S.InputWrapper>
				{timerSeconds !== null ? (
					<Text
						color='critical'
						variant='caption-1'
						attributes={{
							style: { fontWeight: '500', letterSpacing: '-0.01em', lineHeight: '20px', marginBottom: 12 },
						}}
					>
						Ввод кода будет доступен через{' '}
						{`${Math.floor(timerSeconds / 60)}:${timerSeconds % 60 < 10 ? '0' : ''}${timerSeconds % 60}`}
					</Text>
				) : null}
				{serverError ? (
					<Text
						color='critical'
						variant='caption-1'
						attributes={{
							style: { fontWeight: '500', letterSpacing: '-0.01em', lineHeight: '20px', marginBottom: 12 },
						}}
					>
						Введен неверный код, попробуйте еще раз
					</Text>
				) : null}
				<Text
					variant='caption-1'
					attributes={{
						style: { fontWeight: '500', letterSpacing: '-0.01em', lineHeight: '20px' },
					}}
				>
					Код отправлен на {email}
				</Text>
				{retrySeconds > 0 ? (
					<Text
						color='neutral-faded'
						variant='caption-1'
						attributes={{
							style: { fontWeight: '500', letterSpacing: '-0.01em', lineHeight: '20px', marginBottom: 153 },
						}}
					>
						Запросить повторно можно через{' '}
						{`${Math.floor(retrySeconds / 60)}:${retrySeconds % 60 < 10 ? '0' : ''}${retrySeconds % 60}`}
					</Text>
				) : (
					<Button
						onClick={() => sendNewCode(data)}
						size='small'
						color='neutral'
						attributes={{ style: { marginTop: 20, marginBottom: 125 } }}
						type='button'
					>
						<Text
							variant='body-2'
							attributes={{
								style: { fontWeight: '500' },
							}}
						>
							Отправить код повторно
						</Text>
					</Button>
				)}

				<Button
					loading={isLoading}
					onClick={back}
					variant='outline'
					fullWidth={true}
					type='button'
					startIcon={<SvgComponent name='arrow-left' />}
				>
					<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
						Назад
					</Text>
				</Button>
			</S.Container>
		</S.MainContainer>
	);
};
