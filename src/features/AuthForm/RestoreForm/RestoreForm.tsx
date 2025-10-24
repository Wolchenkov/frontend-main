import { FC } from 'react';
import { Button, Text } from 'reshaped/bundle';
import { AuthHeader, AuthInputEmail } from '../../../entities';

import * as S from './RestoreForm.styled';
import { useRestoreFormController } from './RestoreFormController';
import { SvgComponent } from '../../../shared';

export const RestoreForm: FC = () => {
	const { register, handleSubmit, onSubmit, serverError, errors, serverAnswer, router, getValues, isValid, inputEmailRef } =
		useRestoreFormController();

	return (
		<S.MainContainer>
			{!serverAnswer ? (
				<>
					<AuthHeader
						svgName='lock-mail'
						marginBottom={48}
						text={`Укажите, куда отправить инструкции для восстановления пароля`}
					/>
					<S.Form onSubmit={handleSubmit(onSubmit)}>
						<AuthInputEmail errors={errors} serverError={serverError} register={register} margin={4} ref={inputEmailRef}/>
						<S.ErrorWrapper>
							{serverError && (
								<Text
									align='start'
									color='critical'
									variant='body-2'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
								>
									Такого пользователя не существует
								</Text>
							)}
						</S.ErrorWrapper>

						<Button
							disabled={!isValid}
							color='primary'
							attributes={{ style: { marginBottom: 12, marginTop: 133 } }}
							fullWidth={true}
							type='submit'
						>
							<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
								Отправить
							</Text>
						</Button>
					</S.Form>
				</>
			) : (
				<>
					<AuthHeader svgName='main-logo' marginBottom={8} text={`Проверьте ваш e-mail`} />
					<Text
						color='neutral-faded'
						variant='body-1'
						attributes={{ style: { marginBottom: 285, letterSpacing: '-0.02em' } }}
					>
						Мы отправили письмо с инструкцией на почту {getValues().email}
					</Text>
				</>
			)}
			<Button
				onClick={() => router.back()}
				variant='outline'
				type='button'
				startIcon={<SvgComponent name='arrow-left' />}
				attributes={{ style: { width: 360 } }}
			>
				<Text variant='body-2' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}>
					Назад
				</Text>
			</Button>
		</S.MainContainer>
	);
};
