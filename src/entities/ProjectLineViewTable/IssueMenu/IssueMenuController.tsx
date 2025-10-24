import { useRouter } from 'next/router';
import { useToggle } from 'reshaped/bundle';
import {
	useChangePriorityProjectIssueMutation,
	useDeleteProjectIssueMutation,
	useDuplicateProjectIssueMutation,
} from '../../../store/projects/projectsApi';
import { useEffect } from 'react';
import { useShowToast } from '../../../shared/utility/Hooks';

export function useIssueMenuController(
	issueId: number,
	isRowHovered: boolean,
	setIsRowHovered: React.Dispatch<React.SetStateAction<boolean>>
): any {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const showToast = useShowToast();

	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);
	const {
		active: isPriorityMenuActive,
		activate: activatePriorityMenu,
		deactivate: deactivatePriorityMenu,
	} = useToggle(false);

	const [duplicateIssue] = useDuplicateProjectIssueMutation();
	const [changePriorityIssue] = useChangePriorityProjectIssueMutation();
	const [deleteIssue] = useDeleteProjectIssueMutation();

	useEffect(() => {
		if (!isRowHovered) {
			deactivateMenu();
			deactivatePriorityMenu();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRowHovered]);

	const handleButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		isMenuActive ? deactivateMenu() : activateMenu();
	};

	const handleChangePriorityOptionClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		activatePriorityMenu();
	};

	const handleDuplicateIssue = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		setIsRowHovered(false);
		duplicateIssue({ project: projectSlug as string, projectIssue: issueId })
			.unwrap()
			.then(() => {
				showToast('Копия задачи успешно создана');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleChangePriorityIssue = (event: React.ChangeEvent<HTMLInputElement>, priorityId: number) => {
		event.stopPropagation();
		setIsRowHovered(false);
		changePriorityIssue({
			project: projectSlug as string,
			projectIssue: issueId,
			body: { project_issue_priority_id: priorityId },
		})
			.unwrap()
			.then(() => {
				showToast('Приоритет задачи изменен');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleDeleteIssue = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		setIsRowHovered(false);
		deleteIssue({ project: projectSlug as string, projectIssue: issueId })
			.unwrap()
			.then(() => {
				showToast('Задача удалена');
			});
	};

	return {
		isMenuActive,
		isPriorityMenuActive,
		deactivateMenu,
		handleButtonClick,
		handleChangePriorityOptionClick,
		deactivatePriorityMenu,
		handleDuplicateIssue,
		handleChangePriorityIssue,
		handleDeleteIssue,
	};
}
