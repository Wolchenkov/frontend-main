import { useState, useEffect } from 'react';
import { isWithinInterval, isSameDay, addDays } from 'date-fns';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useToggle } from 'reshaped/bundle';
import { useGetTimeRecordsQuery } from '../../store/projects/projectsApi';
import { useAppDispatch } from '../../store';
import { setActiveTask } from '../../store/tasks/tasksSlice';
import { clearCheckedTimeRecords } from '../../store/time/timeSlice';

const TABLE_COLUMNS = [
	{
		id: 'project_issue_name',
		name: 'Задача',
	},
	{
		id: 'user',
		name: 'Исполнитель',
		filter: true,
	},
	{
		id: 'type_work_name',
		name: 'Тип работ',
		filter: true,
	},
	{
		id: 'project_issue_estimate',
		name: 'Оценка',
		filter: true,
	},
	{
		id: 'project_issue_time_amount',
		name: 'Отмечено',
		filter: true,
	},
	{
		id: 'time_amount',
		name: 'Проверка',
	},
	{
		id: 'comment',
	},
	{
		id: 'action_buttons',
	},
];

interface IProjectTimeTableControllerProps {
	activateTaskModal: () => void;
}

export const useProjectTimeTableController = ({ activateTaskModal }: IProjectTimeTableControllerProps) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { slug: projectSlug } = router.query;
	const { data: response } = useGetTimeRecordsQuery(typeof projectSlug === 'string' ? projectSlug : skipToken);

	const groupByDate =
		response && response.data.length > 0
			? [...response.data]
					.sort((a, b) => {
						return +a.is_approved - +b.is_approved || +a.has_comment - +b.has_comment || +b.is_changed - +a.is_changed;
					})
					.reduce((groups: { [key: string]: ITimeRecord[] }, timeRecord) => {
						const { record_date } = timeRecord;
						groups[record_date] = groups[record_date] ?? [];
						groups[record_date].push({ ...timeRecord });
						return groups;
					}, {})
			: {};

	const convertToArray = Object.keys(groupByDate)
		.map((date) => {
			return {
				date: Date.parse(date),
				timeRecords: groupByDate[date],
			};
		})
		.sort((a, b) => b.date - a.date);

	const tableFilterOptions = TABLE_COLUMNS.filter((column) => column.filter);
	const [checkedColumnOptions, setCheckedColumnOptions] = useState(tableFilterOptions.map((column) => column.id));
	const [projectIssue, setProjectIssue] = useState({} as { name: string; id: number });
	const [timeRecordId, setTimeRecordId] = useState(0);
	const [userId, setUserId] = useState(0);
	const [userFilter, setUserFilter] = useState<{ id: number; avatar: string; name: string } | null>(null);
	const [dateFilter, setDateFilter] = useState<{ start: Date | null; end: Date | null }>({
		start: null,
		end: null,
	});
	const [showApproved, setShowApproved] = useState(false);
	const [timeRecordsGroups, setTimeRecordsGroups] = useState<
		{ date: number; timeRecords: ITimeRecord[] }[] | undefined
	>();

	const {
		active: activeModalAddTimeComment,
		activate: activateModalAddTimeComment,
		deactivate: deactivateModalAddTimeComment,
	} = useToggle(false);

	useEffect(() => {
		dispatch(clearCheckedTimeRecords());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.slug]);

	useEffect(() => {
		if (response?.data) {
			setTimeRecordsGroups(convertToArray.filter((group) => countTimeRecords(group) > 0));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userFilter, dateFilter, showApproved, response?.data]);

	const onIssueClick = (id: number) => {
		activateTaskModal();
		dispatch(setActiveTask(id));
		// Создание нового объекта query, чтобы не мутировать существующий
		const newQuery = { ...router.query, modal: id };

		router.push({
			pathname: router.pathname,
			query: newQuery,
		});
	};

	const openTimeCommentModal = (
		projectIssueName: string,
		projectIssueId: number,
		timeRecordId: number,
		userId: number
	) => {
		setProjectIssue({ name: projectIssueName, id: projectIssueId });
		setTimeRecordId(timeRecordId);
		setUserId(userId);
		activateModalAddTimeComment();
	};

	const countTimeRecords = (group: { date: number; timeRecords: ITimeRecord[] }) => {
		let arr = [...group.timeRecords];
		if (!showApproved) {
			arr = arr.filter((timeRecord) => !timeRecord.is_approved);
		}
		if (userFilter) {
			arr = arr.filter((timeRecord) => timeRecord.user.id === userFilter.id);
		}
		if (dateFilter.start && dateFilter.end) {
			arr = arr.filter(
				(timeRecord) =>
					isWithinInterval(new Date(timeRecord.record_date), {
						start: dateFilter.start ?? 0,
						end: dateFilter.end ? addDays(dateFilter.end, 1) : 0,
					}) || isSameDay(new Date(timeRecord.record_date), dateFilter.start ?? 0)
			);
		}
		return arr.length;
	};

	return {
		timeRecords: response?.data,
		timeRecordsGroups,
		onIssueClick,
		openTimeCommentModal,
		activeModalAddTimeComment,
		deactivateModalAddTimeComment,
		projectIssue,
		timeRecordId,
		userId,
		userFilter,
		setUserFilter,
		showApproved,
		setShowApproved,
		dateFilter,
		setDateFilter,
		tableFilterOptions,
		checkedColumnOptions,
		setCheckedColumnOptions,
		TABLE_COLUMNS,
	};
};
