/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useGetVacationTypesQuery } from '../../../store/dictionaries/dictionariesApi';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useCreateApplicationMutation } from '../../../store/myWork/myWorkApi';

interface IApplicationControllerProps {
	closeModal: () => void;
}

export function useApplicationController({ closeModal }: IApplicationControllerProps) {
	const [comment, setComment] = useState<string | undefined>();
	const [newApplication, setNewApplication] = useState<INewApplication>({} as INewApplication);

	const showToast = useShowToast();

	const { data: vacationTypes } = useGetVacationTypesQuery();
	const [createApplication] = useCreateApplicationMutation();

	const changeApplicationData = (
		fieldName: keyof INewApplication,
		fieldValue: INewApplication[keyof INewApplication]
	) => {
		setNewApplication((prevState) => ({
			...prevState,
			[fieldName]: fieldValue,
		}));
	};

	const handleModalClose = () => {
		closeModal();
		setComment(undefined);
		setNewApplication({} as INewApplication);
	};

	useEffect(() => {
		if (comment === undefined) return;
		changeApplicationData('comment', comment);
	}, [comment]);

	const createNewApplication = () => {
		createApplication(newApplication)
			.unwrap()
			.then(() => {
				showToast('Заявление создано');
				closeModal();
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	return {
		vacationTypes,
		newApplication,
		comment,
		setComment,
		handleModalClose,
		changeApplicationData,
		createNewApplication,
	};
}
