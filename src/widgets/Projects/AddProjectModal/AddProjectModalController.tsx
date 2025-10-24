/* eslint-disable react-hooks/exhaustive-deps */
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import {
	useGetProjectStatusesQuery,
	useGetProjectManagersQuery,
	useGetProjectMembersQuery,
	useGetProjectClientsQuery,
	useGetProjectTypeWorkQuery,
	useGetCurrentProjectTypeWorkQuery,
} from '../../../store/dictionaries/dictionariesApi';
import { useGetGroupProjectsQuery } from '../../../store/groups/groupsApi';
import {
	useCreateProjectMutation,
	useUpdateMembersInProjectMutation,
	useUpdateProjectMutation,
} from '../../../store/projects/projectsApi';
import { useShowToast } from '../../../shared/utility/Hooks';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { isEqualArrays } from '../../../shared/utility/Utils';
import { useRouter } from 'next/router';

export function useAddProjectModalController(
	groupId: number,
	active: boolean,
	onClose: () => void,
	projectData?: IOneProject
): any {
	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const { data: currentProjects } = useGetGroupProjectsQuery(String(groupId) ?? skipToken);
	const { data: projectStatuses } = useGetProjectStatusesQuery();
	const { data: projectManagers } = useGetProjectManagersQuery();
	const { data: projectMembers } = useGetProjectMembersQuery();
	const { data: projectClients } = useGetProjectClientsQuery();
	const { data: projectTypeWork } = useGetProjectTypeWorkQuery();
	const { data: currentProjectTypeWork } = useGetCurrentProjectTypeWorkQuery(
		projectData && projectSlug && typeof projectSlug === 'string' ? projectSlug : skipToken
	);

	const [createProject] = useCreateProjectMutation();
	const [updateProject] = useUpdateProjectMutation();
	const [updateMembers] = useUpdateMembersInProjectMutation();

	const [minDate, setMinDate] = useState<Date | undefined>(undefined);
	const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
	const [projectName, setProjectName] = useState<string>('');
	const [isProjectNameValid, setIsProjectNameValid] = useState(false);
	const [isDataValid, setIsDataValid] = useState(false);
	const [newProject, setNewProject] = useState<INewProjectState>({} as INewProjectState);

	const addProjectNameInputRef = useRef<HTMLInputElement>(null);
	const showToast = useShowToast();

	const changeProjectData = (
		fieldName: keyof INewProjectState,
		fieldValue: INewProjectState[keyof INewProjectState]
	) => {
		setNewProject((prevState) => ({
			...prevState,
			[fieldName]: fieldValue,
		}));
	};

	const createNewProject = () => {
		createProject({ ...newProject, group_id: groupId })
			.unwrap()
			.then(() => {
				showToast('Новый проект успешно создан');
				onClose();
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const updateCurrentProject = () => {
		const updatedProject: any = getUpdatedProjectData();
		const { members, ...restData } = updatedProject;

		if (members) {
			updateMembers({ projectSlug: projectData?.slug, body: { members } })
				.unwrap()
				.then(() => {
					showToast('Изменения внесены в проект');
					onClose();
				})
				.catch((error) => {
					showToast(`Ошибка! ${error?.data?.message}`);
				});
		}

		if (Object.keys(restData).length) {
			updateProject({ projectSlug: projectData?.slug, body: restData })
				.unwrap()
				.then(() => {
					showToast('Изменения внесены в проект');
					onClose();
					if (restData.slug) {
						router.push(`/project/${restData.slug}`);
					}
				})
				.catch((error) => {
					showToast(`Ошибка! ${error?.data?.message}`);
				});
		}
	};

	const getUpdatedProjectData = () => {
		let updatedProject = {};

		newProject.name &&
			isValidNewProjectName(newProject.name) &&
			newProject.name !== projectData?.name &&
			(updatedProject = { ...updatedProject, name: newProject.name });
		newProject.slug &&
			newProject.slug !== projectData?.slug &&
			(updatedProject = { ...updatedProject, slug: newProject.slug });
		newProject.project_status_id &&
			String(newProject.project_status_id) !== String(projectData?.project_status_id) &&
			(updatedProject = { ...updatedProject, project_status_id: newProject.project_status_id });
		newProject.manager_id &&
			newProject.manager_id !== projectData?.manager_id &&
			(updatedProject = { ...updatedProject, manager_id: newProject.manager_id });
		newProject.members &&
			!isEqualArrays(
				newProject.members,
				projectData?.usersMember?.map(({ id }) => id)
			) &&
			(updatedProject = { ...updatedProject, members: newProject.members });

		newProject.date_start !== projectData?.date_start &&
			(updatedProject = { ...updatedProject, date_start: newProject.date_start });

		newProject.date_end !== projectData?.date_end &&
			(updatedProject = { ...updatedProject, date_end: newProject.date_end });
		newProject.client_id &&
			newProject.client_id !== projectData?.client_id &&
			(updatedProject = { ...updatedProject, client_id: newProject.client_id });

		newProject.budget &&
			Object.keys(newProject.budget).length &&
			(newProject.budget.type !== projectData?.budget_type ||
				(newProject.budget.type === 'fixed' && newProject.budget.amount !== projectData?.budget_amount) ||
				(newProject.budget.type !== 'not_billable' &&
					!isEqualArrays(
						newProject.budget?.type_work?.map(({ cost }) => cost),
						currentProjectTypeWork?.map(({ cost }) => cost)
					))) &&
			(updatedProject = { ...updatedProject, budget: newProject.budget });

		return updatedProject;
	};

	const isValidNewProjectName = (newProjectName: string) =>
		!!projectData || !currentProjects?.projects.map(({ name }: any) => name).includes(newProjectName);

	const validateNewProjectData = () => {
		let isValid;
		newProject.name &&
		isValidNewProjectName(newProject.name) &&
		newProject.slug &&
		newProject.manager_id &&
		String(newProject.project_status_id)
			? (isValid = true)
			: (isValid = false);

		return isValid;
	};

	const validateUpdatedProjectData = () => {
		let isValid;
		(newProject.name && isValidNewProjectName(newProject.name) && newProject.name !== projectData?.name) ||
		newProject.slug !== projectData?.slug ||
		String(newProject.project_status_id) !== String(projectData?.project_status_id) ||
		newProject.manager_id !== projectData?.manager_id ||
		(newProject.members &&
			!isEqualArrays(
				newProject.members,
				projectData?.usersMember?.map(({ id }) => id)
			)) ||
		newProject.date_start !== projectData?.date_start ||
		newProject.date_end !== projectData?.date_end ||
		(newProject.client_id && newProject.client_id !== projectData?.client_id) ||
		(newProject.budget &&
			Object.keys(newProject.budget).length &&
			(newProject.budget.type !== projectData?.budget_type ||
				(newProject.budget.type === 'fixed' && newProject.budget.amount !== projectData?.budget_amount) ||
				(newProject.budget.type !== 'not_billable' &&
					!isEqualArrays(
						newProject.budget?.type_work?.map(({ cost }) => cost),
						currentProjectTypeWork?.map(({ cost }) => cost)
					))))
			? (isValid = true)
			: (isValid = false);

		return isValid;
	};

	const handleProjectSlugKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		const regex = /^[A-Za-z0-9\-_]*$/;
		if (!event.key.match(regex)) {
			event.preventDefault();
		}
	};

	const transformProjectSlug = (slug: string) => slug.toUpperCase().slice(0, 20);

	useEffect(() => {
		projectData ? setIsDataValid(validateUpdatedProjectData()) : setIsDataValid(validateNewProjectData());
	}, [newProject]);

	useEffect(() => {
		changeProjectData('name', projectName.trim());
	}, [projectName]);

	useEffect(() => {
		setIsProjectNameValid(isValidNewProjectName(newProject.name));
	}, [newProject?.name]);

	useEffect(() => {
		projectData && setProjectName(projectData.name);
	}, [projectData]);

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				addProjectNameInputRef.current?.focus();
			}, 100);
		}
	}, [active]);

	return {
		projectStatuses,
		projectManagers,
		projectMembers,
		projectClients,
		projectTypeWork,
		currentProjectTypeWork,
		minDate,
		maxDate,
		addProjectNameInputRef,
		isDataValid,
		projectName,
		isProjectNameValid,
		setMinDate,
		setMaxDate,
		changeProjectData,
		createNewProject,
		updateCurrentProject,
		handleProjectSlugKeyPress,
		setProjectName,
		transformProjectSlug,
	};
}
