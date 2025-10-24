import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import { Button, DropdownMenu, Text } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../../../shared';
import { ChangeTeamModal, ConfirmModal } from '../../../../../entities';
import CustomNumberInput from '../../../../../entities/CustomInput/CustomNumberInput';
import * as S from './TableRow.styled';
import { getInitials } from '../../../../../shared/utility/Utils';
import { useTableRowController } from './TableRowController';

interface ITableRow {
	title: string;
	row: UserForTeam;
	isRateVisible: boolean;
}

export const TableRow: FC<ITableRow> = ({ row, title, isRateVisible }) => {
	const {
		hoverRow,
		setHoverRow,
		setHoverRoleMenu,
		rolesLabels,
		hoverRoleMenu,
		isDropdownRoleActive,
		handleDropdownMenuClose,
		handleDropdownMenuRoleClick,
		rolesWithLabels,
		changeRole,
		setHoverHourlyRate,
		isEditHourlyRate,
		setNewHourlyRate,
		hoverHourlyRate,
		changeHourlyRate,
		setIsEditHourRate,
		setHoverPositionMenu,
		positionsWithLabels,
		hoverPositionMenu,
		isDropdownPositionActive,
		changePosition,
		isDropdownMoreActive,
		handleDropdownMenuPositionClick,
		deactivateDropdownMore,
		handleDropdownMenuMoreClick,
		activateModalChangeTeam,
		activateModalDelUser,
		activeModalDelUser,
		deactivateModalDelUser,
		deleteUser,
		activeModalChangeTeam,
		changeTeam,
		deactivateModalChangeTeam,
	} = useTableRowController(row);

	const CustomNumberInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditHourlyRate) {
			setTimeout(() => {
				CustomNumberInputRef.current?.focus();
			}, 100);
		}
	}, [isEditHourlyRate]);

	return (
		<>
			<S.MyTr onMouseEnter={() => setHoverRow(true)} onMouseLeave={() => setHoverRow(false)} hover={hoverRow}>
				<td style={{ padding: '10px 20px', width: '25.42%' }}>
					<S.FlexContainerAlignItems style={{ width: 266 }}>
						<AvatarCustom
							src={row.attributes?.avatar ? row.attributes?.avatar : undefined}
							color='positive'
							initials={getInitials(row?.attributes?.name ? row?.attributes?.name : '')}
							size={6}
						/>
						<Text
							variant='caption-1'
							color='neutral'
							attributes={{
								style: { fontWeight: '500', letterSpacing: '-0.01em', paddingLeft: 8 },
							}}
						>
							{row?.attributes?.name}
						</Text>
					</S.FlexContainerAlignItems>
				</td>
				<td style={{ width: '17.58%' }}>
					<S.TruncatedText variant='caption-1' color='neutral' attributes={{ style: { width: 184, marginRight: 16 } }}>
						{row?.attributes?.email}
					</S.TruncatedText>
				</td>
				<td
					style={{ width: '17.58%' }}
					onMouseEnter={() => setHoverRoleMenu(true)}
					onMouseLeave={() => setHoverRoleMenu(false)}
				>
					<S.FlexContainerAlignItems>
						<div style={{ width: 156, paddingRight: 4 }}>
							<S.TruncatedText variant='caption-1' color='neutral'>
								{row?.attributes?.role && rolesLabels[row.attributes.role]}
							</S.TruncatedText>
						</div>
						<div style={{ width: 44, paddingRight: 16 }}>
							{(hoverRoleMenu || isDropdownRoleActive) && (
								<DropdownMenu active={isDropdownRoleActive} onClose={handleDropdownMenuClose}>
									<DropdownMenu.Trigger>
										{(attributes) => (
											<Button
												{...attributes}
												variant='ghost'
												size='small'
												attributes={{ style: { marginRight: 16 } }}
												onClick={handleDropdownMenuRoleClick}
												startIcon={<SvgComponent name={isDropdownRoleActive ? 'arrow-up-s' : 'arrow-down-s'} />}
											/>
										)}
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										{rolesWithLabels
											?.filter((role) => role.value !== 'client')
											.map((role, index) => (
												<DropdownMenu.Item key={index} onClick={() => changeRole(role.id)}>
													{role.label}
												</DropdownMenu.Item>
											))}
									</DropdownMenu.Content>
								</DropdownMenu>
							)}
						</div>
					</S.FlexContainerAlignItems>
				</td>
				{isRateVisible && (
					<td
						style={{ width: '17.58%' }}
						onMouseEnter={() => setHoverHourlyRate(true)}
						onMouseLeave={() => setHoverHourlyRate(false)}
					>
						<S.FlexContainerAlignItems>
							<div style={{ width: 68, paddingRight: 4 }}>
								{isEditHourlyRate ? (
									<CustomNumberInput
										ref={CustomNumberInputRef}
										placeholder={row?.attributes?.rate ? Number(row?.attributes?.rate).toLocaleString('ru-RU') : '0'}
										onChange={(e: ChangeEvent<HTMLInputElement>) => setNewHourlyRate(e.target.value)}
									/>
								) : (
									<Text variant='caption-1' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em' } }}>
										{row?.attributes?.rate ? Number(row?.attributes?.rate).toLocaleString('ru-RU') : '0'}
									</Text>
								)}
							</div>
							<div style={{ width: 28 }}>
								{hoverHourlyRate && (
									<Button
										onClick={isEditHourlyRate ? changeHourlyRate : () => setIsEditHourRate(true)}
										variant='ghost'
										size='small'
										startIcon={<SvgComponent name={isEditHourlyRate ? 'check-fill' : 'pencil-line'} />}
									/>
								)}
							</div>
						</S.FlexContainerAlignItems>
					</td>
				)}
				<td
					style={{ width: '21.80%' }}
					onMouseEnter={() => setHoverPositionMenu(true)}
					onMouseLeave={() => setHoverPositionMenu(false)}
				>
					<S.Container>
						<div style={{ width: 156, paddingRight: 4 }}>
							<S.TruncatedText variant='caption-1' color='neutral'>
								{positionsWithLabels?.find((el) => el.id === row?.attributes?.position)?.label}
							</S.TruncatedText>
						</div>
						<S.FlexContainerAlignItems style={{ width: 92, paddingRight: 20, gap: '16px' }}>
							<div style={{ width: 44 }}>
								{(hoverPositionMenu || isDropdownPositionActive) && (
									<DropdownMenu position='top-end' active={isDropdownPositionActive} onClose={handleDropdownMenuClose}>
										<DropdownMenu.Trigger>
											{(attributes) => (
												<Button
													{...attributes}
													variant='ghost'
													size='small'
													onClick={handleDropdownMenuPositionClick}
													startIcon={<SvgComponent name={isDropdownPositionActive ? 'arrow-up-s' : 'arrow-down-s'} />}
												/>
											)}
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<S.DropdopdownContent>
												{positionsWithLabels?.map((position, index) => (
													<DropdownMenu.Item key={index} onClick={() => changePosition(position.id)}>
														{position.label}
													</DropdownMenu.Item>
												))}
											</S.DropdopdownContent>
										</DropdownMenu.Content>
									</DropdownMenu>
								)}
							</div>
							{(hoverRow || isDropdownMoreActive) && (
								<DropdownMenu active={isDropdownMoreActive} onClose={deactivateDropdownMore}>
									<DropdownMenu.Trigger>
										{(attributes) => (
											<Button
												{...attributes}
												variant='ghost'
												size='small'
												onClick={handleDropdownMenuMoreClick}
												startIcon={<SvgComponent name='more-fill' />}
											/>
										)}
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Item onClick={activateModalChangeTeam}>
											<S.Container>
												Сменить команду
												<SvgComponent name='refresh-line' />
											</S.Container>
										</DropdownMenu.Item>
										<DropdownMenu.Item onClick={activateModalDelUser}>
											<S.Container>
												Удалить участника
												<SvgComponent name='close-line' />
											</S.Container>
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu>
							)}
						</S.FlexContainerAlignItems>
					</S.Container>
				</td>
			</S.MyTr>
			<ConfirmModal
				active={activeModalDelUser}
				deactivate={deactivateModalDelUser}
				confirmDel={deleteUser}
				text={'Вы действительно хотите удалить участника?'}
			/>
			<ChangeTeamModal
				activeModalChangeTeam={activeModalChangeTeam}
				deactivateModalChangeTeam={deactivateModalChangeTeam}
				row={row}
				title={title}
				approve={changeTeam}
			/>
		</>
	);
};
