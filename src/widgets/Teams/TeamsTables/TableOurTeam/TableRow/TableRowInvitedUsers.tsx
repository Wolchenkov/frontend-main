import React, { FC } from 'react';
import { Button, Text } from 'reshaped/bundle';
import styled from 'styled-components';
import { SvgComponent } from '../../../../../shared';
import { ConfirmModal } from '../../../../../entities';
import { useTableRowInvitedUserController } from './TableRowInvitedUsersController';

interface ITableRow {
	row: InvitedUser;
}
const TruncatedText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	display: block;
	width: 184px;
	margin-right: 16px;
`;
const MyButton = styled(Button)<{ hovered: boolean }>`
	background-color: ${(props) => props.hovered && '#F4F5F7 !important'};
`;

const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
const FlexContainer = styled.div`
	display: flex;
	align-items: center;
`;
const MyTr = styled.tr<{ hover: boolean }>`
	background-color: ${(props) => props.hover && '#F8F8F8 !important'};
`;

export const TableRowInvitedUsers: FC<ITableRow> = ({ row }) => {
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
	} = useTableRowInvitedUserController(row);

	return (
		<>
			<MyTr onMouseEnter={() => setHoverRow(true)} onMouseLeave={() => setHoverRow(false)} hover={hoverRow}>
				<td style={{ padding: '10px 20px', width: '25.42%' }}>
					<FlexContainer style={{ width: 266, gap: '8px' }}>
						<SvgComponent name='invited-user' />
						<MyText variant='caption-1' color='neutral-faded'>
							{row?.attributes?.name}
						</MyText>
					</FlexContainer>
				</td>
				<td colSpan={4}>
					<FlexContainer style={{ justifyContent: 'space-between', paddingRight: 20 }}>
						<TruncatedText variant='caption-1' color='neutral-faded'>
							{row?.attributes?.email}
						</TruncatedText>
						<div style={{ display: 'flex', gap: '4px' }}>
							<MyButton
								hovered={hoverRow}
								size='small'
								color='white'
								startIcon={<SvgComponent name='restart-line' />}
								onClick={activateModalResendInvite}
							/>
							<MyButton
								hovered={hoverRow}
								size='small'
								color='white'
								startIcon={<SvgComponent name='close-fill' />}
								onClick={activateModalDelUser}
							/>
						</div>
					</FlexContainer>
				</td>
			</MyTr>
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
