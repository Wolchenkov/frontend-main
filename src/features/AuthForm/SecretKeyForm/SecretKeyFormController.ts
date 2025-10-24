import React, { useEffect, useRef, useState } from 'react';
import { ChangeHandler } from 'reshaped/types/global';
import { RootState, useAppDispatch, useAppSelector } from '../../../store';
import { useRouter } from 'next/router';
import { setToken } from '../../../store/auth/authSlice';

interface IFormInput {
	email: string | null;
	password: string;
	remember: boolean;
}

let currentOtpIndex: number;

export function useSecretKeyFormController() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const email = useAppSelector((state: RootState) => state.auth.email);

	useEffect(() => {
		if (email === '') {
			router.push('/auth');
		}
	}, [email, router]);

	const [isLoading, setIsLoading] = useState(false);

	//логика таймера на 1 минуту
	const [retrySeconds, setRetrySeconds] = useState<number>(60);

	useEffect(() => {
		const timerId = setInterval(() => {
			setRetrySeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
		}, 1000);
		return () => clearInterval(timerId);
	}, [retrySeconds]);

	//логика таймера на 3 неправильных ввода
	const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
	const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

	// Отсчет таймера
	useEffect(() => {
		if (timerSeconds !== null) {
			setInputsDisabled(true);
			const timerId = setInterval(() => {
				setTimerSeconds((seconds) => (seconds !== null && seconds > 0 ? seconds - 1 : null));
			}, 1000);
			return () => clearInterval(timerId);
		} else {
			setInputsDisabled(false);
		}
	}, [timerSeconds]);

	const sendNewCode = async (userData: IFormInput) => {
		setIsLoading(true);
		const host = process.env.NEXT_PUBLIC_HTTP_SERVICE_URL;
		const url = `${host}/auth/login`;
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify(userData),
		};

		try {
			await fetch(url, options);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
		setRetrySeconds(60);
		setTimerSeconds(null);
		setInputsDisabled(false);
		setServerError(false);
		setIsLoading(false);
	};
	// логика инпутов
	const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
	const [otpIndex, setOtpIndex] = useState<number>(0);
	const [serverError, setServerError] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleOnChange: ChangeHandler<string> = (args): void => {
		setServerError(false);
		let { value } = args;

		if (value) {
			if (!/^\d+$/.test(value)) return;

			if (value.length >= 4) {
				value = value.substring(0, 4);
				const newOTP = value.split('');
				setOtp(newOTP);
				setOtpIndex(3);
			} else {
				const newOTP: string[] = [...otp];
				newOTP[currentOtpIndex] = value.substring(value.length - 1);
				setOtpIndex(currentOtpIndex + 1);
				setOtp(newOTP);
			}
		} else {
			// случай для удаления
			const newOTP: string[] = [...otp];
			newOTP[currentOtpIndex] = '';
			setOtp(newOTP);
			setOtpIndex(Math.max(0, currentOtpIndex - 1));
		}
	};

	const handleOnKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		currentOtpIndex = index;
		if (key === 'Backspace') {
			setOtpIndex(currentOtpIndex - 1);
		}
	};

	const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const keyCode = e.code;
		if (keyCode === ('KeyE' || 'NumpadAdd' || 'NumpadSubtract' || 'Minus' || 'Equal')) e.preventDefault();
		if (otp.join('').length === 4) {
			if (keyCode !== 'Backspace') {
				e.preventDefault();
			}
		}
	};
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [otpIndex]);

	useEffect(() => {
		if (otp.join('').length === 4) {
			setIsLoading(true);
			const host = process.env.NEXT_PUBLIC_HTTP_SERVICE_URL;
			const url = `${host}/auth/submit-login`;
			const body = JSON.stringify({
				email,
				code: otp.join(''),
			});
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body,
			};
			fetch(url, options)
				.then((response) => response.json())
				.then((data) => {
					if (data.message.includes('Вы успешно')) {
						dispatch(setToken(data));
						router.push('/');
					}
					if (data.message.includes('Введен неверный код')) {
						setServerError(true);
						setIsLoading(false);
					}
					if (data.message.includes('Ввод кода будет доступен')) {
						//запустить таймер на 5 минут, отобразить обратный отсчет
						setTimerSeconds(5 * 60);
						setOtp(new Array(4).fill(''));
						setRetrySeconds(0);
						setIsLoading(false);
					}
				})
				// eslint-disable-next-line no-console
				.catch((error) => console.error(error));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [otp]);

	return {
		otp,
		otpIndex,
		inputRef,
		timerSeconds,
		inputsDisabled,
		handleOnChange,
		handleOnKeyDown,
		handleOnKeyPress,
		router,
		email,
		serverError,
		retrySeconds,
		isLoading,
		sendNewCode,
	};
}
