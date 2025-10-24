import React, { FC, Fragment } from 'react';
import { Button, Divider, DropdownMenu, Text, Tooltip } from 'reshaped/bundle';
import { TableHead } from './TableHead/TableHead';
import { TableRow } from './TableRow/TableRow';
import { SvgComponent } from '../../../../shared';
import styled from 'styled-components';
import { AddUserModal, ChangeTeamNameModal, ChangeRateModal, ConfirmModal } from '../../../../entities';

import { TableRowInvitedUsers } from './TableRow/TableRowInvitedUsers';
import { useTableOurTeamController } from './TableOurTeamController';

interface ITableData {
	title: string;
	data: UserForTeam[];
	teamId: number;
	isRateVisible: boolean;
	invitedUsers: InvitedUser[];
	teamNames: string[] | undefined;
}

const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.02em;
`;
const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 0 0 16px 20px;
`;
export const TableOurTeam: FC<ITableData> = ({ data, title, teamId, isRateVisible, invitedUsers, teamNames }) => {
	const {
		setIsHoveredTitle,
		isHoveredTitle,
		isDropdownActive,
		handleDropdownMenuClose,
		handleDropdownMenuClick,
		activateModalChangeTeamName,
		activateModalDelUser,
		activateModalChangeRate,
		isExpanded,
		displayData,
		activateModalAddUser,
		allData,
		handleExpandClick,
		activeModalAddUser,
		deactivateModalAddUser,
		activeModalChangeTeamName,
		deactiveModalChangeTeamName,
		changeName,
		activeModalChangeRate,
		deactivateModalChangeRate,
		setFetchingTypesData,
		changeTypesWork,
		activeModalDelUser,
		deactivateModalDelUser,
		delTeam,
		isValidName,
		setIsValidName,
		fetchingTypesData,
	} = useTableOurTeamController({ data, invitedUsers, teamId, teamNames });

	return (
		<>
			<TitleContainer onMouseEnter={() => setIsHoveredTitle(true)} onMouseLeave={() => setIsHoveredTitle(false)}>
				<Text variant='title-3' attributes={{ style: { letterSpacing: '-0.02em' } }}>
					{title}
				</Text>
				{(isHoveredTitle || isDropdownActive) && (
					<DropdownMenu active={isDropdownActive} onClose={handleDropdownMenuClose}>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<Button
									color='white'
									attributes={attributes}
									size='small'
									startIcon={<SvgComponent name='more-fill' />}
									onClick={handleDropdownMenuClick}
								/>
							)}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Section>
								<DropdownMenu.Item onClick={activateModalChangeTeamName}>Переименовать</DropdownMenu.Item>
								{isRateVisible && (
									<DropdownMenu.Item onClick={activateModalChangeRate}>Редактировать ставки</DropdownMenu.Item>
								)}
							</DropdownMenu.Section>
							<DropdownMenu.Section>
								{allData.length > 0 ? (
									<DropdownMenu.Item endSlot={<SvgComponent name='close-line-disabled' />}>
										<Tooltip
											text={
												<Text variant='caption-1' attributes={{ style: { color: 'white' } }}>
													Сначала переместите или удалите всех участников команды
												</Text>
											}
										>
											{(attributes) => (
												<Text attributes={attributes} color='disabled'>
													Удалить команду
												</Text>
											)}
										</Tooltip>
									</DropdownMenu.Item>
								) : (
									<DropdownMenu.Item onClick={activateModalDelUser} endSlot={<SvgComponent name='close-line' />}>
										Удалить команду
									</DropdownMenu.Item>
								)}
							</DropdownMenu.Section>
						</DropdownMenu.Content>
					</DropdownMenu>
				)}
			</TitleContainer>
			<table style={{ width: '100%', marginBottom: 56 }}>
				{displayData.length ? <TableHead isRateVisible={isRateVisible} /> : <></>}
				<tbody>
					{displayData?.map((row, index) => (
						<Fragment key={index}>
							{row.attributes && 'avatar' in row.attributes ? (
								<TableRow row={row} title={title} isRateVisible={isRateVisible} />
							) : (
								<TableRowInvitedUsers row={row} />
							)}
							<tr>
								<td colSpan={5}>
									<Divider />
								</td>
							</tr>
						</Fragment>
					))}
					{(isExpanded || allData.length <= 12) && (
						<tr>
							<td colSpan={5}>
								<Button
									color='white'
									size='small'
									onClick={activateModalAddUser}
									type='button'
									startIcon={<SvgComponent name='add-line' />}
								>
									<MyText color='neutral-faded' variant='caption-1'>
										Добавить участника
									</MyText>
								</Button>
							</td>
						</tr>
					)}
					{allData.length > 12 && (
						<tr>
							<td colSpan={5}>
								<Button
									color='white'
									size='small'
									onClick={handleExpandClick}
									type='button'
									startIcon={isExpanded ? <SvgComponent name='arrow-up-s' /> : <SvgComponent name='arrow-down-s' />}
								>
									<MyText color='neutral-faded' variant='caption-1'>
										{isExpanded ? 'Свернуть' : 'Показать всех'}
									</MyText>
								</Button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<AddUserModal
				size='660px'
				active={activeModalAddUser}
				onClose={deactivateModalAddUser}
				mode={title}
				isClientTeam={false}
			/>
			<ChangeTeamNameModal
				size='660px'
				active={activeModalChangeTeamName}
				onClose={deactiveModalChangeTeamName}
				approve={changeName}
				value={title}
				isValidName={isValidName}
				setIsValidName={setIsValidName}
			/>
			{activeModalChangeRate && (
				<ChangeRateModal
					size='480px'
					active={activeModalChangeRate}
					onClose={deactivateModalChangeRate}
					setFetchingTypesData={setFetchingTypesData}
					changeTypesWork={changeTypesWork}
					teamId={teamId}
					fetchingTypesData={fetchingTypesData}
				/>
			)}
			<ConfirmModal
				active={activeModalDelUser}
				deactivate={deactivateModalDelUser}
				confirmDel={delTeam}
				text={'Вы действительно хотите удалить команду?'}
			/>
		</>
	);
};
