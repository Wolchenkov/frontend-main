import { useChangePriorityProjectIssueMutation } from '../../../../../store/projects/projectsApi';
import { useRouter } from 'next/router';
import { useGetIssuePrioritiesQuery } from '../../../../../store/dictionaries/dictionariesApi';
import { useShowToast } from '../../../../../shared/utility/Hooks';
import { useToggle } from 'reshaped/bundle';
interface ITaskSummaryProps {
	taskState: ITaskDetail;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	refetchTaskData: any;
	projectSlugData?: string;
}
export const usePriorityController = ({
	taskState,
	setTaskState,
	refetchTaskData,
	projectSlugData,
}: ITaskSummaryProps) => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const showToast = useShowToast();
	const { active, activate, deactivate } = useToggle();

	const [changePriorityIssue] = useChangePriorityProjectIssueMutation();

	const { data: priorities = [] } = useGetIssuePrioritiesQuery();
	const handleChangePriorityIssue = (priorityId: number) => {
		setTaskState((prev) => {
			if (prev) {
				return {
					...prev,
					priority: priorities.find((p) => p.id === priorityId) || null,
				};
			} else return prev;
		});

		changePriorityIssue({
			project: projectSlugData ?? (projectSlug as string),
			projectIssue: taskState.id,
			body: { project_issue_priority_id: priorityId },
		})
			.unwrap()
			.then(() => {
				refetchTaskData();
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	return { priorities, handleChangePriorityIssue, active, activate, deactivate };
};
