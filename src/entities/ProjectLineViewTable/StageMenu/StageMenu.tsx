import React, { FC } from 'react';
import * as S from './StageMenu.styled';
import { DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { RenameStageModal } from '../../Modal/RenameStage/RenameStageModal';
import { ConfirmModal } from '../../Modal/ConfirmModal/ConfirmModal';
import { useStageMenuController } from './StageMenuController';

interface IGroupMenuProps {
	id: number;
	name: string;
	isVisible: boolean;
	stages: string[];
	projectSlug?: string;
}

export const StageMenu: FC<IGroupMenuProps> = ({ id, name, isVisible, stages, projectSlug }) => {
	const {
		isMenuActive,
		isDeleteModalActive,
		isRenameModalActive,
		activateMenu,
		deactivateMenu,
		activateDeleteModal,
		deactivateDeleteModal,
		activateRenameModal,
		deactivateRenameModal,
		handleDeleteStage,
		handleRenameStage,
	} = useStageMenuController(id, isVisible, projectSlug);

	return (
		<>
			<DropdownMenu active={isMenuActive} onClose={deactivateMenu} position='bottom-start' forcePosition width='300px'>
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
					<DropdownMenu.Item
						endSlot={<SvgComponent name='close-fill' />}
						attributes={{ style: { letterSpacing: '-0.02em' } }}
						onClick={activateDeleteModal}
					>
						Удалить этап
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>

			<ConfirmModal
				active={isDeleteModalActive}
				deactivate={deactivateDeleteModal}
				confirmDel={handleDeleteStage}
				text={`Вы точно хотите удалить ${name}?`}
				detailedText={`В результате перемещения ${name} в Корзину туда также будут перемещены все задачи, присутствующие в этапе.`}
			/>

			<RenameStageModal
				name={name}
				isActive={isRenameModalActive}
				currentStages={stages}
				closeModal={deactivateRenameModal}
				renameStage={handleRenameStage}
			/>
		</>
	);
};
