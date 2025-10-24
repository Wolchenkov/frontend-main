import { useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { getSortedPersonOptions } from '../../../shared/utility/Utils';
import { useWindowDimensions } from '../../../shared/utility/Hooks';

export function usePillPersonController(
	members: IMember[],
	onChange: (fieldValue: INewProjectState[keyof INewProjectState]) => void
): any {
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [options, setOptions] = useState<IMember[]>([]);
	const [shownOptions, setShownOptions] = useState<IMember[]>(options);
	const [selectedOption, setSelectedOption] = useState<IMember>();
	const [filter, setFilter] = useState('');

	const { height } = useWindowDimensions();
	const pillRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedOption === undefined) return;
		onChange(selectedOption);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

	useEffect(() => {
		setOptions(getSortedPersonOptions(members));
	}, [members]);

	useEffect(() => {
		setShownOptions(options.filter((option) => option.name.toLowerCase().includes(filter.toLowerCase())));
	}, [filter, options]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
		selectedOption
			? setOptions(getSortedPersonOptions(options, [selectedOption], 'selected'))
			: setOptions(getSortedPersonOptions(options));
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
