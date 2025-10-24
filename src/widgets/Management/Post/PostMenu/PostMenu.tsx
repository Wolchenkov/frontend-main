import React, { FC } from 'react';
import * as S from './PostMenu.styled';
import { DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';
import { ConfirmModal } from '../../../../entities';
import { usePostMenuController } from './PostMenuController';
import { RenamePostModal } from '../../../../entities/Modal/RenamePost/RenamePostModal';

interface IPostMenuProps {
	isVisible: boolean;
	id: number;
	name: string;
	currentPosts: string[];
}

export const PostMenu: FC<IPostMenuProps> = ({ isVisible, id, name, currentPosts }) => {
	const {
		isMenuActive,
		activateMenu,
		deactivateMenu,
		isDeleteModalActive,
		activateDeleteModal,
		deactivateDeleteModal,
		isRenameModalActive,
		activateRenameModal,
		deactivateRenameModal,
		handleDeletePost,
		handleRenamePost,
	} = usePostMenuController(isVisible, id);

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
					<DropdownMenu.Item
						endSlot={<SvgComponent name='close-fill' />}
						attributes={{ style: { letterSpacing: '-0.02em' } }}
						onClick={activateDeleteModal}
					>
						Удалить
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>

			<ConfirmModal
				active={isDeleteModalActive}
				deactivate={deactivateDeleteModal}
				confirmDel={handleDeletePost}
				text={`Вы действительно хотите удалить должность?`}
			/>

			<RenamePostModal
				name={name}
				isActive={isRenameModalActive}
				currentPosts={currentPosts}
				closeModal={deactivateRenameModal}
				renamePost={handleRenamePost}
			/>
		</>
	);
};
