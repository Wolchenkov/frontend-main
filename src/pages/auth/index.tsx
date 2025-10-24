import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Footer } from '../../entities';
import { AuthForm, SecretKeyForm } from '../../features';
import { useAuthFormController } from '../../features/AuthForm/AuthFormController';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Icon, Text, useToast } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';

const Container = styled.main`
	overflow: hidden;
`;

const Autn: NextPage = () => {
	const {
		handleSubmit,
		onSubmit,
		serverError,
		delEmailInput,
		handleEmail,
		register,
		emailForm,
		hidePassword,
		navigateRestorePassword,
		isValid,
		setHidePassword,
		checkbox,
		setCheckbox,
		getValues,
		errors,
		step,
		setStep,
		authByGoogle,
		touchedFields,
		wasInitiallyAutofilled,
		setValue,
		inputEmailRef,
		inputPasswordRef,
		authByMailRu
	} = useAuthFormController();

	const router = useRouter();
	const toast = useToast();
	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (localToken) {
			router.push('/');
			return;
		}

		const { token, error } = router.query;

		if (typeof token === 'string') {
			localStorage.setItem('token', token);
			router.push('/');
		}

		if (typeof error === 'string') {
			let errorMessage = 'Что-то пошло не так, обратитесь к администратору';

			switch (error) {
				case 'google_saml_user_not_auth':
					errorMessage = 'Пользователь не идентифицирован в Google Workspace (заблокирован или не существует)';
					break;
				case 'google_saml_user_not_found':
					errorMessage = 'Пользователь не найден в системе, обратитесь к администратору';
					break;
				case 'google_saml':
					errorMessage = 'Ошибка, обратитесь к администратору';
					break;
				case 'not_found_google_request_id':
					errorMessage = 'Ошибка, повторите попытку авторизации или обратитесь к администратору';
					break;
				case 'server_error':
					errorMessage = 'Ошибка сервера, обратитесь к администратору';
					break;
			}
			toast.show({
				size: 'small',
				color: 'critical',
				text: (
					<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em', color: 'white' } }}>
						{errorMessage}
					</Text>
				),
				icon: <Icon svg={<SvgComponent name='close-circle-white' />} size={6} />,
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);

	return (
		<>
			<Head>
				<title>Авторизация | Brave</title>
			</Head>
			<Container>
				{step ? (
					<AuthForm
						authByGoogle={authByGoogle}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						serverError={serverError}
						delEmailInput={delEmailInput}
						handleEmail={handleEmail}
						register={register}
						emailForm={emailForm}
						hidePassword={hidePassword}
						navigateRestorePassword={navigateRestorePassword}
						isValid={isValid}
						setHidePassword={setHidePassword}
						setCheckbox={setCheckbox}
						errors={errors}
						touchedFields={touchedFields}
						wasInitiallyAutofilled={wasInitiallyAutofilled}
						setValue={setValue}
						inputEmailRef={inputEmailRef}
						inputPasswordRef={inputPasswordRef}
						authByMailRu={authByMailRu}
					/>
				) : (
					<SecretKeyForm data={{ ...getValues(), remember: checkbox }} back={() => setStep(true)} />
				)}
				<Footer />
			</Container>
		</>
	);
};

export default Autn;
