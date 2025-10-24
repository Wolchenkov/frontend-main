import { useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useShowToast } from '../../../../shared/utility/Hooks';
import { useDeleteInviteMutation, useResendInviteMutation } from '../../../../store/projects/projectsApi';

export function useProjectInvitedUserController(row: InvitedUsersInProject) {
	const [hoverRow, setHoverRow] = useState(false); // стейт для hover над строкой

	const {
		active: activeModalDelUser,
		activate: activateModalDelUser,
		deactivate: deactivateModalDelUser,
	} = useToggle(false); // стейт для модалки удаления пользователя

	const showToast = useShowToast();

	const [deleteInvite] = useDeleteInviteMutation();
	const confirmDelInvite = () => {
		deleteInvite({ email: row.email }).then(() => {
			deactivateModalDelUser();
			showToast('Участник удалён');
		});
	};

	const {
		active: activeModalResendInvite,
		activate: activateModalResendInvite,
		deactivate: deactivateModalResendInvite,
	} = useToggle(false); // стейт для модалки повторной отправки приглашения

	const [resendInvite] = useResendInviteMutation();
	const confirmResendInvite = () => {
		resendInvite({ email: row.email }).then(() => {
			deactivateModalResendInvite();
			showToast('Приглашение отправлено');
		});
	};

	return {
		setHoverRow,
		hoverRow,
		activateModalResendInvite,
		activateModalDelUser,
		activeModalResendInvite,
		deactivateModalResendInvite,
		confirmResendInvite,
		activeModalDelUser,
		deactivateModalDelUser,
		confirmDelInvite,
	};
}
