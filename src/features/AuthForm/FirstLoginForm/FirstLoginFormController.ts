import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../store';
import { setToken } from '../../../store/auth/authSlice';
import { logout } from '../../../store/auth/authSlice';

interface IFormInput {
	password: string;
	confirmPassword: string;
	remember: boolean;
	firstName: string;
	lastName: string;
}

export function useFirstLoginFormController() {
	const router = useRouter();
	const email = router.query.email;
	const dispatch = useAppDispatch();

	// эффект для выхода из приложения при переходе по ссылке приглашению
	useEffect(() => {
		dispatch(logout());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
	const [checkbox, setCheckbox] = useState<boolean>(false); // стейт для чекбокса
	const [step, setStep] = useState(true); // этапы логина
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

	const watchedFirstName = watch('firstName');
	const watchedLastName = watch('lastName');

	useEffect(() => {
		if (errors.firstName || errors.lastName) {
			setAlertColor('critical');
		} else {
			setAlertColor('neutral');
		}
	}, [watchedFirstName, watchedLastName, errors]);

	const onSubmitPassword: SubmitHandler<IFormInput> = (data) => {
		if (data.password !== data.confirmPassword) {
			setAlertMessage('Пароли не совпадают.');
		} else {
			setAlertMessage('');
			setStep(false);
		}
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const modifiedPath = router.asPath.replace('/auth', '');
		const host = process.env.NEXT_PUBLIC_HTTP_SERVICE_URL;
		const url = host + modifiedPath;

		const body = JSON.stringify({
			first_name: data.firstName,
			last_name: data.lastName,
			email: email,
			password: data.password,
			password_confirmation: data.confirmPassword,
			remember: checkbox,
		});

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body,
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			if (data.token) {
				dispatch(setToken(data));
				router.push('/');
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return {
		register,
		handleSubmit,
		onSubmitPassword,
		onSubmit,
		hidePassword,
		setCheckbox,
		setHidePassword,
		router,
		step,
		setStep,
		email,
		errors,
		alertColor,
		alertMessage,
	};
}
