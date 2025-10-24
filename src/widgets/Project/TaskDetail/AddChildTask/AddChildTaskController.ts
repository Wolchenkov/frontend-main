import { useEffect, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useUpdateIssueMutation } from '../../../../store/projects/projectsApi';

interface AddChildTaskProps {
	refetchTaskData: any;
	taskState: ITaskDetail;
	tasksData: ITask[] | undefined;
	dataProject: IOneProject;
}

export const useAddChildTaskController = ({
	refetchTaskData,
	taskState,
	tasksData,
	dataProject,
}: AddChildTaskProps) => {
	const { slug: projectSlug } = dataProject;

	const { active: isActiveDropdown, activate: activateDropdown, deactivate: deactivateDropdown } = useToggle();
	const {
		active: isActiveTasksDropdown,
		activate: activateTasksDropdown,
		deactivate: deactivateTasksDropdown,
	} = useToggle();
	const {
		active: isActiveAddTaskModal,
		activate: activateAddTaskModal,
		deactivate: deactivateAddTaskModal,
	} = useToggle();

	const [filter, setFilter] = useState('');
	const [options, setOptions] = useState<ITask[]>([]);
	const [shownOptions, setShownOptions] = useState<ITask[]>(options);
	const [selectedOption, setSelectedOption] = useState<ITask | null>();

	const [updateIssue] = useUpdateIssueMutation();
	useEffect(() => {
		if (selectedOption?.id) {
			const body = { parent_id: taskState?.id };
			const payload = { projectSlug, body, projectIssueId: selectedOption?.id };
			updateIssue(payload).then(() => {
				refetchTaskData();
				deactivateDropdown();
				setSelectedOption(null);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

	useEffect(() => {
		const childIds = new Set(taskState?.children.map((child) => child.id));
		tasksData && setOptions(tasksData.filter((task) => task.id !== taskState?.id && !childIds.has(task.id)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasksData]);

	useEffect(() => {
		setShownOptions(options.filter((option) => option.name.toLowerCase().includes(filter.toLowerCase())));
	}, [filter, options]);

	return {
		isActiveDropdown,
		deactivateDropdown,
		activateDropdown,
		activateAddTaskModal,
		isActiveTasksDropdown,
		deactivateTasksDropdown,
		activateTasksDropdown,
		filter,
		setFilter,
		shownOptions,
		selectedOption,
		setSelectedOption,
		isActiveAddTaskModal,
		deactivateAddTaskModal,
	};
};
