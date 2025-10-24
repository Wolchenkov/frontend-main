/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { getSortedPersonOptions } from '../../../shared/utility/Utils';
import { useWindowDimensions } from '../../../shared/utility/Hooks';

export function usePillMultiPersonController(
	name: string,
	members: IMember[],
	onChange: (fieldName: string, fieldValue: number[]) => void,
	value?: IMember[]
): any {
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [options, setOptions] = useState<IMember[]>(getSortedPersonOptions(members));
	const [shownOptions, setShownOptions] = useState<IMember[]>(options);
	const [selectedOptions, setSelectedOptions] = useState<IMember[]>([]);
	const [filter, setFilter] = useState('');

	const { height } = useWindowDimensions();
	const pillRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!selectedOptions.length) return;
		onChange(
			name,
			selectedOptions.map(({ id }) => id)
		);
	}, [selectedOptions]);

	useEffect(() => {
		value && setSelectedOptions(value);
		value && setOptions(getSortedPersonOptions(options, selectedOptions, 'selected'));
	}, [value]);

	useEffect(() => {
		setShownOptions(options.filter((option) => option.name.toLowerCase().includes(filter.toLowerCase())));
	}, [filter, options]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
		selectedOptions.length
			? setOptions(getSortedPersonOptions(options, selectedOptions, 'selected'))
			: setOptions(getSortedPersonOptions(options));
		setShownOptions(options);
		setFilter('');
	};

	const handleModalClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	const handleOptionClick = (member: IMember) => {
		activateDropdown();
		setIsPillActive(true);
		const isAlreadySelected = selectedOptions.some((selected) => selected.id === member.id);
		if (isAlreadySelected) {
			setSelectedOptions(selectedOptions.filter((selected) => selected.id !== member.id));
		} else {
			setSelectedOptions([...selectedOptions, member]);
		}
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
		filter,
		selectedOptions,
		shownOptions,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		handleOptionClick,
		setFilter,
		setSelectedOptions,
	};
}
