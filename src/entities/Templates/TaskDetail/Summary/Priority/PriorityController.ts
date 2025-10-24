import { useChangePriorityProjectIssueMutation } from '../../../../../store/projects/projectsApi';
import { useGetIssuePrioritiesQuery } from '../../../../../store/dictionaries/dictionariesApi';
import { useShowToast } from '../../../../../shared/utility/Hooks';
import { useToggle } from 'reshaped/bundle';

interface IPriorityControllerProps {
	taskState: ITaskDetail;
	refetchTaskData: any;
	dataProject: IOneProject;
}
export const usePriorityController = ({ taskState, refetchTaskData, dataProject }: IPriorityControllerProps) => {
	const showToast = useShowToast();
	const { active, activate, deactivate } = useToggle();

	const [changePriorityIssue] = useChangePriorityProjectIssueMutation();

	const { data: priorities = [] } = useGetIssuePrioritiesQuery();
	const handleChangePriorityIssue = (priorityId: number) => {
		changePriorityIssue({
			project: dataProject.slug,
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
