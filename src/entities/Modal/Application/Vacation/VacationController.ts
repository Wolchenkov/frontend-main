/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useToggle } from 'reshaped/bundle';

interface IVacationControllerProps {
	onChange: (fieldName: keyof INewApplication, fieldValue: INewApplication[keyof INewApplication]) => void;
}

export function useVacationController({ onChange }: IVacationControllerProps) {
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [selectedOption, setSelectedOption] = useState<fetchingDictionaryVacation | undefined>();

	useEffect(() => {
		if (selectedOption === undefined) return;
		onChange('dictionary_type_vacation_id', selectedOption.id);
	}, [selectedOption]);

	const handleVacationButtonClick = () => {
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleModalClose = () => {
		deactivateDropdown();
	};

	return {
		isDropdownActive,
		selectedOption,
		handleVacationButtonClick,
		handleModalClose,
		setSelectedOption,
	};
}
