/* eslint-disable react-hooks/exhaustive-deps */
import { useToggle } from 'reshaped/bundle';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface ICalendarControllerProps {
	busyData: string[][];
	onChange: (fieldName: keyof INewApplication, fieldValue: INewApplication[keyof INewApplication]) => void;
}

export function useCalendarController({ busyData, onChange }: ICalendarControllerProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [buttonTitle, setButtonTitle] = useState(format(new Date(), 'dd.MM'));

	const [busyDates, setBusyDates] = useState<Date[]>();
	const [busyIntervals, setBusyIntervals] = useState<{ start: Date; end: Date }[]>();

	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const handleButtonClick = () => {
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const handleDocumentClick = () => {
		deactivateDropdown();
		setStartDate(null);
		setEndDate(null);
	};

	const handleDateChange = ([start, end]: [Date | null, Date | null]) => {
		setStartDate(start);
		setEndDate(end);
		if (start === null || end === null) return;
		deactivateDropdown();
	};

	useEffect(() => {
		if (startDate && endDate) {
			const start = format(startDate, 'dd.MM');
			const end = format(endDate, 'dd.MM');
			const newTitle = start === end ? start : `${start} - ${end}`;
			setButtonTitle(newTitle);
		}
	}, [endDate]);

	useEffect(() => {
		if (!busyData.length) return;

		const newBusyDates: Date[] = [];
		const newBusyIntervals: { start: Date; end: Date }[] = [];

		busyData.map(([startDate, endDate]) => {
			if (startDate === endDate) {
				newBusyDates.push(new Date(startDate));
			} else {
				const start = new Date(startDate);
				start.setDate(start.getDate() - 1);

				newBusyIntervals.push({ start, end: new Date(endDate) });
			}
		});
		setBusyDates(newBusyDates);
		setBusyIntervals(newBusyIntervals);
	}, [busyData]);

	useEffect(() => {
		if (startDate && endDate) {
			onChange('date_start', format(startDate, 'yyyy-MM-dd'));
			onChange('date_end', format(endDate, 'yyyy-MM-dd'));
		}
	}, [endDate]);

	return {
		isDropdownActive,
		startDate,
		endDate,
		buttonTitle,
		busyDates,
		busyIntervals,
		handleButtonClick,
		handleDocumentClick,
		handleDateChange,
	};
}
