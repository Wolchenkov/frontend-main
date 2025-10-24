import { useEffect } from 'react';
import { useToggle } from 'reshaped/bundle';

interface IAddUser {
	email: string;
	role: number;
	team: number;
	position: number;
	editMode: boolean;
	id: number;
	error: string;
}
interface IErrors {
	id: number;
	error: string;
}
interface ILabelledValue {
	label: string;
	id: number;
	value: string;
}
export function useAddUserInputController(
	mode: string | boolean,
	isClientTeam: boolean,
	setAddUsers: React.Dispatch<React.SetStateAction<IAddUser[]>>,
	setErrorMessage: React.Dispatch<React.SetStateAction<IErrors[]>>,
	errorMessage: IErrors[],
	id: number,
	teamsWithLabels: ILabelledValue[] | undefined,
	rolesWithLabels: ILabelledValue[] | undefined
) {
	const myErrorMessage = errorMessage.find((error) => error.id === id)?.error;

	useEffect(() => {
		if (mode) {
			setAddUsers((prev) => [
				...prev.map((user) => {
					if (user.id === id) {
						return { ...user, team: teamsWithLabels?.find((el) => el.value === mode)?.id || 0 };
					} else {
						return user;
					}
				}),
			]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	useEffect(() => {
		if (isClientTeam)
			setAddUsers((prev) => [
				...prev.map((user) => {
					if (user.id === id) {
						return { ...user, role: rolesWithLabels?.find((el) => el.value === 'client')?.id || 0 };
					} else {
						return user;
					}
				}),
			]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isClientTeam]);

	const {
		active: activeModalDeleteRow,
		activate: activateModalDeleteRow,
		deactivate: deactivateModalDeleteRow,
	} = useToggle(false); //  модалкa удаления строчки

	const confirmDelete = () => {
		setAddUsers((prev) =>
			prev.length === 1
				? [
						{
							email: '',
							role: 0,
							team: 0,
							position: isClientTeam ? 1 : 0,
							editMode: true,
							id: Math.max(...prev.map((el) => el.id)) + 1,
							error: '',
						},
				  ]
				: [...prev.slice(0, -1)]
		);
		setErrorMessage((prev) => [
			...prev.map((error) => {
				if (error.id === id) {
					return { ...error, message: '' };
				} else {
					return error;
				}
			}),
		]);
		deactivateModalDeleteRow();
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setAddUsers((prev) => [
			...prev.map((user) => {
				if (user.id === id) {
					return { ...user, email: e.target.value };
				} else {
					return user;
				}
			}),
		]);
	};
	return {
		handleOnChange,
		activeModalDeleteRow,
		activateModalDeleteRow,
		deactivateModalDeleteRow,
		confirmDelete,
		myErrorMessage,
	};
}
