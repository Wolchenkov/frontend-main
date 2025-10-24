/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { getSortedClientOptions } from '../../../shared/utility/Utils';
import { useWindowDimensions } from '../../../shared/utility/Hooks';

export function usePillClientController(
	name: string,
	members: fetchingDictionaryClient[],
	onChange: (fieldName: string, fieldValue: number | undefined) => void,
	value?: number
): any {
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [options, setOptions] = useState<fetchingDictionaryClient[]>([]);
	const [shownOptions, setShownOptions] = useState<fetchingDictionaryClient[]>(options);
	const [selectedOption, setSelectedOption] = useState<fetchingDictionaryClient | undefined>(
		value ? members.find(({ id }) => id === value) : undefined
	);
	const [filter, setFilter] = useState('');

	const { height } = useWindowDimensions();
	const pillRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		onChange(name, selectedOption?.id ?? undefined);
	}, [selectedOption]);

	useEffect(() => {
		setOptions(getSortedClientOptions(members));
	}, [members]);

	useEffect(() => {
		setShownOptions(options.filter((option) => option.value.toLowerCase().includes(filter.toLowerCase())));
	}, [filter, options]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
		selectedOption
			? setOptions(getSortedClientOptions(options, [selectedOption], 'selected'))
			: setOptions(getSortedClientOptions(options));
		setShownOptions(options);
		setFilter('');
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
		filter,
		selectedOption,
		shownOptions,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		setFilter,
		setSelectedOption,
	};
}
