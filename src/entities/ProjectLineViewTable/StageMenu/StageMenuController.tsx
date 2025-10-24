import { useToggle } from 'reshaped/bundle';
import { useEffect } from 'react';
import { useRenameKanbanMutation, useDeleteKanbanMutation } from '../../../store/projects/projectsApi';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';

export function useStageMenuController(id: number, isVisible: boolean, projectSlug?: string): any {
	const router = useRouter();
	const { slug } = router.query;

	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);
	const {
		active: isDeleteModalActive,
		activate: activateDeleteModal,
		deactivate: deactivateDeleteModal,
	} = useToggle(false);
	const {
		active: isRenameModalActive,
		activate: activateRenameModal,
		deactivate: deactivateRenameModal,
	} = useToggle(false);
	const showToast = useShowToast();

	const [renameStage] = useRenameKanbanMutation();
	const [deleteStage] = useDeleteKanbanMutation();

	const handleRenameStage = (newName: string) => {
		deactivateRenameModal();
		renameStage({
			kanban: id,
			body: { name: newName, project_slug: projectSlug || (slug as string) },
		})
			.unwrap()
			.then(() => {
				showToast('Этап переименован');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleDeleteStage = () => {
		deactivateDeleteModal();
		deleteStage(id)
			.unwrap()
			.then(() => {
				showToast('Этап удален');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	useEffect(() => {
		!isVisible && deactivateMenu();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	return {
		isMenuActive,
		isDeleteModalActive,
		isRenameModalActive,
		activateMenu,
		deactivateMenu,
		activateDeleteModal,
		deactivateDeleteModal,
		activateRenameModal,
		deactivateRenameModal,
		handleDeleteStage,
		handleRenameStage,
	};
}
