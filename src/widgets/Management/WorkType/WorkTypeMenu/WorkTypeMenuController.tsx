import { useToggle } from 'reshaped/bundle';
import { useEffect } from 'react';
import { useUpdateWorkTypeMutation, useDeleteWorkTypeMutation } from '../../../../store/management/managementApi';
import { useShowToast } from '../../../../shared/utility/Hooks';

export function useWorkTypeMenuController(isVisible: boolean, data: IManagementWorkType): any {
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

	const [updateWorkType] = useUpdateWorkTypeMutation();
	const [deleteWorkType] = useDeleteWorkTypeMutation();

	const handleRenameWorkType = (newName: string) => {
		deactivateRenameModal();
		updateWorkType({
			typeWorkId: data.id,
			body: {
				type: newName,
				cost: data.cost,
			},
		})
			.unwrap()
			.then(() => {
				showToast('Тип работ переименован');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleDeleteWorkType = () => {
		deactivateDeleteModal();
		deleteWorkType(data.id)
			.unwrap()
			.then(() => {
				showToast('Тип работ удален');
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
		activateMenu,
		deactivateMenu,
		isDeleteModalActive,
		activateDeleteModal,
		deactivateDeleteModal,
		isRenameModalActive,
		activateRenameModal,
		deactivateRenameModal,
		handleDeleteWorkType,
		handleRenameWorkType,
	};
}
