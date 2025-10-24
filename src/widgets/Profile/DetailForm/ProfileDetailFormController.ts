import { useEffect, useState } from 'react';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useChangeUserInfoMutation } from '../../../store/auth/authApi';

type InputValuesType = {
	[key: string]: string;
	firstName: string;
	lastName: string;
	email: string;
	telegram: string;
	role: string;
	team: string;
};
interface BodyType {
	first_name?: string;
	last_name?: string;
	email?: string;
	telegram?: string;
}
interface IProfileDetailForm {
	user: IMember | undefined;
	refetch: any;
}

export const useProfileDetailFormController = ({ user, refetch }: IProfileDetailForm) => {
	const showToast = useShowToast();
	const [inputValues, setInputValues] = useState<InputValuesType>({
		firstName: '',
		lastName: '',
		email: '',
		telegram: '',
		role: '',
		team: '',
	});
	const [errors, setErrors] = useState({ firstName: false, lastName: false, email: false, telegram: false });

	useEffect(() => {
		user &&
			setInputValues({
				firstName: user.first_name,
				lastName: user.last_name,
				email: user.email,
				telegram: user.telegram ?? '',
				role: user.role?.label ?? '',
				team: user.team,
			});
		setErrors({ firstName: false, lastName: false, email: false, telegram: false });
	}, [user]);

	function hasChanges() {
		if (!user) return false;
		return (
			user.first_name !== inputValues.firstName ||
			user.last_name !== inputValues.lastName ||
			user.email !== inputValues.email ||
			(user.telegram !== inputValues.telegram && !(user.telegram === null && inputValues.telegram === '')) ||
			user.role?.label !== inputValues.role ||
			user.team !== inputValues.team
		);
	}

	function validateField(fieldName: string, value: string) {
		if (value.includes(' ')) return false;
		switch (fieldName) {
			case 'firstName':
			case 'lastName':
				return /^[а-яА-ЯёЁ]+$/.test(value);
			case 'email':
				return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
			case 'telegram':
				if (value === '') return true; // Пустая строка допустима для telegram
				return /^[a-zA-Z\d@_!%$*~()#^`&?<>\-+=_{}\\[\]]+$/.test(value); // Разрешены символы латиницы, цифры и точки
			default:
				return true;
		}
	}

	function onChangeValues(name: string, value: string) {
		setErrors({ ...errors, [name]: !validateField(name, value) });
		setInputValues((prev) => ({ ...prev, [name]: value }));
	}

	const [changeUserInfo] = useChangeUserInfoMutation();
	const handleSubmitChanges = () => {
		if (!user) return;
		const fieldsMapping: Record<string, string> = {
			first_name: 'firstName',
			last_name: 'lastName',
			email: 'email',
			telegram: 'telegram',
		};
		const body: BodyType = Object.entries(fieldsMapping)
			.filter(([userField, inputField]) => user[userField] !== inputValues[inputField])
			.reduce((acc, [userField, inputField]) => {
				const value = inputValues[inputField];
				return { ...acc, [userField]: value === '' ? null : value };
			}, {});

		if (Object.keys(body).length > 0) {
			changeUserInfo({ body })
				.then(() => {
					refetch();
					showToast('Данные успешно обновились');
				})
				.catch(() => {
					showToast('Ошибка!');
				});
		}
	};
	return { errors, inputValues, onChangeValues, hasChanges, handleSubmitChanges };
};
