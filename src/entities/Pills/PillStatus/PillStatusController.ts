/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, useRef } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useWindowDimensions } from '../../../shared/utility/Hooks';

export function usePillStatusController(
	name: string,
	statuses: fetchingDictionaryStatus[],
	onChange: (fieldName: string, fieldValue: number) => void,
	value?: number
): any {
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [options] = useState<fetchingDictionaryStatus[]>(statuses);
	const [selectedOption, setSelectedOption] = useState<fetchingDictionaryStatus | undefined>(
		value ? statuses.find(({ sort }) => sort === value) : options[0]
	);

	const { height } = useWindowDimensions();
	const pillRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedOption === undefined) return;
		onChange(name, selectedOption.sort);
	}, [selectedOption]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleModalClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	const dropDownMaxHeight = useMemo(() => {
		if (!pillRef.current || !height) return 'none';
		const { top: searchTopCoord, height: searchHeight } = pillRef.current.getBoundingClientRect();
		const maxHeight = height - searchTopCoord - searchHeight - 40;
		return `${maxHeight}px`;
	}, [height]);

	return {
		pillRef,
		isPillActive,
		isDropdownActive,
		options,
		selectedOption,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		setSelectedOption,
	};
}
