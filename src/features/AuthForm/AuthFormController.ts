import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeHandler } from 'reshaped/types/global';
import { useAppDispatch } from '../../store';
import { setEmail, setToken } from '../../store/auth/authSlice';

export interface IFormInput {
	email: string | null;
	password: string;
	remember: boolean;
}

export function useAuthFormController() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		setValue,
		formState: { isValid, errors, touchedFields },
	} = useForm<IFormInput>({
		mode: 'onChange',
	});

	const inputEmailRef = useRef<HTMLInputElement | null>(null);
	const inputPasswordRef = useRef<HTMLInputElement | null>(null);
	const [checkbox, setCheckbox] = useState(false); // стейт для чекбокса
	const [emailForm, setEmailForm] = useState(''); // стейт для инпута email
	const [hidePassword, setHidePassword] = useState<boolean>(true); // стейт для скрытия/отображения пароля
	const [serverError, setServerError] = useState(false);
	const [step, setStep] = useState(true);
	const [wasInitiallyAutofilled, setWasInitiallyAutofilled] = useState(false);

	useEffect(() => {
		if (!inputEmailRef.current || !inputPasswordRef.current) return;

		const checkFieldsAutofilled = () => {
			const areAutofilled = !!(
				inputEmailRef.current?.matches(':autofill') && inputPasswordRef.current?.matches(':autofill')
			);
			setWasInitiallyAutofilled(areAutofilled);
		};
		setTimeout(checkFieldsAutofilled, 500);
		setTimeout(checkFieldsAutofilled, 1000);
		setTimeout(checkFieldsAutofilled, 2000);
	}, [inputEmailRef, inputPasswordRef]);

	useEffect(() => {
		if (!inputEmailRef.current || !inputPasswordRef.current) return;

		const observer = new MutationObserver(() => {
			const areAutofilled = !!(
				inputEmailRef.current?.matches(':autofill') && inputPasswordRef.current?.matches(':autofill')
			);
			setWasInitiallyAutofilled(areAutofilled);
		});

		observer.observe(inputEmailRef.current, { attributes: true });
		observer.observe(inputPasswordRef.current, { attributes: true });

		return () => observer.disconnect();
	}, [inputEmailRef, inputPasswordRef]);

	const authByGoogle = async () => {
		const host = process.env.NEXT_PUBLIC_HTTP_SERVICE_URL;
		const url = `${host}/saml-google/login`;
		try {
			const response = await fetch(url);
			const { data, success } = await response.json();
			if (success) {
				document.cookie = `saml_google_request_id=${data.request_id}`;
				window.location.href = data.redirect_url;
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	const authByMailRu = async () => {
		const host = process.env.NEXT_PUBLIC_HTTP_SERVICE_URL;
		const url = `${host}/oauth/mail`;
		try {
			const response = await fetch(url);
			const { url: mailRuUrl } = await response.json();
			if (mailRuUrl) {
				window.location.href = mailRuUrl;
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(setEmail(data));
    const host = process.env.NEXT_PUBLIC_HTTP_SERVICE_URL;
    const url = `${host}/auth/login`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, remember: checkbox }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.message === 'Неверный логин или пароль') {
        setServerError(true);
      }
      if (data.message === 'Код для входа отправлен на email') {
        setStep(false);
        setServerError(false);
      }
      if (data.message.includes('Вы успешно')) {
        dispatch(setToken(data));
        router.push('/');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };


	const delEmailInput = () => {
		setEmailForm('');
		reset({ email: '' });
	};

	const handleEmail: ChangeHandler<string> = (args) => setEmailForm(args.value);

	const navigateRestorePassword = () => router.push('/auth/restore');

	return {
		register,
		handleSubmit,
		onSubmit,
		serverError,
		delEmailInput,
		handleEmail,
		emailForm,
		hidePassword,
		navigateRestorePassword,
		checkbox,
		setCheckbox,
		isValid,
		setHidePassword,
		router,
		errors,
		step,
		getValues,
		setStep,
		authByGoogle,
		touchedFields,
		wasInitiallyAutofilled,
		setValue,
		inputEmailRef,
		inputPasswordRef,
		authByMailRu
	};
}
