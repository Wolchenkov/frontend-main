import { useUpdateIssueMutation } from '../../../../../store/projects/projectsApi';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	refetchTaskData: any;
	dataProject: IOneProject;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
}

export const usePeriodController = ({ taskState, refetchTaskData, dataProject, setTaskState }: ITaskSummaryProps) => {
	const { slug: projectSlug } = dataProject;

	const [updateIssue] = useUpdateIssueMutation();

	const formatDateToLocale = (date: string | undefined | null): string | null =>
		date ? new Date(date).toLocaleString('ru-RU').slice(0, 10) : null;

	const formatNewDate = (date: string | undefined | null): string | null => {
		if (!date) return null;
		const [year, month, day] = date.split('-');
		return `${day}.${month}.${year}`;
	};

	function formatDate(date: string | null) {
		if (!date) return null;
		const dateParts = date.split('.');
		return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
	}

	const changeDate = (date: { date_start?: [string | null, string | null] | null }) => {
		const newStart = formatDateToLocale(date.date_start?.[0]);
		const newDeadline = formatDateToLocale(date.date_start?.[1]);

		const oldStart = formatNewDate(taskState.date_start);
		const oldDeadline = formatNewDate(taskState.deadline);

		if (newStart !== oldStart || newDeadline !== oldDeadline) {
			setTaskState((prev) => {
				if (prev) {
					return {
						...prev,
						date_start: formatDate(newStart),
						deadline: formatDate(!newDeadline ? newStart : newDeadline),
					};
				} else return prev;
			});

			const payload = {
				projectSlug,
				body: {
					date_start: formatDate(newStart),
					deadline: formatDate(!newDeadline ? newStart : newDeadline),
				},
				projectIssueId: taskState.id,
			};

			updateIssue(payload).then(() => {
				refetchTaskData();
			});
		}
	};
	return { changeDate };
};
