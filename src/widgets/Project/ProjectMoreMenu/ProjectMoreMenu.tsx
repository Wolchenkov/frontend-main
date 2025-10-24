import { Button, Divider, DropdownMenu, Switch } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import React, { FC } from 'react';
import { ConfirmModal } from '../../../entities';
import { MovementModal } from '../../../entities/Modal/MovementModal/MovementModal';
import { AddProjectModal } from '../../Projects/AddProjectModal/AddProjectModal';
import { AddTemplateModal } from '../../../entities/Modal/AddTemplate/AddTemplateModal';
import { UserRole } from '../../../shared/utility/Constants/userRole';
import { useProjectMoreMenuController } from './ProjectMoreMenuController';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSubtasks, selectShowSubtasks } from '../../../store/tasks/tasksSlice';

interface ProjectMoreMenuProps {
	dataProject: IOneProject;
	groupId: number;
	isMemberRole: boolean;
	userRole: string | undefined;
}

export const ProjectMoreMenu: FC<ProjectMoreMenuProps> = ({ dataProject, groupId, isMemberRole, userRole }) => {
	const dispatch = useDispatch();
	const showSubtasks = useSelector(selectShowSubtasks);
	const {
		active,
		handleDropDownClickOpen,
		activeConfirmModal,
		deactivateConfirmModal,
		onRemoveProject,
		activeMovementModal,
		activateMovementModal,
		deactivateMovementModal,
		activeAddProjectModal,
		activateAddProjectModal,
		deactivateAddProjectModal,
		activeAddTemplateModal,
		deactivateAddTemplateModal,
		activateAddTemplateModal,
		onSharedProject,
		onConfirmDeleteProject,
		exportProject,
	} = useProjectMoreMenuController({ groupId });

	return (
		<DropdownMenu active={active} position='bottom' width='300px' onClose={handleDropDownClickOpen}>
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
				{!isMemberRole && (
					<DropdownMenu.Item
						disabled={userRole !== UserRole.ADMIN && userRole !== UserRole.MANAGER}
						endSlot={<SvgComponent name='download-line' />}
						attributes={{ style: { letterSpacing: '-0.02em' } }}
						onClick={exportProject}
					>
						Экспортировать
					</DropdownMenu.Item>
				)}

				<DropdownMenu.Item attributes={{ style: { letterSpacing: '-0.02em' } }} onClick={onSharedProject}>
					Поделиться
				</DropdownMenu.Item>

				{!isMemberRole && (
					<>
						<DropdownMenu.Item attributes={{ style: { letterSpacing: '-0.02em' } }} onClick={activateAddTemplateModal}>
							Сохранить как шаблон
						</DropdownMenu.Item>

						<DropdownMenu.Item attributes={{ style: { letterSpacing: '-0.02em' } }} onClick={activateMovementModal}>
							Переместить в другую группу
						</DropdownMenu.Item>
					</>
				)}
				<DropdownMenu.Item
					attributes={{
						style: { letterSpacing: '-0.02em' },
					}}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						Скрыть подзадачи
						<Switch name='showSubtasks' checked={!showSubtasks} onChange={() => dispatch(toggleSubtasks())} />
					</div>
				</DropdownMenu.Item>
				{!isMemberRole && (
					<>
						<Divider attributes={{ style: { marginTop: '5px' } }} />
						<DropdownMenu.Item
							endSlot={<SvgComponent name={'pencil-line'} />}
							attributes={{ style: { letterSpacing: '-0.02em', marginTop: '5px' } }}
							onClick={activateAddProjectModal}
						>
							Редактировать
						</DropdownMenu.Item>
						<DropdownMenu.Item
							endSlot={<SvgComponent name={'close-fill'} />}
							attributes={{ style: { letterSpacing: '-0.02em' } }}
							onClick={onRemoveProject}
						>
							Удалить проект
						</DropdownMenu.Item>
					</>
				)}
			</DropdownMenu.Content>
			<ConfirmModal
				active={activeConfirmModal}
				deactivate={deactivateConfirmModal}
				confirmDel={onConfirmDeleteProject}
				text={`Вы действительно хотите удалить «${dataProject?.name}»?`}
			/>
			<MovementModal
				active={activeMovementModal}
				deactivate={deactivateMovementModal}
				projectName={dataProject?.name}
			/>
			{activeAddProjectModal && groupId && (
				<AddProjectModal
					groupId={groupId}
					projectData={dataProject}
					active={activeAddProjectModal}
					onClose={deactivateAddProjectModal}
				/>
			)}
			<AddTemplateModal groupId={groupId} isActive={activeAddTemplateModal} closeModal={deactivateAddTemplateModal} />
		</DropdownMenu>
	);
};
