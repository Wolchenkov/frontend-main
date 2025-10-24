import React, { FC } from 'react';
import { Button, Divider } from 'reshaped/bundle';
import * as S from './ProjectInvitedUsersRow.styled';
import { useProjectInvitedUserController } from './ProjectInvitedUsersRowController';
import { SvgComponent } from '../../../../shared';
import { ConfirmModal } from '../../../Modal/ConfirmModal/ConfirmModal';

interface ITableRow {
	row: InvitedUsersInProject;
	isOnlyInvitedUsers: boolean;
	isOnlyOneNotInvitedUser: boolean;
	index: number;
}

export const ProjectInvitedUsersRow: FC<ITableRow> = ({ row, isOnlyInvitedUsers, isOnlyOneNotInvitedUser, index }) => {
	const {
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
	} = useProjectInvitedUserController(row);

	return (
		<>
			<S.Row onMouseEnter={() => setHoverRow(true)} onMouseLeave={() => setHoverRow(false)} hover={hoverRow}>
				{isOnlyInvitedUsers && (index === 0 || index === 1) && <Divider />}
				{isOnlyOneNotInvitedUser && index === 0 && <Divider />}
				<S.MainContainer>
					<S.LeftSide>
						<SvgComponent name='invited-user' />
						<S.MyText variant='caption-1' color='neutral-faded'>
							{row?.name}
						</S.MyText>
					</S.LeftSide>
					<S.RightSide>
						<Button
							size='small'
							variant='ghost'
							startIcon={<SvgComponent name='restart-line' />}
							onClick={activateModalResendInvite}
						/>
						<Button
							size='small'
							variant='ghost'
							startIcon={<SvgComponent name='close-fill' />}
							onClick={activateModalDelUser}
						/>
					</S.RightSide>
				</S.MainContainer>
				<Divider />
			</S.Row>
			<ConfirmModal
				active={activeModalResendInvite}
				deactivate={deactivateModalResendInvite}
				confirmDel={confirmResendInvite}
				text={'Отправить приглашение участнику повторно?'}
			/>
			<ConfirmModal
				active={activeModalDelUser}
				deactivate={deactivateModalDelUser}
				confirmDel={confirmDelInvite}
				text={'Вы действительно хотите удалить участника?'}
			/>
		</>
	);
};
