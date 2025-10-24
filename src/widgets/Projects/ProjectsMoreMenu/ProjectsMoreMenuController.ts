import { useToggle } from 'reshaped/bundle';

export function useProjectsMoreMenuController() {
	const { active, deactivate, activate } = useToggle(false);
	const {
		active: activeConfirmModal,
		deactivate: deactivateConfirmModal,
		activate: activateConfirmModal,
	} = useToggle(false);

	const {
		active: activeRenameModal,
		deactivate: deactivateRenameModal,
		activate: activateRenameModal,
	} = useToggle(false);

	const handleDropDownClickOpen = () => {
		active ? deactivate() : activate();
	};

	const handleDropDownClickClose = () => {
		deactivate();
	};

	const onRemoveGroup = () => {
		activateConfirmModal();
	};

	const onRenameGroup = () => {
		activateRenameModal();
	};

	return {
		active,
		handleDropDownClickOpen,
		handleDropDownClickClose,
		onRemoveGroup,
		activeConfirmModal,
		deactivateConfirmModal,
		activeRenameModal,
		deactivateRenameModal,
		activateRenameModal,
		onRenameGroup,
	};
}
