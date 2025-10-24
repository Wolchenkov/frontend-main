import { useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { useDeleteInviteMutation, useResendInviteMutation } from '../../../../../store/teams/teamsApi';
import { useShowToast } from '../../../../../shared/utility/Hooks';

export function useTableRowInvitedUserController(row: InvitedUser) {
	const [hoverRow, setHoverRow] = useState(false); // стейт для hover над строкой

	const {
		active: activeModalDelUser,
		activate: activateModalDelUser,
		deactivate: deactivateModalDelUser,
	} = useToggle(false); // стейт для модалки удаления пользователя

	const showToast = useShowToast();

	const [deleteInvite] = useDeleteInviteMutation();
	const confirmDelInvite = () => {
		deleteInvite({ email: row.attributes?.email }).then(() => {
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
		resendInvite({ email: row.attributes?.email }).then(() => {
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
