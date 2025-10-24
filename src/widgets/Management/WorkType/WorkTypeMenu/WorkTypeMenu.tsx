import React, { FC } from 'react';
import * as S from './WorkTypeMenu.styled';
import { DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { ConfirmModal } from '../../../../entities';
import { useWorkTypeMenuController } from './WorkTypeMenuController';
import { RenameWorkTypeModal } from '../../../../entities/Modal/RenameWorkType/RenameWorkTypeModal';

interface IWorkTypeMenuProps {
	isVisible: boolean;
	data: IManagementWorkType;
	currentWorkTypes: string[];
}

export const WorkTypeMenu: FC<IWorkTypeMenuProps> = ({ isVisible, data, currentWorkTypes }) => {
	const {
		isMenuActive,
		activateMenu,
		deactivateMenu,
		isDeleteModalActive,
		// activateDeleteModal,
		deactivateDeleteModal,
		isRenameModalActive,
		activateRenameModal,
		deactivateRenameModal,
		handleDeleteWorkType,
		handleRenameWorkType,
	} = useWorkTypeMenuController(isVisible, data);

	return (
		<>
			<DropdownMenu active={isMenuActive} onClose={deactivateMenu} position='bottom-start' width='200px'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<S.MenuButton
							{...attributes}
							variant='ghost'
							size='small'
							startIcon={<SvgComponent name='more' />}
							isVisible={isVisible}
							onClick={() => (isMenuActive ? deactivateMenu() : activateMenu())}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item attributes={{ style: { letterSpacing: '-0.02em' } }} onClick={activateRenameModal}>
						Переименовать
					</DropdownMenu.Item>
					{/* <DropdownMenu.Item
						endSlot={<SvgComponent name='close-fill' />}
						attributes={{ style: { letterSpacing: '-0.02em' } }}
						onClick={activateDeleteModal}
					>
						Удалить
					</DropdownMenu.Item> */}
				</DropdownMenu.Content>
			</DropdownMenu>

			<ConfirmModal
				active={isDeleteModalActive}
				deactivate={deactivateDeleteModal}
				confirmDel={handleDeleteWorkType}
				text={`Вы действительно хотите удалить тип работ?`}
			/>

			<RenameWorkTypeModal
				name={data.type}
				isActive={isRenameModalActive}
				currentWorkTypes={currentWorkTypes}
				closeModal={deactivateRenameModal}
				renameWorkType={handleRenameWorkType}
			/>
		</>
	);
};
