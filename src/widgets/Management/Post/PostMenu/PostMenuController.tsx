import { useToggle } from 'reshaped/bundle';
import { useEffect } from 'react';
import { useRenamePostMutation, useDeletePostMutation } from '../../../../store/management/managementApi';
import { useShowToast } from '../../../../shared/utility/Hooks';

export function usePostMenuController(isVisible: boolean, id: number): any {
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

	const [renamePost] = useRenamePostMutation();
	const [deletePost] = useDeletePostMutation();

	const handleRenamePost = (newName: string) => {
		deactivateRenameModal();
		renamePost({
			postId: id,
			body: {
				name: newName,
			},
		})
			.unwrap()
			.then(() => {
				showToast('Должность переименована');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleDeletePost = () => {
		deactivateDeleteModal();
		deletePost(id)
			.unwrap()
			.then(() => {
				showToast('Должность удалена');
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
		handleDeletePost,
		handleRenamePost,
	};
}
