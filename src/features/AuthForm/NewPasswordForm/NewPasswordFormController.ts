import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
	password: string;
	confirmPassword: string;
}

export function useNewPasswordFormController() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<IFormInput>({
		mode: 'onBlur',
		criteriaMode: 'all',
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const [hidePassword, setHidePassword] = useState<boolean>(true); // стейт для скрытия/отображения пароля
	const [alertColor, setAlertColor] = useState<'neutral' | 'critical'>('neutral');
	const [alertMessage, setAlertMessage] = useState(
		'Пароль должен содержать не менее 8 символов и содержать одну заглавную и одну строчную букву'
	);

	const watchedPassword = watch('password');
	const watchedConfirmPassword = watch('confirmPassword');

	useEffect(() => {
		if (errors.password) {
			setAlertMessage(
				'Ваш пароль должен содержать от 8 до 36 символов, заглавные и строчные буквы, а также быть на латинице'
			);
			setAlertColor('critical');
		} else if (watchedPassword && watchedPassword !== watchedConfirmPassword) {
			setAlertMessage('Пароли не совпадают');
			setAlertColor('critical');
		} else {
			setAlertMessage('Пароль должен содержать не менее 8 символов и содержать одну заглавную и одну строчную букву');
			setAlertColor('neutral');
		}
	}, [watchedPassword, watchedConfirmPassword, errors]);

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		if (data.password !== data.confirmPassword) {
			setAlertMessage('Пароли не совпадают.');
			setAlertColor('critical');
		} else {
			const modifiedPath = router.asPath.replace('/restore', '');
			const host = process.env.NEXT_PUBLIC_HTTP_SERVICE_URL;
			const url = host + modifiedPath;

			const body = JSON.stringify({
				password: data.password,
				password_confirmation: data.confirmPassword,
			});
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body,
			};
			try {
				const response = await fetch(url, options);
				const data = await response.json();
				if (data.message === 'Пароль изменён') {
					router.push('/auth');
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		}
	};

	return {
		register,
		handleSubmit,
		onSubmit,
		hidePassword,
		setHidePassword,
		router,
		alertMessage,
		errors,
		alertColor,
	};
}
