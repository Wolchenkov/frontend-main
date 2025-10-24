import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
	email: string;
}

export function useRestoreFormController() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm<IFormInput>({
		mode: 'onBlur',
		criteriaMode: 'all',
		defaultValues: {
			email: '',
		},
	});
	const inputEmailRef = useRef<HTMLInputElement | null>(null);

	const [serverError, setServerError] = useState(false);
	const [serverAnswer, setServerAnswer] = useState(false);

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const url = `${process.env.NEXT_PUBLIC_HTTP_SERVICE_URL}/auth/forgot-password`;
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify(data),
		};
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			if (data.errors) {
				setServerError(true);
			} else {
				setServerAnswer(true);
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return {
		register,
		handleSubmit,
		onSubmit,
		serverError,
		serverAnswer,
		router,
		errors,
		getValues,
		isValid,
		inputEmailRef
	};
}
