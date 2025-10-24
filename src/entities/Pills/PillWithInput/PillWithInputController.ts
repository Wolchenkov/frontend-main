/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useCheckProjectSlugMutation } from '../../../store/projects/projectsApi';

export function usePillWithInputController(
	title: string,
	name: string,
	onChange: (fieldName: string, fieldValue: string) => void,
	value?: string
): any {
	const [isPillActive, setIsPillActive] = useState(false);
	const [pillTitle, setPillTitle] = useState(value ? value : title);
	const [inputValue, setInputValue] = useState('');
	const [isInputValueValid, setIsInputValueValid] = useState(true);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [checkProjectSlug] = useCheckProjectSlugMutation();

	useEffect(() => {
		if (pillTitle === title) return;
		onChange(name, pillTitle);
	}, [pillTitle]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleModalClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	const handleConfirmButtonClick = () => {
		checkProjectSlug({ slug: inputValue })
			.unwrap()
			.then(() => {
				setIsInputValueValid(true);
				setIsPillActive(false);
				deactivateDropdown();
				setPillTitle(inputValue);
				setInputValue('');
			})
			.catch(() => {
				setIsInputValueValid(false);
			});
	};

	return {
		isPillActive,
		isDropdownActive,
		pillTitle,
		inputValue,
		isInputValueValid,
		handlePillButtonClick,
		handleModalClose,
		handleConfirmButtonClick,
		setInputValue,
	};
}
