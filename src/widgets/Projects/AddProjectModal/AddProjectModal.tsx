import React, { FC } from 'react';
import * as S from './AddProjectModal.styled';
import { Dismissible, Modal, View, Text, Divider, Button } from 'reshaped/bundle';
import {
	PillBudget,
	PillCalendar,
	PillClient,
	PillMultiPerson,
	PillPerson,
	PillStatus,
	PillWithInput,
} from '../../../entities';
import { useAddProjectModalController } from './AddProjectModalController';

interface IAddProjectModalProps {
	groupId: number;
	projectData?: IOneProject;
	active: boolean;
	onClose: () => void;
}

export const AddProjectModal: FC<IAddProjectModalProps> = ({ groupId, projectData, active, onClose }) => {
	const {
		projectStatuses,
		projectManagers,
		projectMembers,
		projectClients,
		projectTypeWork,
		currentProjectTypeWork,
		minDate,
		maxDate,
		addProjectNameInputRef,
		isDataValid,
		projectName,
		isProjectNameValid,
		setMinDate,
		setMaxDate,
		changeProjectData,
		createNewProject,
		updateCurrentProject,
		handleProjectSlugKeyPress,
		setProjectName,
		transformProjectSlug,
	} = useAddProjectModalController(groupId, active, onClose, projectData);

	return (
		<>
			{projectStatuses && projectManagers && projectMembers && projectClients ? (
				// && (projectData ? currentProjectTypeWork?.length : projectTypeWork?.length)
				<S.AddProjectModal size='660px' padding={0} active={active} onClose={onClose}>
					<View padding={4}>
						<Dismissible closeAriaLabel='Закрыть' onClose={onClose}>
							<Modal.Title>
								<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
									{projectData ? 'Редактирование проекта' : 'Новый проект'}
								</Text>
							</Modal.Title>
						</Dismissible>
					</View>
					<Divider />

					<View padding={4}>
						<View paddingBottom={16} attributes={{ style: { position: 'relative' } }}>
							<S.AddProjectNameInput
								name='name'
								value={projectName}
								ref={addProjectNameInputRef}
								placeholder='Название проекта'
								onChange={(e) => setProjectName(e.target.value)}
								autoComplete='off'
							/>
							{!isProjectNameValid && (
								<S.AddProjectNameError variant='caption-1' color='critical'>
									Проект с таким названием уже существует
								</S.AddProjectNameError>
							)}
						</View>
						<View direction='row' gap={1} paddingBottom={1} wrap>
							<PillWithInput
								name='slug'
								value={projectData?.slug}
								onChange={changeProjectData}
								title='Номер'
								icon='id'
								placeholder='Введите id-номер проекта'
								handleKeyPress={handleProjectSlugKeyPress}
								transformInputValue={transformProjectSlug}
								isRequired
							/>
							<PillStatus
								name='project_status_id'
								value={projectData?.project_status_id}
								onChange={changeProjectData}
								statuses={projectStatuses}
								isRequired
							/>
							<PillPerson
								name='manager_id'
								value={projectData?.manager_id}
								onChange={changeProjectData}
								title='Менеджер'
								icon='user-add'
								members={projectManagers}
								isRequired
							/>
							<PillMultiPerson
								name='members'
								value={projectData?.usersMember}
								onChange={changeProjectData}
								title='Участники'
								declinedTitles={['участник', 'участника', 'участников']}
								icon='user-add'
								members={projectMembers}
							/>
						</View>
						<View direction='row' gap={1} wrap>
							<PillCalendar
								name='date_start'
								value={projectData?.date_start}
								onChange={changeProjectData}
								title='Дата начала'
								icon='calendar-event'
								setDateLimit={setMinDate}
								maxDate={maxDate}
							/>
							<PillCalendar
								name='date_end'
								value={projectData?.date_end}
								onChange={changeProjectData}
								title='Дата окончания'
								icon='calendar-check'
								setDateLimit={setMaxDate}
								minDate={minDate}
							/>
							<PillClient
								name='client_id'
								value={projectData?.client_id}
								onChange={changeProjectData}
								title='Заказчик'
								icon='user-add'
								members={projectClients}
							/>
							<PillBudget
								name='budget'
								value={projectData ? { type: projectData.budget_type, amount: projectData.budget_amount } : undefined}
								onChange={changeProjectData}
								title='Бюджет'
								icon='money-ruble-circle'
								rates={projectData ? currentProjectTypeWork : projectTypeWork}
							/>
						</View>
					</View>
					<Divider />

					<View direction='row' padding={4} justify='end' gap={1}>
						<Button size='small' onClick={onClose}>
							<Text variant='caption-1'>Отменить</Text>
						</Button>
						<Button
							color='primary'
							size='small'
							disabled={!isDataValid}
							onClick={projectData ? updateCurrentProject : createNewProject}
						>
							<Text variant='caption-1'>{projectData ? 'Сохранить' : 'Добавить'}</Text>
						</Button>
					</View>
				</S.AddProjectModal>
			) : (
				<></>
			)}
		</>
	);
};
