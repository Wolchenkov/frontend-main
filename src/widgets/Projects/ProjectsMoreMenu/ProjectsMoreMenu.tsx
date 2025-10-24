import { Button, DropdownMenu } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import React, { FC } from 'react';
import { useProjectsMoreMenuController } from './ProjectsMoreMenuController';
import { ConfirmModal, RenameGroupModal } from '../../../entities';
import { useDeleteGroupMutation } from '../../../store/groups/groupsApi';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';

interface ProjectsMoreMenuProps {
	isHasProjects: boolean;
	groupName: string;
}

export const ProjectsMoreMenu: FC<ProjectsMoreMenuProps> = ({ isHasProjects, groupName }) => {
	const [deleteGroup] = useDeleteGroupMutation();
	const router = useRouter();
	const showToast = useShowToast();

	const onConfirmDeleteGroup = () => {
		if (router.query.slug) {
			deleteGroup(router.query.slug)
				.unwrap()
				.then(() => {
					deactivateConfirmModal();
					router.push('/');
					showToast('Группа удалена');
				});
		}
	};

	const {
		active,
		handleDropDownClickOpen,
		handleDropDownClickClose,
		onRemoveGroup,
		activeConfirmModal,
		deactivateConfirmModal,
		activeRenameModal,
		deactivateRenameModal,
		onRenameGroup,
	} = useProjectsMoreMenuController();

	return (
		<DropdownMenu active={active} position='bottom' onClose={handleDropDownClickClose}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<Button
						{...attributes}
						variant='ghost'
						startIcon={<SvgComponent name='more' />}
						size='small'
						onClick={handleDropDownClickOpen}
					/>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item
					endSlot={<SvgComponent name='pencil-line' />}
					attributes={{ style: { letterSpacing: '-0.02em' } }}
					onClick={onRenameGroup}
				>
					Переименовать
				</DropdownMenu.Item>
				<DropdownMenu.Item
					disabled={isHasProjects}
					endSlot={<SvgComponent name={!isHasProjects ? 'close-fill' : 'close-fill-gray'} />}
					attributes={{ style: { letterSpacing: '-0.02em' } }}
					onClick={onRemoveGroup}
				>
					Удалить группу
				</DropdownMenu.Item>
			</DropdownMenu.Content>
			<ConfirmModal
				active={activeConfirmModal}
				deactivate={deactivateConfirmModal}
				confirmDel={onConfirmDeleteGroup}
				text={`Вы действительно хотите удалить «${groupName}»?`}
			/>
			<RenameGroupModal active={activeRenameModal} deactivate={deactivateRenameModal} groupName={groupName} />
		</DropdownMenu>
	);
};
