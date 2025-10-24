import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyGetMoreHistoryQuery } from '../../../store/history/historyApi';
type Action = {
	verb: string;
	svg: string;
	link?: (action: HistoryDataItem) => {
		href: string;
		name: string;
	};
	additionalText?: (action: HistoryDataItem) => string;
};

type Actions = {
	[K in ActionTypes]: Action;
};
interface IHistoryProps {
	history: IHistory | undefined;
	setHistoryData: React.Dispatch<React.SetStateAction<IHistory | undefined>>;
}

export const useHistoryController = ({ setHistoryData, history }: IHistoryProps) => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const host = process.env.NEXT_PUBLIC_URL;
	const projectLink = host + '/project/' + projectSlug;
	const taskLink = (id: number) => {
		return projectLink + '?modal=' + id;
	};

	const containerRef = useRef<HTMLDivElement>(null);

	const [getMoreHistory, { data: moreHistoryData }] = useLazyGetMoreHistoryQuery();
	const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	if (moreHistoryData) {
	// 		setHistoryData((prev) => ({
	// 			...prev,
	// 			data: { ...prev?.data, ...moreHistoryData?.data },
	// 			next: moreHistoryData.next,
	// 			prev: moreHistoryData.prev,
	// 		}));
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [moreHistoryData]);

	useEffect(() => {
		if (moreHistoryData) {
			setHistoryData((prev) => {
				const updatedData = { ...prev?.data };
				for (const [date, items] of Object.entries(moreHistoryData?.data)) {
					if (updatedData[date]) {
						updatedData[date] = [...updatedData[date], ...items];
					} else {
						updatedData[date] = items;
					}
				}
				return {
					...prev,
					data: updatedData,
					next: moreHistoryData.next,
					prev: moreHistoryData.prev,
				};
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moreHistoryData]);

	useEffect(() => {
		const handleScroll = (e: any) => {
			const container = e.target;
			if (container.scrollHeight - container.scrollTop < container.clientHeight + 13 && history?.next) {
				setIsLoading(true);
				getMoreHistory(history?.next).then(() => setIsLoading(false));
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
			return () => container.removeEventListener('scroll', handleScroll);
		}
	}, [getMoreHistory, history?.next]);

	const actions: Actions = {
		Created_task: {
			verb: ' создал(а) задачу ',
			svg: 'history-task-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Assigned_task: {
			verb: ' назначил(а) задачу ',
			svg: 'history-task-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
			additionalText: (action: HistoryDataItem) => ' на ' + action.text.targetUser.name,
		},
		Reassigned_the_task: {
			verb: ' переназначил(а) задачу ',
			svg: 'history-task-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
			additionalText: (action: HistoryDataItem) => ' на ' + action.text.targetUser.name,
		},
		Moved_the_task_to: {
			verb: ' переместил(а) задачу ',
			svg: 'history-list-unordered',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }), // название канбан доски
			additionalText: (action: HistoryDataItem) => ' в ' + action.text?.kanban,
		},
		Left_a_comment_on_the_task: {
			verb: ' оставил(а) комментарий к задаче ',
			svg: 'history-chat-2-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Added_priority_to_the_task: {
			verb: ' добавил(а) приоритет к задаче ',
			svg: 'history-alert-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Changed_the_priority_of_the_task: {
			verb: ' изменил(а) приоритет задачи ',
			svg: 'history-alert-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Changed_the_start_date_of_the_task: {
			verb: ' изменил(а) дату начала задачи ',
			svg: 'history-calendar-check',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Completed_the_task: {
			verb: ' завершил(а) задачу ',
			svg: 'history-check-fill',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Deleted_the_task: {
			verb: ' удалил(а) задачу ',
			svg: 'history-close-fill',
		},
		Deleted_the_project: {
			verb: ' удалил(а) проект ',
			svg: 'history-close-fill',
		},
		Added_an_assessment_the_task: {
			verb: ' добавил(а) оценку к задаче ',
			svg: 'history-time-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Changed_the_task_time_forecast: {
			verb: ' изменил(а) оценку времени задачи ',
			svg: 'history-time-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Added_a_clock_to_the_task: {
			verb: ' добавил(а) часы к задаче ',
			svg: 'history-time-line',
			link: (action: HistoryDataItem) => ({ href: taskLink(action.text.issue.id), name: action.text.issue.name }),
		},
		Renamed_the_project: {
			verb: ' переименовал(а) проект ',
			svg: 'history-edit-2-line',
			link: (action: HistoryDataItem) => ({ href: projectLink, name: action.text.project.name }),
		},
		Created_a_project: {
			verb: ' создал(а) проект ',
			svg: 'history-folder-3-line',
			link: (action: HistoryDataItem) => ({ href: projectLink, name: action.text.project.name }),
		},
	};

	return { containerRef, projectLink, actions, isLoading };
};
