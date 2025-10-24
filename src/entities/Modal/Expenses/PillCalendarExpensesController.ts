import { useEffect, useMemo, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useToggle } from 'reshaped/bundle';
import { useWindowDimensions } from '../../../shared/utility/Hooks';

export function usePillCalendarExpensesController(
	onChange: (fieldValue: INewProjectState[keyof INewProjectState]) => void,
	selectedDate: number | string | undefined
): any {
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [date, setDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);

	const { height } = useWindowDimensions();
	const pillRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (date === null) return;
		onChange(date.toJSON());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	const handlePillButtonClick = (e: MouseEvent) => {
		e.stopPropagation();
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleModalClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	const handleDateChange = (newDate: Date | null): void => {
		// const settedDate = Number(newDate) === Number(date) ? null : newDate;
		setDate(newDate);
		handleModalClose();
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
		date,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		handleDateChange,
	};
}
