import React, { FC, useState } from 'react';
import { Button, Text, useToggle } from 'reshaped/bundle';
import styled from 'styled-components';
import { useDeleteClientMutation } from '../../../../../store/teams/teamsApi';
import { AvatarCustom, SvgComponent } from '../../../../../shared';
import { ConfirmModal } from '../../../../../entities';
import { getInitials } from '../../../../../shared/utility/Utils';
import { useShowToast } from '../../../../../shared/utility/Hooks';

interface ITableRow {
	title: string;
	row: UserForTeam;
}
const TruncatedText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	display: block;
`;
const FlexContainerAlignItems = styled.div`
	display: flex;
	align-items: center;
`;

const MyTr = styled.tr<{ hover: boolean }>`
	transition: all 0.5s ease;
	background-color: ${(props) => props.hover && '#F8F8F8 !important'};
`;

export const TableRow: FC<ITableRow> = ({ row }) => {
	const {
		active: activeModalDelUser,
		activate: activateModalDelUser,
		deactivate: deactivateModalDelUser,
	} = useToggle(false); // стейт для отображения модалки удаления пользователя

	const [hoverRow, setHoverRow] = useState(false); // стейт для hover над строкой

	const showToast = useShowToast();

	const [delUser] = useDeleteClientMutation();
	function confirmDel() {
		delUser(row.id).then(() => {
			deactivateModalDelUser();
			showToast('Участник удалён');
		});
	}

	return (
		<>
			<MyTr onMouseEnter={() => setHoverRow(true)} onMouseLeave={() => setHoverRow(false)} hover={hoverRow}>
				<td style={{ padding: '10px 20px', width: '25%' }}>
					<FlexContainerAlignItems style={{ width: 266, gap: '8px' }}>
						<AvatarCustom
							src={row.attributes?.avatar ? row.attributes?.avatar : undefined}
							color='positive'
							initials={getInitials(row?.attributes?.name ? row?.attributes?.name : '')}
							size={6}
						/>
						<Text
							variant='caption-1'
							color='neutral'
							attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em' } }}
						>
							{row?.attributes?.name}
						</Text>
					</FlexContainerAlignItems>
				</td>
				<td style={{ width: '73%', paddingRight: 20 }}>
					<FlexContainerAlignItems style={{ justifyContent: 'space-between' }}>
						<TruncatedText variant='caption-1' color='neutral' attributes={{ style: { width: 184 } }}>
							{row.attributes?.email}
						</TruncatedText>
						{hoverRow && (
							<Button
								onClick={activateModalDelUser}
								variant='ghost'
								size='small'
								startIcon={<SvgComponent name='delete-bin' />}
							/>
						)}
					</FlexContainerAlignItems>
				</td>
			</MyTr>
			<ConfirmModal
				active={activeModalDelUser}
				deactivate={deactivateModalDelUser}
				confirmDel={confirmDel}
				text={'Вы действительно хотите удалить участника?'}
			/>
		</>
	);
};
