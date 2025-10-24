import { useToggle } from 'reshaped/bundle';
import { useEffect } from 'react';
import { useUpdateProjectMutation } from '../../../store/projects/projectsApi';
import { useShowToast } from '../../../shared/utility/Hooks';

export function useStageMenuController(isVisible: boolean, templateSlug: string): any {
	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);

	const {
		active: isRenameModalActive,
		activate: activateRenameModal,
		deactivate: deactivateRenameModal,
	} = useToggle(false);
	const showToast = useShowToast();

	const [renameTemplate] = useUpdateProjectMutation();

	const handleRenameTemplate = (newName: string) => {
		deactivateRenameModal();
		renameTemplate({
			projectSlug: templateSlug,
			body: { name: newName },
		})
			.unwrap()
			.then(() => {
				showToast('Шаблон переименован');
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
		isRenameModalActive,
		activateMenu,
		deactivateMenu,
		activateRenameModal,
		deactivateRenameModal,
		handleRenameTemplate,
	};
}
