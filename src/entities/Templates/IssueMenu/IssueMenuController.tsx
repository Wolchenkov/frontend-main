import { useToggle } from 'reshaped/bundle';
import { useDeleteProjectIssueMutation, useDuplicateProjectIssueMutation } from '../../../store/projects/projectsApi';
import { useEffect } from 'react';
import { useShowToast } from '../../../shared/utility/Hooks';

export function useIssueMenuController(
	issueId: number,
	isRowHovered: boolean,
	templateSlug: string,
	setIsRowHovered: React.Dispatch<React.SetStateAction<boolean>>
): any {
	const showToast = useShowToast();

	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);

	const [duplicateIssue] = useDuplicateProjectIssueMutation();
	const [deleteIssue] = useDeleteProjectIssueMutation();

	useEffect(() => {
		if (!isRowHovered) {
			deactivateMenu();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRowHovered]);

	const handleButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		isMenuActive ? deactivateMenu() : activateMenu();
	};

	const handleDuplicateIssue = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		setIsRowHovered(false);
		duplicateIssue({ project: templateSlug, projectIssue: issueId })
			.unwrap()
			.then(() => {
				showToast('Копия задачи успешно создана');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleDeleteIssue = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		setIsRowHovered(false);
		deleteIssue({ project: templateSlug, projectIssue: issueId })
			.unwrap()
			.then(() => {
				showToast('Задача удалена');
			});
	};

	return {
		isMenuActive,
		deactivateMenu,
		handleButtonClick,
		handleDuplicateIssue,
		handleDeleteIssue,
	};
}
