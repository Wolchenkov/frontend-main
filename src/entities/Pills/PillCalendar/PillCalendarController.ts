/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useToggle } from 'reshaped/bundle';
import { useWindowDimensions } from '../../../shared/utility/Hooks';
import { format } from 'date-fns';

export function usePillCalendarController(
	name: string,
	onChange: (fieldName: string, fieldValue: string | null) => void,
	setDateLimit?: Dispatch<SetStateAction<Date | undefined>>,
	value?: string | null
): any {
	const [isPillActive, setIsPillActive] = useState(false);
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const [date, setDate] = useState<Date | null>();

	const { height } = useWindowDimensions();
	const pillRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (date === undefined) return;
		onChange(name, date ? format(date, 'yyyy-MM-dd') : null);
	}, [date]);

	useEffect(() => {
		value === null ? setDate(null) : value && setDate(new Date(value));
		value && setDateLimit && setDateLimit(new Date(value));
	}, [value]);

	const handlePillButtonClick = () => {
		setIsPillActive(!isPillActive);
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleModalClose = () => {
		setIsPillActive(false);
		deactivateDropdown();
	};

	const handleDateChange = (newDate: Date | null): void => {
		const settedDate = Number(newDate) === Number(date) ? null : newDate;
		setDate(settedDate);
		if (setDateLimit) {
			setDateLimit(settedDate || undefined);
		}
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
