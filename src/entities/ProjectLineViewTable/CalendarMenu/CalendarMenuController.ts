import router from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useToggle } from 'reshaped/bundle';
import { useUpdateProjectIssueMutation } from '../../../store/projects/projectsApi';
import { format } from 'date-fns';
import { SyntheticEvent, useEffect, useState } from 'react';

export function useCalendarMenuController(
	issueId: number,
	date?: string | null,
	minDate?: string,
	refetchTaskData?: any,
	projectSlugData?: string
): any {
	const { slug: projectSlug } = router.query;
	const { active: isDropdownActive, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle(false);

	const showToast = useShowToast();

	const handleButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		isDropdownActive ? deactivateDropdown() : activateDropdown();
	};

	const [changeIssueDeadline] = useUpdateProjectIssueMutation();

	const [startDate, setStartDate] = useState<Date | null>(minDate ? new Date(minDate) : null);
	const [endDate, setEndDate] = useState<Date | null>(date ? new Date(date) : null);

	useEffect(() => {
		setEndDate(date ? new Date(date) : null);
	}, [date]);

	const isDateExpired = () => {
		const today = new Date().setHours(0, 0, 0, 0);
		const currentDate = endDate?.setHours(0, 0, 0, 0);

		return date && today > (currentDate || 0);
	};

	const handleDocumentClick = () => {
		deactivateDropdown();
		setEndDate((prev) => {
			if (prev === null) {
				setStartDate(minDate ? new Date(minDate) : null);
				return date ? new Date(date) : null;
			}
			return prev;
		});
	};

	const handleDateChange = (dates: [Date | null, Date | null], event: SyntheticEvent<any, Event> | undefined) => {
		event?.stopPropagation();

		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);

		if (start === null || end === null) {
			return;
		}

		const settedDates = {
			date_start: format(start as Date, 'yyyy-MM-dd'),
			deadline: format(end, 'yyyy-MM-dd'),
		};

		changeIssueDeadline({
			project: projectSlugData ?? (projectSlug as string),
			projectIssue: issueId,
			body: settedDates,
		})
			.unwrap()
			.then(() => {
				refetchTaskData && refetchTaskData();
				showToast('Дата окончания задачи изменена');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
		deactivateDropdown();
	};

	return {
		isDropdownActive,
		startDate,
		endDate,
		isDateExpired,
		deactivateDropdown,
		handleButtonClick,
		handleDateChange,
		handleDocumentClick,
	};
}
